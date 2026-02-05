using MySql.Data.MySqlClient;
using MySqlX.XDevAPI.Common;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using System.Windows.Threading;


namespace LibraryApp
{
    /// <summary>   
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        MySqlConnection connection = new MySqlConnection("server=localhost; database=bookflow; uid=root; charset=utf8mb4");
        LoginWindow loginWindow = new LoginWindow();

        private DataTable booksTable;

        public MainWindow()
        {
            InitializeComponent();
            CommonInitialize();
        }

        // MainWindow preview-t nyitja meg a LoginWindow
        public MainWindow(bool preview) : this()
        {
            if (preview)
            {
                ConfigurePreviewMode();
            }
        }

        private void CommonInitialize()
        {
            // Datagrid feltöltése a könyvek adataival, és idő frissítése minden másodpercben
            DataGridFeltoltes();
            DispatcherTimer timer = new DispatcherTimer();
            timer.Tick += new EventHandler(UpdateTimer_Tick);
            timer.Interval = new TimeSpan(0, 0, 1);
            timer.Start();
        }

        // Preview mód beállitása
        private void ConfigurePreviewMode()
        {
            // Use a tool window look, do not show in taskbar, fixed size and centered
            this.WindowStyle = WindowStyle.ToolWindow;
            this.ResizeMode = ResizeMode.NoResize;
            this.ShowInTaskbar = false;
            this.Width = 700;
            this.Height = 700;
            this.WindowStartupLocation = WindowStartupLocation.CenterScreen;
            this.Opacity = 0.98;

            // Make title indicate preview - this is optional
            this.Title = this.Title + " - Preview";
        }

        private void UpdateTimer_Tick(object sender, EventArgs e)
        {
            // Idő frissítése minden tick-kor
            textBlock_ido.Text = DateTime.Now.ToString();
        }
        private void addbookwindow_Click(object sender, RoutedEventArgs e)
        {
            // Új könyv hozzáadása megnyitása a könyv hozzáadásához, majd a jelenlegi ablak bezárása
            AddBookWindow addbbokwindow = new AddBookWindow();
            addbbokwindow.Show();
            this.Close();
        }

        public void DataGridFeltoltes()
        {
            // Adatbázis lekérdezése a könyvek adataival, majd a DataGrid feltöltése ezekkel az adatokkal
            MySqlDataAdapter adapter = new MySqlDataAdapter("SELECT `books`.id AS `Számozás`, `books`.title AS `Könyv Cime`, `authors`.name AS `Szerző`, CASE WHEN `books`.status = 1 THEN 'Kibérelhető' ELSE 'Kibérelt' END AS `status` FROM `books` INNER JOIN `authors` ON `books`.author_id = `authors`.id;", connection);
            booksTable = new DataTable();
            adapter.Fill(booksTable);
            // Sorok szűrésénél ne legyen érzékeny a kis- és nagybetűkre
            booksTable.CaseSensitive = false;
            dataGrid_osszeskonyv.ItemsSource = booksTable.DefaultView;
        }

        private void TextBox_Search(object sender, TextChangedEventArgs e)
        {
            // Keresőmező szövegének változásakor frissítjük a DataGrid szűrését a megadott szöveg alapján
            var tb = sender as TextBox;
            if (booksTable == null || tb == null)
            {
                return;
            }
            // Keresőszöveg lekérése és körülötte lévő szóközök eltávolítása
            string searchText = tb.Text.Trim();

            // RowFilter használata a DataView-n, hogy csak azok a sorok jelenjenek meg, amelyekben a "Könyv Cime" oszlop tartalmazza a keresőszöveget.
            try
            {
                if (string.IsNullOrEmpty(searchText))
                {
                    booksTable.DefaultView.RowFilter = string.Empty;
                }
                else
                {
                    string escaped = searchText.Replace("'", "''");

                    booksTable.DefaultView.RowFilter = string.Format("[Könyv Cime] LIKE '%{0}%'", escaped);
                }
            }
            // Ha a RowFilter-ben nincsen megfelelő találat, akkor üresre teszi a szűrőt, és a DataGrid üres marad
            catch (Exception)
            {
                booksTable.DefaultView.RowFilter = string.Empty;
            }
        }

        private void dataGrid_osszeskonyv_MouseDoubleClick(object sender, MouseButtonEventArgs e)
        {
            // Kiválasztott könyv szerkesztése dupla kattal.
            this.Close();
            EditBooksWindow editBooksWindow = new EditBooksWindow(dataGrid_osszeskonyv.SelectedItem);
            editBooksWindow.Show();

        }

        private void button_Kilepes_Click(object sender, RoutedEventArgs e)
        {
            // Kijelentkezés vagy kilépés megerősítése egyedi üzenetablakkal, majd a választás alapján a megfelelő művelet végrehajtása
            var box = new CustomMessageBox("Válassz az alábbi lehetőségek közül!", "Kijelentkezés");
            bool? result = box.ShowDialog();

            if (result == true)
            {
                switch (box.Result)
                {
                    case CustomMessageBoxResult.Kijelentkezes:
                        loginWindow = new LoginWindow();
                        loginWindow.Show();
                        this.Close();
                        break;

                    case CustomMessageBoxResult.Kilépés:
                        Application.Current.Shutdown();
                        break;

                    default:
                        break;
                }
            }
        }

        private void button_torles_Click(object sender, RoutedEventArgs e)
        {
            // Kiválasztott könyv törlése a DataGridből és az adatbázisból, megerősítést kérve a felhasználótól a törlés előtt
            var selected = dataGrid_osszeskonyv.SelectedItem as DataRowView;
            if (selected == null)
            {
                MessageBox.Show("Kérlek jelölj ki egy sort a törléshez.", "Nincs kiválasztva", MessageBoxButton.OK, MessageBoxImage.Information);
                return;
            }

            int id;
            if (!int.TryParse(Convert.ToString(selected["Számozás"]), out id))
            {
                MessageBox.Show("A kiválasztott sor nem tartalmaz érvényes azonosítót.", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                return;
            }

            string title = selected.Row.Table.Columns.Contains("Könyv Cime") ? Convert.ToString(selected["Könyv Cime"]) : id.ToString();
            if (MessageBox.Show($"Biztosan törölni szeretnéd a(z) \"{title}\" könyvet?", "Törlés megerősítése", MessageBoxButton.YesNo, MessageBoxImage.Warning) != MessageBoxResult.Yes)
            {
                return;
            }

            // Törlés az adatbázisból
            try
            {
                if (connection.State != ConnectionState.Open)
                {
                    connection.Open();
                }

                using (var cmd = new MySqlCommand("DELETE FROM books WHERE id = @id", connection))
                {
                    cmd.Parameters.AddWithValue("@id", id);
                    int affected = cmd.ExecuteNonQuery();
                    if (affected > 0)
                    {
                        // Táblából eltávolítás helyben: így a grid azonnal frissül, nem kell újra lekérdezni
                        booksTable.Rows.Remove(selected.Row);
                        MessageBox.Show("A könyv sikeresen törölve lett.", "Siker", MessageBoxButton.OK, MessageBoxImage.Information);
                    }
                    else
                    {
                        MessageBox.Show("A rekord nem található vagy már törölve lett.", "Információ", MessageBoxButton.OK, MessageBoxImage.Information);
                    }
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show("Hiba történt a törlés során: " + ex.Message, "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                {
                    connection.Close();
                }
            }
        }
    }
}