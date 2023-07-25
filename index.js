// Inicio del código del Backend de EduSys
// Requerimientos para la App.
const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const Admin = require("./src/models/admin.model")
const adminRouter = require('./src/routes/admin.route')
const adminAuthRouter = require('./src/routes/adminAuth.route')
const { crearSuperAdmin } = require("./src/common/functions")
const cors = require("cors")


// Inicializaciones
const app = express()
app.use(cors())

const port = 8000

// Indico a mi aplicacion que podria recibir un json del usuario
app.use(express.json({ limit: "50mb" }))

// Rutas para la aplicación
app.use("/admin", adminRouter)
app.use("/auth", adminAuthRouter)

// Conexión a la DB (Uso de dotenv para proteger datos SENSIBLES)

mongoose.connect(process.env.MONGO_URI).then(() => {
    Admin.findOne().then(admins => {
        if (admins === null) { crearSuperAdmin() }
    })

    console.log("Conectado a la base de datos")

    app.listen(port, () => {
      console.log(
        `La aplicación se está ejecutando en el puerto ${port}`
      );
    });

}).catch(() => { console.log("Hubo un error en la conexión a la base de datos...")})


