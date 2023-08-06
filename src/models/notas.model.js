const mongoose = require('mongoose');

const notaSchema = new mongoose.Schema({
    // Establecemos las relaciones con los moedlos mediante el ObjectID (Mongo-ID)
  materia: { type: mongoose.Schema.Types.ObjectId, ref: 'Materia' },
  alumno: { type: mongoose.Schema.Types.ObjectId, ref: 'Alumno' },
  anio: Number,
  nota: Number,
});

module.exports = mongoose.model('Nota', notaSchema);
