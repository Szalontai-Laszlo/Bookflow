using MySql.Data.MySqlClient;
using Microsoft.Win32;
using System;
using System.Data;
using System.IO;
using System.Windows;

namespace LibraryApp
{
    /// <summary>
    /// Interaction logic for AddBookWindow.xaml
    /// </summary>
    public partial class AddBookWindow : Window
    {
        MySqlConnection connection = new MySqlConnection("server=localhost; database=bookflow; uid=root");
        MySqlCommand command;
        string query = "";

        private string selectedImageSourcePath = null;
        private string storedImageFileName = null;

        public AddBookWindow()
        {
            InitializeComponent();
            ComboBox_Feltolt();
        }
        private void Open_Connection()
        {
            if (connection.State == ConnectionState.Closed)
            {
                connection.Open();
            }
        }
        private void Close_Connection()
        {
            if (connection.State == ConnectionState.Open)
            {
                connection.Close();
            }
        }
        private void fooldal_Click(object sender, RoutedEventArgs e)
        {
            // Vissza a főoldalra
            MainWindow mainWindow = new MainWindow();
            mainWindow.Show();
            this.Close();
        }
        public void ComboBox_Feltolt()
        {
            // Kategória nevek lekérése az adatbázisból és hozzáadása a comboBox_kategoria elemeihez
            try
            {
                Open_Connection();
                query = "SELECT `name` FROM `category`";
                command = new MySqlCommand(query, connection);
                MySqlDataReader reader = command.ExecuteReader();
                while (reader.Read())
                {
                    comboBox_kategoria.Items.Add(reader["name"].ToString());
                }
            }
            catch (Exception Hiba)
            {
                MessageBox.Show(Hiba.Message);
            }
            finally
            {
                Close_Connection();
            }
        }

        private void button_SelectImage_Click(object sender, RoutedEventArgs e)
        {
            // Kép kiválasztása fájlböngészővel ez AI val segitségével készült
            var dlg = new OpenFileDialog
            {
                Filter = "Image files (*.png;*.jpg;*.jpeg;*.gif)|*.png;*.jpg;*.jpeg;*.gif|All files (*.*)|*.*",
                Title = "Kép kiválasztása"
            };

            if (dlg.ShowDialog() == true)
            {
                selectedImageSourcePath = dlg.FileName;
                textBlock_imageName.Text = System.IO.Path.GetFileName(selectedImageSourcePath);
            }
        }

