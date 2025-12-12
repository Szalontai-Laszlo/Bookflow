const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());



// api lekérdezések és feltöltés
app.get("/api/users", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM users");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

//itt tudsz ugy keresni táblában hogy csak az adott id-t kapod meg pl: kéri az oldal hogy mi a 20 as könyv és instant odaadja az egész sort :P
app.get("/api/car/:id", async (req, res) => {
  req.params.id
})

"GET /api/car/20"

// ide jön majd a build- kiszolgálás

const PORT = 3000;
app.listen(PORT, () => console.log("Express API running on port " + PORT));
