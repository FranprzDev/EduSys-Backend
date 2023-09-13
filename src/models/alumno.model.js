const mongoose = require("mongoose")
const Materia = require("./materias.model");
const Nota = require("./notas.model");

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
    dni: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minLength: 6,
        maxLength: 8,
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

alumnoSchema.pre("save", async function (next) {
  if (!this.isNew) {
    return next();
  }

  try {
    const materias = await Materia.find();
    const notasPromises = [];

    for (let anio = 1; anio <= this.anioCursado; anio++) {
      materias.forEach(async (materia) => {
        const nota = new Nota({
          materia: materia._id,
          alumno: this._id,
          nombreMateria: materia.nombre,
          anio: anio,
          nota: 0,
        });
        await nota.save();
        notasPromises.push(nota);
      });
    }

    await Promise.all(notasPromises);
    next();
  } catch (error) {
    next(error);
  }
});


const Alumno = mongoose.model("Alumno", alumnoSchema)

module.exports = Alumno;
