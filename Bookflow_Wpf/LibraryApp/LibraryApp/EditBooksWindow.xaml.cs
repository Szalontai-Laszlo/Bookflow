using System;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Windows;
using MySql.Data.MySqlClient;

namespace LibraryApp
{
    /// <summary>
    /// Interaction logic for EditBooksWindow.xaml
    /// </summary>
    public partial class EditBooksWindow : Window
    {
        private int bookId = -1;

        // Added DB fields consistent with the rest of the project
        MySqlConnection connection = new MySqlConnection("server=localhost; database=bookflow; uid=root; charset=utf8mb4");
        MySqlCommand command;
        string query = "";

        public EditBooksWindow(object data)
        {
            InitializeComponent();

            // Ensure comboBox has the expected choices as plain strings so we can match by text
            comboBox_berles.Items.Clear();
            comboBox_berles.Items.Add("Kibérelhető");
            comboBox_berles.Items.Add("Kibérelt");

            if (data is DataRowView drv)
            {
                try
                {
                    // Column names come from the DataTable: try several possible id column aliases
                    if (drv.Row.Table.Columns.Contains("Id"))
                    {
                        int.TryParse(drv["Id"]?.ToString(), out bookId);
                    }
                    else if (drv.Row.Table.Columns.Contains("id"))
                    {
                        int.TryParse(drv["id"]?.ToString(), out bookId);
                    }
                    else if (drv.Row.Table.Columns.Contains("Számozás"))
                    {
                        int.TryParse(drv["Számozás"]?.ToString(), out bookId);
                    }

                    txtTitle.Text = drv.Row.Table.Columns.Contains("Könyv Cime") ? drv["Könyv Cime"]?.ToString() ?? string.Empty : string.Empty;
                    txtAuthor.Text = drv.Row.Table.Columns.Contains("Szerző") ? drv["Szerző"]?.ToString() ?? string.Empty : string.Empty;

                    // status column was created as CASE ... AS `status` in the SELECT; expect "Kibérelhető" or "Kibérelt"
                    var statusText = drv.Row.Table.Columns.Contains("status") ? drv["status"]?.ToString() ?? string.Empty : string.Empty;
                    if (!string.IsNullOrEmpty(statusText) && comboBox_berles.Items.Contains(statusText))
                    {
                        comboBox_berles.SelectedItem = statusText;
                    }
                    else
                    {
                        comboBox_berles.SelectedIndex = 0; // default
                    }
                }
                catch (Exception)
                {
                    // keep UI responsive; leave defaults if something goes wrong
                }
            }
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

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            // Validate selection
            if (bookId <= 0)
            {
                MessageBox.Show("Nincs kiválasztva érvényes könyv (hiányzó azonosító).", "Hiba", MessageBoxButton.OK, MessageBoxImage.Warning);
                return;
            }

            string title = txtTitle.Text?.Trim() ?? string.Empty;
            string authorName = txtAuthor.Text?.Trim() ?? string.Empty;
            string statusText = comboBox_berles.SelectedItem as string ?? string.Empty;

            if (string.IsNullOrEmpty(title))
            {
                MessageBox.Show("A könyv címe nem lehet üres.", "Hiba", MessageBoxButton.OK, MessageBoxImage.Warning);
                return;
            }

            // Map status text to DB value (same logic as the rest of the app)
            int statusValue = statusText == "Kibérelhető" ? 1 : 0;

            try
            {
                Open_Connection();

                // Find author id by name (if exists)
                int authorId = -1;
                query = "SELECT id FROM authors WHERE name = @name LIMIT 1";
                command = new MySqlCommand(query, connection);
                command.Parameters.Clear();
                command.Parameters.AddWithValue("@name", authorName);
                object scalar = command.ExecuteScalar();
                if (scalar != null && int.TryParse(scalar.ToString(), out int parsedId))
                {
                    authorId = parsedId;
                }

                // Build UPDATE statement: update title, status and author_id (if we have one)
                if (authorId > 0)
                {
                    query = "UPDATE books SET title = @title, author_id = @authorId, status = @status WHERE id = @id";
                    command = new MySqlCommand(query, connection);
                    command.Parameters.Clear();
                    command.Parameters.AddWithValue("@title", title);
                    command.Parameters.AddWithValue("@authorId", authorId);
                    command.Parameters.AddWithValue("@status", statusValue);
                    command.Parameters.AddWithValue("@id", bookId);
                }
                else
                {
                    // update only title and status if no author id available
                    query = "UPDATE books SET title = @title, status = @status WHERE id = @id";
                    command = new MySqlCommand(query, connection);
                    command.Parameters.Clear();
                    command.Parameters.AddWithValue("@title", title);
                    command.Parameters.AddWithValue("@status", statusValue);
                    command.Parameters.AddWithValue("@id", bookId);
                }

                int rows = command.ExecuteNonQuery();
                if (rows > 0)
                {
                    MessageBox.Show("A könyv sikeresen frissítve lett.", "Siker", MessageBoxButton.OK, MessageBoxImage.Information);

                    // Refresh or activate main window and close this editor
                    var mainWindow = Application.Current.Windows.OfType<MainWindow>().FirstOrDefault();
                    if (mainWindow == null)
                    {
                        mainWindow = new MainWindow();
                        mainWindow.Show();
                    }
                    else
                    {
                        // try to refresh the DataGrid if method exists
                        try
                        {
                            mainWindow.DataGridFeltoltes();
                        }
                        catch
                        {
                            // ignore if not accessible
                        }

                        if (mainWindow.WindowState == WindowState.Minimized)
                        {
                            mainWindow.WindowState = WindowState.Normal;
                        }

                        mainWindow.Activate();
                    }

                    this.Close();
                }
                else
                {
                    MessageBox.Show("Nem történt módosítás. Ellenőrizd az adatokat.", "Figyelem", MessageBoxButton.OK, MessageBoxImage.Warning);
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show("Hiba történt a frissítés közben: " + ex.Message, "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
            }
            finally
            {
                Close_Connection();
            }
        }

        private void button_Megse_Click(object sender, RoutedEventArgs e)
        {
            // Cancel editing, bring existing main window to front or open a new one
            var mainWindow = Application.Current.Windows.OfType<MainWindow>().FirstOrDefault();
            if (mainWindow == null)
            {
                mainWindow = new MainWindow();
                mainWindow.Show();
            }
            else
            {
                if (mainWindow.WindowState == WindowState.Minimized)
                {
                    mainWindow.WindowState = WindowState.Normal;
                }

                mainWindow.Activate();
            }

            this.Close();
        }
    }
}
