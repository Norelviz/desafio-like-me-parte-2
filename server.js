const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();

app.use(cors());
app.use(express.json());

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "Nore1403",
  database: "likeme",
  port: 5432,
  allowExitOnIdle: true,
});

// GET
app.get("/posts", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM posts ORDER BY id ASC");
    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error al obtener los posts");
  }
});

// POST
app.post("/posts", async (req, res) => {
  try {
    const { titulo, img, descripcion } = req.body;

    const consulta =
      "INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4) RETURNING *";

    const values = [titulo, img, descripcion, 0];

    const result = await pool.query(consulta, values);

    res.json(result.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error al crear el post");
  }
});

// PUT (LIKE)
app.put("/posts/like/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const consulta = `
      UPDATE posts
      SET likes = likes + 1
      WHERE id = $1
      RETURNING *;
    `;

    const result = await pool.query(consulta, [id]);
    res.json(result.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error al dar like al post");
  }
});

// DELETE
app.delete("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const consulta = "DELETE FROM posts WHERE id = $1 RETURNING *";

    const result = await pool.query(consulta, [id]);

    res.json(result.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error al eliminar el post");
  }
});

app.listen(3000, () => {
  console.log("Servidor encendido en http://localhost:3000");
});