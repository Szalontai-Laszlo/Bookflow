using MySql.Data.MySqlClient;
using System;
using System.Data;
using System.Windows;

namespace LibraryApp
{
    /// <summary>
    /// Interaction logic for LoginWindow.xaml
    /// </summary>
    public partial class LoginWindow : Window
    {
        MySqlConnection connection = new MySqlConnection("server=localhost;database=bookflow;uid=root;charset=utf8mb4");

        public LoginWindow()
        {
            InitializeComponent();
        }

        private void button_Kilepes_Click(object sender, RoutedEventArgs e)
        {
            // Bezárjuk a MySQL kapcsolatot
            try 
            {
                if (connection != null && connection.State == ConnectionState.Open)
                {
                    connection.Close();
                }
            }
            catch
            {
            }
            // Úgyan az mint a Application.Current.Shutdown(), de ez biztosan azonnal kilép,
            Environment.Exit(0);
        }

        // Login gomb 
        private void Button_Click(object sender, RoutedEventArgs e)
        {
            // Email és jelszó lekérése a felhasználói felületről
            string email = textBox_Email.Text?.Trim();
            string password = passwordBox_Jelszo.Password ?? string.Empty;

            // Ha az email vagy a jelszó mező üres, akkor a felhasználó kap egy üzenetet, hogy adja meg mindkettőt
            if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(password))
            {
                MessageBox.Show("Kérlek add meg az emailt és a jelszót.", "Hiányzó adatok", MessageBoxButton.OK, MessageBoxImage.Warning);
                return;
            }
            // try ciklus a MySQL kapcsolat és lekérdezés körül, hogy kezeljük az esetleges hibákat
            try
            {
                using (var cmd = new MySqlCommand("SELECT COUNT(1) FROM `users` WHERE `email` = @email AND `password` = @password;", connection))
                {
                    cmd.Parameters.AddWithValue("@email", email);
                    cmd.Parameters.AddWithValue("@password", password);

                    if (connection.State != ConnectionState.Open)
                    {
                        connection.Open();
                    }

                    // ExecuteScalar visszaadja az első oszlop első sorának értékét, ami a COUNT(1) eredménye lesz
                    object result = cmd.ExecuteScalar();
                    int count = 0;

                    // Ellenőrizzük, hogy a result nem null és nem DBNull.Value, majd megpróbáljuk int-re konvertálni
                    if (result != null && result != DBNull.Value)
                    {
                        int.TryParse(result.ToString(), out count);
                    }

                    // Ha a count nagyobb mint 0, akkor van olyan felhasználó, és megnyitja a MainWindow-ot. Sajnos 2 szer nyilik meg a MainWindow
                    if (count > 0)
                    {
                        // Successful login: open MainWindow in preview mode
                        var main = new MainWindow(preview: false);
                        main.Show();
                        this.Close();
                    }
                    // Ha a count 0, akkor nincs ilyen felhasználó, és megjelenítünk egy hibaüzenetet
                    else
                    {
                        MessageBox.Show("Hibás email vagy jelszó.", "Sikertelen bejelentkezés", MessageBoxButton.OK, MessageBoxImage.Error);
                    }
                }
            }
            // Bármilyen kivétel esetén megjelenítünk egy hibaüzenetet a felhasználónak
            catch (Exception ex)
            {
                MessageBox.Show("Hiba történt: " + ex.Message, "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
            }
            // Lecsatlakozunk a MySQL szerverről, ha a kapcsolat még nyitva van
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
