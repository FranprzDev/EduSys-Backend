const { encriptarContrasenia } = require("../common/functions");
const Alumno = require("../models/alumno.model");
const bcrypt = require("bcryptjs");

/* -> Creación en DB Alumno <- */

const createAlumno = async (req, res) => {
  // Realizo la destructuración de la req
  const { nombre, apellido, contrasenia, alDia, } =
    req.body;

  // Encripto la contraseña
  encriptarContrasenia(contrasenia);

  // Genero mediante el modelo el Administrador
  const alumno = new Alumno({
    nombre: nombre,
    apellido: apellido,
    contrasenia: hashedContra,
    alDia: booleanito,
  });

  // Espero que se guarde
  await alumno.save();

  // Genero el código HTTP & Un mensaje de respueta
  res.status(201);
  res.json({ message: `Se creo el Alumno ${nombre} ${apellido}` });
};

/* -> Borrado en DB Alumno */

const deleteAlumno = async (req, res) => {
  const alumno = await Alumno.findById(req.params.id);

  if (alumno === null) {
    res.status(404);
    return res.json({ message: "Alumno no encontrado" });
  }

  const filters = { _id: req.params.id };
  await alumno.deleteOne(filters);

  res.status(200);
  res.json({ message: "Se elimino el alumno de la DB." });
};

/* -> Busqueda en DB Alumno <- */
const findAllAlumno = async (req, res) => {
  const alumno = await alumno.find();
  if (alumno.length == 0) {
    res.status(404);
    res.json({ message: "No se pudo encontrar la tabla de Alumnos." });
  }

  res.status(200);
  res.json({ alumno });
  // si aquí no hay nada en la DB tira un error.
};

const findAlumnoById = async (req, res) => {
  const alumno = await Alumno.findById(req.params.id);

  if (alumno === null) {
    res.status(404);
    return res.json({ message: "Alumno no encontrado" });
  }

  res.json({ message: "Se encontró el Alumno", datos: alumno });
};

/* -> Actualización en DB Admin <- */

const updateAdminByID_mail = async (req, res) => {
  const admin = await Admin.findById(req.params.id);
  if (admin === null) {
    res.status(404);
    return res.json({ message: "Administrador no encontrado" });
  }

  // Lógica para la actualización por ID -> Mail
  await Admin.findByIdAndUpdate(req.params.id, {
    mail: req.body.mail,
  });

  res.status(200);
  res.json({
    message: `Se encontro el administrador ${admin.nombre} ${admin.apellido} y se actualizaron sus datos [Mail]`,
    datos: admin,
  });
  // Preguntar por que los datos que llegan al postman aún no están actualizados [como que van 1 atras]
};


module.exports = {
 createAlumno,
  deleteAlumno,
  findAllAlumno,
  findAlumnoById,
  
 
};
