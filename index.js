// Inicio del código del Backend de EduSys
// Requerimientos para la App.
const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const Admin = require("./src/models/admin.model")
const adminRouter = require('./src/routes/admin.route')
const adminAuthRouter = require('./src/routes/adminAuth.route')
const institutionRouter = require('./src/routes/institution.route')
const alumnoRouter = require('./src/routes/alumno.route')
const notasRouter = require('./src/routes/notas.route')
const { crearSuperAdmin, crearMaterias } = require("./src/common/functions")
const cors = require("cors")
const morgan = require("morgan")
const Materias = require('./src/models/materias.model')


const app = express()
app.use(cors())

const port = 8000

app.use(express.json({ limit: "50mb" }))

if(process.env.NODE_ENV === "development") {
  app.use(morgan("dev"))
}

// Rutas para la aplicación
app.use("/admin", adminRouter)
app.use("/auth", adminAuthRouter)
app.use("/inst", institutionRouter)
app.use("/alumno", alumnoRouter)
app.use("/notas", notasRouter)


mongoose.connect(process.env.MONGO_URI).then(() => {
    Admin.findOne().then(admins => {
        if (admins === null) { crearSuperAdmin() }
    })

    Materias.findOne().then(materias => {
      if (materias === null) { crearMaterias() }
    })

    

    console.log("Conectado a la base de datos")

    app.listen(port, () => {
      console.log(
        `La aplicación se está ejecutando en el puerto ${port}`
      );
    });

}).catch(() => { console.log("Hubo un error en la conexión a la base de datos...")})


