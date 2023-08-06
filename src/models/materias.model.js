const mongoose = require('mongoose');

// Como las materias son constante, y siempre tendremos las mismas materias:
// Matemáticas
// Lengua y Literatura
// Biología
// Física
// Química
// Economía
// Geografía
// Historia
// Educación Física
// Entonces definimos un schema solamente con el nombre
// ¡Ojo que si qusieramos más interactividad en nuestro sitio,
// tranquilamente podríamos agregar a que año pertenecen y hacer vinculaciones para hacer otro crud.

const materiaSchema = new mongoose.Schema({
  nombre: String,
});

module.exports = mongoose.model('Materia', materiaSchema);
