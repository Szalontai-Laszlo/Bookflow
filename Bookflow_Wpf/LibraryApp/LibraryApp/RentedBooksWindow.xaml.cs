using MySql.Data.MySqlClient;
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
using System.Windows.Threading;

namespace LibraryApp
{
    /// <summary>
    /// Interaction logic for RentedBooksWindow.xaml
    /// </summary>
    public partial class RentedBooksWindow : Window
    {
        MySqlConnection connection = new MySqlConnection("server=localhost; database=bookflow; uid=root; charset=utf8mb4");
        public RentedBooksWindow()
        {
            InitializeComponent();
            DataGridFeltoltes();

            DispatcherTimer timer = new DispatcherTimer();
            timer.Tick += new EventHandler(UpdateTimer_Tick);
            timer.Interval = new TimeSpan(0, 0, 1);
            timer.Start();
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

        private void addbookwindow_Click(object sender, RoutedEventArgs e)
        {
            AddBookWindow addbbokwindow = new AddBookWindow();
            addbbokwindow.Show();
            this.Close();
        }

        private void UpdateTimer_Tick(object sender, EventArgs e)
        {
            textBlock_ido.Text = DateTime.Now.ToString();
        }
        public void DataGridFeltoltes()
        {
            MySqlDataAdapter adapter = new MySqlDataAdapter("SELECT `users`.`name`,`books`.title AS `Könyv Cime`, `authors`.name AS `Szerző`,`borrows`.`borrow_start` AS `Bérlés Kezdete`, `borrows`.`borrow_end` AS `Bérlés Vége`, CASE WHEN `books`.status = 0 THEN 'Kibérelhető' ELSE 'Kibérelt' END AS `status` FROM `books` INNER JOIN `authors` ON `books`.author_id = `authors`.id INNER JOIN `borrows` ON `books`.`id` = `borrows`.`book_id` INNER JOIN `users` ON `borrows`.`user_id` = `users`.`id`;", connection);
            DataTable dataTable = new DataTable();
            adapter.Fill(dataTable);
            dataGrid_bereltkonyvek.ItemsSource = dataTable.DefaultView;
        }
    }
}
