using MySql.Data.MySqlClient;
using System;
using System.Collections;
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
using System.Windows.Shapes;

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
            MainWindow mainWindow = new MainWindow();
            mainWindow.Show();
            this.Close();
        }

        private void rentedbookwindow_Click(object sender, RoutedEventArgs e)
        {
            RentedBooksWindow rentedbookswindow = new RentedBooksWindow();
            rentedbookswindow.Show();
            this.Close();
        }
        public void ComboBox_Feltolt()
        {
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
    }
}
