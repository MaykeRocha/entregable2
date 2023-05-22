const express = require("express");
const db = require('./utils/database');
const Tareas = require('./models/tarea.models');
require('dotenv').config();


const PORT = process.env.PORT || 8000;

db.authenticate()
.then(() => console.log("Database conected succesufully"))
.catch((err) => console.log(err));

db.sync()
.then(() => console.log("database synced succesufully"))
.catch(error => console.log(error))

const app = express();

app.use(express.json());

app.get("/", (req, res,) => {
    res.send("Servidor funcionando");
});

app.delete("/tareas/:id", async(req, res) => {
    try {
        const {id} = req.params;
        await Tareas.destroy({
            where: {id}
        });
        res.status(204).send();
    } catch (error) {
        res.status(400).json(error);
    }
});

app.post('/tareas', async (req, res) => {
    try{
        const newTarea = req.body;
        await Tareas.create(newTarea);
        res.status(201).send();
    } catch (error) {
        res.status(400).json(error);
    }
});


app.get("/tareas/:id", async (req, res) => {
    try {
        const { id } = req.params;
        console.log(req.params);

        const tarea = await Tareas.findByPk(id);
        res.json(tarea);

    } catch (error) {
        res.status(400).json(error);
    }
});

app.put('/tareas/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        await Tareas.update(
            { title, description },
            {
            where: { id },
        }
        );
        res.status(204).send();
    } catch (error) {
        res.status(400).json(error);
    }
});


app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
});

console.log(process.env);
