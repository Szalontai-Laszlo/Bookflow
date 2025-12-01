using System;
using System.Collections.Generic;
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
        public MainWindow()
        {
            InitializeComponent();
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
    }
}
