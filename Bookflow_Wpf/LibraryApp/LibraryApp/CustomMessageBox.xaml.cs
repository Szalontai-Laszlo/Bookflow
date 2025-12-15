using System.Windows;

namespace LibraryApp
{
    public enum CustomMessageBoxResult
    {
        None,
        Kijelentkezes,
        Kilépés
    }

    public partial class CustomMessageBox : Window
    {
        public CustomMessageBoxResult Result { get; private set; } = CustomMessageBoxResult.None;

        public CustomMessageBox(string message, string title = "Megerõsítés")
        {
            InitializeComponent();
            Title = title;
            textBlockMessage.Text = message ?? "";

            if (Application.Current?.MainWindow != null && Application.Current.MainWindow.IsVisible)
            {
                Owner = Application.Current.MainWindow;
                WindowStartupLocation = WindowStartupLocation.CenterOwner;
            }
            else
            {
                WindowStartupLocation = WindowStartupLocation.CenterScreen;
            }

            btnKijelentkezes.Click += BtnKijelentkezes_Click;
            btnKilepes.Click += BtnKilepes_Click;
        }

        private void BtnKijelentkezes_Click(object sender, RoutedEventArgs e)
        {
            Result = CustomMessageBoxResult.Kijelentkezes;
            DialogResult = true;
            Close();
        }

        private void BtnKilepes_Click(object sender, RoutedEventArgs e)
        {
            Result = CustomMessageBoxResult.Kilépés;
            DialogResult = true;
            Close();
        }
    }
}