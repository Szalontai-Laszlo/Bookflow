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

// Utolsó létrehozott könyv id lekérdezése
app.get("/api/books/last_book_id", async (req, res) => {
  try {
    const [rows] = 
    await db.query("SELECT COUNT(id) AS 'count' FROM `books` WHERE status = 1");
    res.json({ count: rows[0]?.count ?? 0 });;
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// Kibérelt könyvek számának lekérése
app.get("/api/books/reserved_books", async (req, res) => {
  try {
    const [rows] = 
    await db.query("SELECT COUNT(id) as 'count' FROM `books` WHERE status = 0");
    res.json({ count: rows[0]?.count ?? 0 });;
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// Összes könyv számának lekérése
app.get("/api/books/all_books", async (req, res) => {
  try {
    const [rows] = 
    await db.query("SELECT COUNT(id) as 'count' FROM `books`");
    res.json({ count: rows[0]?.count ?? 0 });;
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});



// Szerzők lekérése
app.get("/api/authors", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT `name`, `image`, `description` FROM authors");
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

// Felhasználók lekérése
app.get("/api/users", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM users");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.post("/api/login", async (req, res) => {
  const {email, password} = req.body;

  if(!email || !password){
    return res.status(400).json({ message: "Hiányzó adatok" });
  }
  try {
    const [rows] = await db.query(
      "SELECT id, email, name FROM users WHERE email = ? AND password = ?",
      [email, password]
    );

    if(rows.length === 0) {
      return res.status(401).json({message: "Hibás email vagy jelszó"})
    }

    res.json({
      success: true,
      user: rows[0]
    });

   
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Szerver hiba" });
  }
});

// Kölcsönzés oldalhoz szükséges lekérés
app.get("/api/books/loan_books", async (req, res) => {
  try {
    const [rows] = await db.query(`SELECT 
                                      books.title AS 'title',
		                                  authors.name AS 'author'
                                    FROM books 
                                    INNER JOIN authors 
                                    ON authors.id = books.author_id
                                    WHERE books.status = 1`
                                  );
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
app.listen(PORT, () => console.log("A Backend szerver elindult a: " + PORT +"res porton."));
