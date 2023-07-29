const { encriptarContrasenia } = require("../common/functions");
const Admin = require("../models/admin.model");
const bcrypt = require("bcryptjs");

/* -> Creación en DB Admin <- */

const createAdmin = async (req, res) => {
  // Realizo la destructuración de la req
  const { nombre, apellido, contrasenia, direccion, dni, celular, mail } =
    req.body;

  // Encripto la contraseña
  encriptarContrasenia(contrasenia);

  // Genero mediante el modelo el Administrador
  const admin = new Admin({
    nombre: nombre,
    apellido: apellido,
    contrasenia: hashedContra,
    direccion: direccion,
    dni: dni,
    celular: celular,
    mail: mail,
  });

  // Espero que se guarde
  await admin.save();

  // Genero el código HTTP & Un mensaje de respueta
  res.status(201);
  res.json({ message: `Se creo el Administrador ${nombre} ${apellido}` });
};

/* -> Borrado en DB Admin */

const deleteAdmin = async (req, res) => {
  const admin = await Admin.findById(req.params.id);

  if (admin === null) {
    res.status(404);
    return res.json({ message: "Administrador no encontrado" });
  }

  const filters = { _id: req.params.id };
  await admin.deleteOne(filters);

  res.status(200);
  res.json({ message: "Se elimino el administrador de la DB." });
};

/* -> Busqueda en DB Admin <- */
const findAllAdmin = async (req, res) => {
  const admin = await Admin.find();
  if (admin.length == 0) {
    res.status(404);
    res.json({ message: "No se pudo encontrar la tabla de Administradores." });
  }

  res.status(200);
  res.json({ admin });
  // si aquí no hay nada en la DB tira un error.
};

const findAdminById = async (req, res) => {
  const admin = await Admin.findById(req.params.id);

  if (admin === null) {
    res.status(404);
    return res.json({ message: "Administrador no encontrado" });
  }

  res.json({ message: "Se encontró el administrador", datos: admin });
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

const updateAdminByID_celular = async (req, res) => {
  const admin = await Admin.findById(req.params.id);
  if (admin === null) {
    res.status(404);
    return res.json({ message: "Administrador no encontrado" });
  }

  // Lógica para la actualización por ID -> Celular
  await Admin.findByIdAndUpdate(req.params.id, {
    celular: req.body.celular,
  });

  res.status(200);
  res.json({
    message: `Se encontro el administrador ${admin.nombre} ${admin.apellido} y se actualizaron sus datos [Mail]`,
    datos: admin,
  });
};

const updateAdminByID_direccion = async (req, res) => {
  const admin = await Admin.findById(req.params.id);
  if (admin === null) {
    res.status(404);
    return res.json({ message: "Administrador no encontrado" });
  }

  // Lógica para la actualización por ID -> Dirección
  await Admin.findByIdAndUpdate(req.params.id, {
    direccion: req.body.direccion,
  });

  res.status(200);
  res.json({
    message: `Se encontro el administrador ${admin.nombre} ${admin.apellido} y se actualizaron sus datos [Mail]`,
    datos: admin,
  });
};

const updateCampID = async (req, res) => {
  const admin = await Admin.findById(req.params.id);
  if (admin === null) {
    res.status(404);
    return res.json({ message: "Administrador no encontrado" });
  }

  // Lógica para la actualización por ID -> Nombre, Apellido y DNI y Contraseña
  await Admin.findByIdAndUpdate(req.params.id, {
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    dni: req.body.dni,
  });

  res.status(200);
  res.json({
    message: `Se encontro el administrador.`,
    datos: admin,
  });
};

module.exports = {
  createAdmin,
  deleteAdmin,
  findAllAdmin,
  findAdminById,
  updateAdminByID_mail,
  updateAdminByID_celular,
  updateAdminByID_direccion,
  updateCampID,
};
