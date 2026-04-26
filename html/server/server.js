const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

const bcrypt = require('bcryptjs');

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

// User Login
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

// User Register
app.post('/api/register', async (req, res) => {
  console.log('[REGISTER] body:', req.body);
  try {
    const { name, email, password, gender } = req.body;
    if (!name || !email || !password || !gender) {
      return res.status(400).json({ message: 'Hiányzó adatok' });
    }
    try {
      const [result] = await db.query(
        'INSERT INTO users (name, email, password, gender, type) VALUES (?, ?, ?, ?, ?)',
        [name, email, password, gender, 'U']
      );
      console.log('[REGISTER] inserted id:', result.insertId);
      return res.status(201).json({ message: 'User registered', user: { id: result.insertId, name, email, gender, type: 'U' }});
    } catch (dbErr) {
      // Egyedi email hiba kezelése
      if (dbErr.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ message: 'Ez az email már foglalt.' });
      }
      console.error('[REGISTER] DB ERROR:', dbErr.stack || dbErr);
      return res.status(500).json({ message: 'Adatbázis hiba', details: dbErr.message });
    }
  } catch (err) {
    console.error('[REGISTER] ERROR:', err.stack || err);
    return res.status(500).json({ message: 'Szerver hiba', details: err.message });
  }
});

app.post("/api/update_profile", async (req, res) => {
  try {
    const { id, name, email, gender, password } = req.body;

    if (!id) {
      return res.status(400).json({ error: "Hiányzó user ID" });
    }

    let query = `UPDATE users SET name = ?, email = ?, gender = ?`;
    let values = [name, email, gender];

    if (password) {
      const hashed = await bcrypt.hash(password, 10);
      query += `, password = ?`;
      values.push(hashed);
    }

    query += ` WHERE id = ?`;
    values.push(id);

    await db.query(query, values);

    res.json({
      message: "Sikeres frissítés",
      user: { id, name, email, gender }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});


// Kölcsönzés oldalhoz szükséges lekérés
app.get("/api/books/loan_books", async (req, res) => {
  try {
    const [rows] = await db.query(`SELECT 
                                      books.id,
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

// Kölcsönzés rögzítése a borrows táblába
app.post("/api/borrows", async (req, res) => {
  try {
    const { book_id, user_id, borrow_start, borrow_end } = req.body;

    if (!book_id || !user_id || !borrow_start || !borrow_end) {
      return res.status(400).json({ message: 'Hiányzó adatok' });
    }

    const [result] = await db.query(
      'INSERT INTO borrows (book_id, user_id, borrow_start, borrow_end) VALUES (?, ?, ?, ?)',
      [book_id, user_id, borrow_start, borrow_end]
    );

    // Frissítsük a könyv statuszát 0-ra (kikölcsönzött)
    await db.query('UPDATE books SET status = 0 WHERE id = ?', [book_id]);

    res.status(201).json({ 
      message: 'Kölcsönzés sikeresen rögzítve', 
      borrowId: result.insertId 
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log("A Backend szerver elindult a: " + PORT +"res porton."));