        private void button_Upload_Click(object sender, RoutedEventArgs e)
        {
            // Könyv adatainak lekérése a felhasználói felületről, majd mentése az adatbázisba és a kép fájl másolása a megfelelő helyre
            string title = textBox_konyvcim.Text?.Trim() ?? string.Empty;
            string authorName = textBox_szerzo.Text?.Trim() ?? string.Empty;
            string categoryName = (comboBox_kategoria.SelectedItem as string) ?? comboBox_kategoria.Text?.Trim() ?? string.Empty;
            string leiras = textBox_leiras.Text?.Trim() ?? string.Empty;

            if (string.IsNullOrEmpty(title) || string.IsNullOrEmpty(authorName) || string.IsNullOrEmpty(categoryName))
            {
                MessageBox.Show("Kérlek tölts ki minden mezőt (Cím, Szerző, Kategória).", "Hiányzó adatok", MessageBoxButton.OK, MessageBoxImage.Warning);
                return;
            }

            try
            {
                // Ha kép lett kiválasztva, akkor megpróbáljuk azt a megfelelő helyre másolni, és az új fájl nevét eltárolni a könyv adatainál
                if (!string.IsNullOrEmpty(selectedImageSourcePath) && File.Exists(selectedImageSourcePath))
                {

                    string baseDir = AppDomain.CurrentDomain.BaseDirectory;
                    string assetsBooksRelative = Path.Combine(baseDir, @"..\..\..\html\src\assets\books");
                    string assetsBooksFull = Path.GetFullPath(assetsBooksRelative);
                    

                    Directory.CreateDirectory(assetsBooksFull);
                    string ext = Path.GetExtension(selectedImageSourcePath);
                    string fileName = $"{DateTime.UtcNow:yyyyMMddHHmmssfff}{ext}";
                    string destFull = Path.Combine(assetsBooksFull, fileName);

                    File.Copy(selectedImageSourcePath, destFull, overwrite: false);

                    storedImageFileName = $"assets/books/{fileName}";
                }

                Open_Connection();

                using (var transaction = connection.BeginTransaction())
                {
                    try
                    {
                        // Szerző és kategória beszúrása, ha még nem léteznek, majd a könyv beszúrása az újonnan kapott szerző_id és kategória_id értékekkel
                        int authorId;
                        using (var cmd = new MySqlCommand("SELECT id FROM authors WHERE `name` = @name LIMIT 1", connection, transaction))
                        {
                            cmd.Parameters.AddWithValue("@name", authorName);
                            object res = cmd.ExecuteScalar();
                            if (res != null && res != DBNull.Value)
                            {
                                authorId = Convert.ToInt32(res);
                            }
                            else
                            {
                                using (var insertAuthor = new MySqlCommand("INSERT INTO authors (`name`) VALUES (@name)", connection, transaction))
                                {
                                    insertAuthor.Parameters.AddWithValue("@name", authorName);
                                    insertAuthor.ExecuteNonQuery();
                                }
                                using (var last = new MySqlCommand("SELECT LAST_INSERT_ID()", connection, transaction))
                                {
                                    authorId = Convert.ToInt32(last.ExecuteScalar());
                                }
                            }
                        }
                        // Még ez javitva lesz mert ComboBoxal töltjük a Kategoriákat
                        int categoryId;
                        using (var cmd = new MySqlCommand("SELECT id FROM category WHERE `name` = @name LIMIT 1", connection, transaction))
                        {
                            cmd.Parameters.AddWithValue("@name", categoryName);
                            object cres = cmd.ExecuteScalar();
                            if (cres != null && cres != DBNull.Value)
                            {
                                categoryId = Convert.ToInt32(cres);
                            }
                            else
                            {
                                using (var insertCategory = new MySqlCommand("INSERT INTO category (`name`) VALUES (@name)", connection, transaction))
                                {
                                    insertCategory.Parameters.AddWithValue("@name", categoryName);
                                    insertCategory.ExecuteNonQuery();
                                }
                                using (var lastCat = new MySqlCommand("SELECT LAST_INSERT_ID()", connection, transaction))
                                {
                                    categoryId = Convert.ToInt32(lastCat.ExecuteScalar());
                                }
                            }
                        }
                        // Könyv beszúrása a kapott authorId és categoryId értékekkel, valamint a többi könyv adatával
                        using (var insertBook = new MySqlCommand("INSERT INTO books (`title`, `author_id`, `category_id`, `description`, `img`, `status`) VALUES (@title, @authorId, @categoryId, @desc, @img, @status)", connection, transaction))
                        {
                            insertBook.Parameters.AddWithValue("@title", title);
                            insertBook.Parameters.AddWithValue("@authorId", authorId);
                            insertBook.Parameters.AddWithValue("@categoryId", categoryId);
                            insertBook.Parameters.AddWithValue("@desc", leiras);
                            insertBook.Parameters.AddWithValue("@img", (object)storedImageFileName ?? DBNull.Value);
                            insertBook.Parameters.AddWithValue("@status", 1);
                            int affected = insertBook.ExecuteNonQuery();
                            if (affected <= 0)
                            {
                                transaction.Rollback();
                                MessageBox.Show("A könyv mentése sikertelen volt.", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                                return;
                            }
                        }

                        transaction.Commit();

                        MessageBox.Show("A könyv sikeresen elmentve.", "Siker", MessageBoxButton.OK, MessageBoxImage.Information);

                        // Adatok törlése a mezőkből a sikeres mentés után, hogy új könyvet lehessen hozzáadni
                        textBox_konyvcim.Text = string.Empty;
                        textBox_szerzo.Text = string.Empty;
                        comboBox_kategoria.SelectedIndex = -1;
                        textBox_leiras.Text = string.Empty;
                        selectedImageSourcePath = null;
                        storedImageFileName = null;
                        textBlock_imageName.Text = "(nincs kiválasztva)";
                    }
                    catch (Exception exTx)
                    {
                        try
                        {
                            // Visszagörgetjük a tranzakciót, hogy ne maradjon félig kész adat az adatbázisban, ha valami hiba történik
                            transaction.Rollback();
                        }
                        catch
                        {
                            // ignore rollback errors
                        }

                        // Ha a kép már át lett másolva, akkor megpróbáljuk azt törölni, hogy ne maradjon fölösleges fájl a rendszerben, ha a mentés nem sikerült
                        try
                        {
                            if (!string.IsNullOrEmpty(storedImageFileName))
                            {
                                string baseDir = AppDomain.CurrentDomain.BaseDirectory;
                                string dest = Path.GetFullPath(Path.Combine(baseDir, @"..\..\..\", storedImageFileName.Replace('/', Path.DirectorySeparatorChar)));
                                if (File.Exists(dest))
                                {
                                    File.Delete(dest);
                                }
                            }
                        }
                        catch
                        {

                        }
                        // Hibaüzenet megjelenítése a tranzakció során történt kivétel miatt
                        MessageBox.Show("Hiba történt a mentés során: " + exTx.Message, "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                    }
                }
            }
            catch (Exception ex)
            {
                // Bármilyen kivétel esetén megjelenítünk egy hibaüzenetet a felhasználónak
                MessageBox.Show("Hiba történt: " + ex.Message, "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
            }
            finally
            {
                Close_Connection();
            }
        }

        private void button_megse_Click(object sender, RoutedEventArgs e)
        {
            // Vissza a főoldalra a "Mégse" gomb megnyomásakor, anélkül hogy bármit mentenénk
            MainWindow mainWindow = new MainWindow();
            mainWindow.Show();
            this.Close();
        }
    }
}
