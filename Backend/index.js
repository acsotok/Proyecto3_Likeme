const express = require("express")
const app = express()
const cors = require("cors")
const pool = require("./src/config/db")

app.listen(3000, () => 
    console.log("Servidor corriendo 3000")
)

app.use(cors())
app.use(express.json())


app.get("/posts", async (req, res) => {
    try {
        const query = "SELECT * FROM posts;"
        const { rows } = await pool.query(query)

        if (!rows) {
            res.send(console.log("posts no encontrados"))
        }
        res.json(rows)
    } catch (error) {
        console.log("Hay un error".error.message)
    }

})


app.post("/posts", async (req, res) => {

    const { titulo, url, descripcion } = req.body

    try {
        if (!titulo || !url || !descripcion) {
            res.send(console.log("debe completar todos los campos"));
        }
        else {
            const id = Math.floor(Math.random() * 9999)
            const query = "INSERT INTO posts (id, titulo, img, descripcion, likes) VALUES($1, $2, $3, $4, $5);"
            const values = [id, titulo, url, descripcion, 0]
            const { rows } = await pool.query(query, values)
            res.send("¡Post creado con éxito!")
        }

    } catch (error) {
        console.log("Hay un error".error.message)
    }

})

