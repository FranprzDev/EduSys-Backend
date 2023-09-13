const mongoose = require('mongoose');

const notaSchema = new mongoose.Schema({
  materia: { type: mongoose.Schema.Types.ObjectId, ref: 'Materia' },
  alumno: { type: mongoose.Schema.Types.ObjectId, ref: 'Alumno' },
  nombreMateria: String,
  anio: Number,
  nota: Number,
});

module.exports = mongoose.model('Nota', notaSchema);
