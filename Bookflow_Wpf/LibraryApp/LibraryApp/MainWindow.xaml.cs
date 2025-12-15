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


namespace LibraryApp
{
    /// <summary>   
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        MySqlConnection connection = new MySqlConnection("server=localhost; database=bookflow; uid=root; charset=utf8mb4");
        string query = "";
        LoginWindow loginWindow = new LoginWindow();
        public MainWindow()
        {
            InitializeComponent();
            DataGridFeltoltes();
            //this.Hide();
            //loginWindow.Show();
            //Bejelentkezes();
        }

        private void torlesgomb_Click(object sender, RoutedEventArgs e)
        {

        }

        private void szerkesztes_Click(object sender, RoutedEventArgs e)
        {

        }

        private void hozzaadas_Click(object sender, RoutedEventArgs e)
        {

        }

        private void rentedbookwindow_Click(object sender, RoutedEventArgs e)
        {
            RentedBooksWindow rentedBooksWindow = new RentedBooksWindow();
            rentedBooksWindow.Show();
            this.Close();
        }

        private void addbookwindow_Click(object sender, RoutedEventArgs e)
        {
            AddBookWindow addbbokwindow = new AddBookWindow();
            addbbokwindow.Show();
            this.Close();
        }
        public void DataGridFeltoltes()
        {
            MySqlDataAdapter adapter = new MySqlDataAdapter("SELECT `books`.title AS `Könyv Cime`, `authors`.name AS `Szerző`, CASE WHEN `books`.status = 1 THEN 'Kibérelhető' ELSE 'Kibérelt' END AS `status` FROM `books` INNER JOIN `authors` ON `books`.author_id = `authors`.id;", connection);
            DataTable dataTable = new DataTable();
            adapter.Fill(dataTable);
            dataGrid_osszeskonyv.ItemsSource = dataTable.DefaultView;
        }

        public void Bejelentkezes()
        {

        }

        private void dataGrid_osszeskonyv_MouseDoubleClick(object sender, MouseButtonEventArgs e)
        {
            this.Close();
            EditBooksWindow editBooksWindow = new EditBooksWindow(dataGrid_osszeskonyv.SelectedItem);
            editBooksWindow.Show();

        }

        private void button_Kilepes_Click(object sender, RoutedEventArgs e)
        {
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
    }
}