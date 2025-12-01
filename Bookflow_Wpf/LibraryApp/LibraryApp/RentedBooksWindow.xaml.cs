using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
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
using System.Windows.Shapes;
using MySql.Data.MySqlClient;

namespace LibraryApp
{
    /// <summary>
    /// Interaction logic for RentedBooksWindow.xaml
    /// </summary>
    public partial class RentedBooksWindow : Window
    {
        public RentedBooksWindow()
        {
            InitializeComponent();
        }
        MySqlConnection connection = new MySqlConnection("server=localhost; database=bookflow; uid=root");
        MySqlCommand command;
        string query = "";
        private void fooldal_Click(object sender, RoutedEventArgs e)
        
         
        {
            MainWindow mainWindow = new MainWindow();
            mainWindow.Show();
            this.Close();
        }

        private void addbookwindow_Click(object sender, RoutedEventArgs e)
        {
            AddBookWindow addbbokwindow = new AddBookWindow();
            addbbokwindow.Show();
            this.Close();
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
        public void DataGrid_Feltolt()
        {
            MySqlDataAdapter Adapter = new MySqlDataAdapter("SELECT * FROM `books` WHERE `status` = '0'", connection);
            DataTable dt = new DataTable();
            Adapter.Fill(dt);
            dataGrid_bereltkonyvek.ItemsSource = dt.DefaultView;
        }
    }
}
