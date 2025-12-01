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
using System.Windows.Shapes;

namespace LibraryApp
{
    /// <summary>
    /// Interaction logic for AddBookWindow.xaml
    /// </summary>
    public partial class AddBookWindow : Window
    {
        public AddBookWindow()
        {
            InitializeComponent();
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
    }
}
