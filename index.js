// Inicio del código del Backend de EduSys
// Requerimientos para la App.
const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const cors = require("cors")
const adminRouter = require('./src/routes/admin.route.js')

// Inicializaciones
const app = express()
app.use(cors())
const port = 8000

// Indico a mi aplicacion que podria recibir un json del usuario
app.use(express.json({ limit: "50mb" }))

// Rutas para la aplicación
app.use("/admin", adminRouter)

// Conexión a la DB (Uso de dotenv para proteger datos SENSIBLES)

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Conectado a la base de datos")
    // Lógica del lado del servidor de mi App.

    app.listen(port, () => {
      console.log(
        `Example rdfssdfsdsdfsdfsdsfd lisgdfgfdtening on port ${port}`
      );
    });

}).catch(() => { console.log("Hubo un error en la conexión a la base de datos...")})


