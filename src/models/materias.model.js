const mongoose = require('mongoose');

const materiaSchema = new mongoose.Schema({
  nombre: String,
});

module.exports = mongoose.model('Materia', materiaSchema);
