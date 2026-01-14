const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());



// Könyvek lekérése
app.get("/api/books", async (req, res) => {
  try {
    const [rows] = 
    await db.query(`SELECT 
                          books.id,
                          books.title,
                          authors.name AS authors_name,
                          books.img,
                          books.description 
                    FROM books 
                    INNER JOIN authors 
                    ON books.author_id = authors.id`
                  );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

//Utolsó létrehozott könyv id lekérdezése
app.get("/api/books/last_book_id", async (req, res) => {
  try {
    const [rows] = 
    await db.query("SELECT `id` FROM books ORDER BY `id` DESC LIMIT 1");
    res.json({ lastUserId: rows[0].id });;
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});


// Szerzők lekérése
app.get("/api/authors", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM authors");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// Login oldalhoz való lekérés
app.get("/api/users/login", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT `email`,`password` FROM `users`");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

//Felhasználók lekérése
app.get("/api/users", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM users");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// id alapján lévő keresés
app.get("/api/users/:id", async (req, res) => {
  res.params.id
})

const PORT = 3000;
app.listen(PORT, () => console.log("A Backend szerver elindult a: " + PORT +"-on"));
