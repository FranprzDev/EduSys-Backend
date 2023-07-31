const mongoose = require("mongoose")

const alumnoSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minLength: 3,
        maxLength: 25
    },
    apellido: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minLength: 3,
        maxLength: 25
    },
    anioCursado: {
        type: Number ,
        required: true,
        trim: true, 
        minLength: 1,
        maxLength: 1,
    },
    alDia: {
        type: Boolean,
        required: true,
        trim: true,
        unique: false,
    },
  
   
  
   
    
})

const Alumno = mongoose.model("Alumno", alumnoSchema)

module.exports = Alumno;
