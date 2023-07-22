// Inicio del código del Backend de EduSys
// Requerimientos para la App.
const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

// Inicializaciones
const app = express()
const port = 8000

// Conexión a la DB (Uso de dotenv para proteger datos SENSIBLES)

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Conectado a la base de datos")
    // Lógica del lado del servidor de mi App.
    
    app.get("/", (req, res) => {
      res.send("Hello fsdfdsWorld!");
    });

    app.listen(port, () => {
      console.log(
        `Example rdfssdfsdsdfsdfsdsfd lisgdfgfdtening on port ${port}`
      );
    });

}).catch(() => { console.log("Hubo un error en la conexión a la base de datos...")})


