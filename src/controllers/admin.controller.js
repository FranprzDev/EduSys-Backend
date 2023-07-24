const Admin = require("../models/admin.model");

const createAdmin = async (req, res) => {
  // Realizo la destructuración de la req
  const { nombre, apellido, direccion, dni, celular, mail } = req.body;

  // Genero mediante el modelo el Administrador

  const adminGenerado = new Admin({
    nombre: nombre,
    apellido: apellido,
    direccion: direccion,
    dni: dni,
    celular: celular,
    mail: mail,
  });

  // Espero que se guarde
  await adminGenerado.save();

  // Genero el código HTTP & Un mensaje de respueta
  res
    .status(201)
    .json({ message: `Se creo el Administrador ${nombre} ${apellido}` });
};

const deleteAdmin = async (req, res) => {
  const adminGenerado = await Admin.findById(req.params.id);

  if (adminGenerado === null) {
    res.status(404);
    return res.json({ message: "Administrador no encontrado" });
  }

  const filters = { _id: req.params.id };
  await adminGenerado.deleteOne(filters);

  res.status(204);
  res.json({ message: "Se elimino el administrador de la DB." });
};

const findAllAdmin = async (req, res) => {
  const adminGenerado = await Admin.find();
  if (adminGenerado.length == 0) {
    res.status(404);
    res.json({ message: "No se pudo encontrar la tabla de Administradores." });
  }

  res.status(200);
  res.json({ adminGenerado });
  // si aquí no hay nada en la DB tira un error.
};

const findAdminById = async (req, res) => {
  const adminGenerado = await Admin.findById(req.params.id);

  if (adminGenerado === null) {
    res.status(404);
    return res.json({ message: "Administrador no encontrado" });
  }

  res.json({ message: "Se encontró el administrador", datos: adminGenerado });
};

const updateAdminByID_mail = async (req, res) => {
  const adminGenerado = await Admin.findById(req.params.id);
  if (adminGenerado === null) {
    res.status(404);
    return res.json({ message: "Administrador no encontrado" });
  }

  // Lógica para la actualización por ID -> Mail
  await Admin.findByIdAndUpdate(req.params.id, {
    mail: req.body.mail,
  });

  res.status(200);
  res.json({
    message: `Se encontro el administrador ${adminGenerado.nombre} ${adminGenerado.apellido} y se actualizaron sus datos [Mail]`,
    datos: adminGenerado,
  });
  // Preguntar por que los datos que llegan al postman aún no están actualizados [como que van 1 atras]
};

const updateAdminByID_celular = async (req, res) => {
  const adminGenerado = await Admin.findById(req.params.id);
  if (adminGenerado === null) {
    res.status(404);
    return res.json({ message: "Administrador no encontrado" });
  }

  // Lógica para la actualización por ID -> Celular
  await Admin.findByIdAndUpdate(req.params.id, {
    celular: req.body.celular,
  });

  res.status(200);
  res.json({
    message: `Se encontro el administrador ${adminGenerado.nombre} ${adminGenerado.apellido} y se actualizaron sus datos [Mail]`,
    datos: adminGenerado,
  });
};

const updateAdminByID_direccion = async (req, res) => {
  const adminGenerado = await Admin.findById(req.params.id);
  if (adminGenerado === null) {
    res.status(404);
    return res.json({ message: "Administrador no encontrado" });
  }

  // Lógica para la actualización por ID -> Dirección
  await Admin.findByIdAndUpdate(req.params.id, {
    direccion: req.body.direccion,
  });

  res.status(200);
  res.json({
    message: `Se encontro el administrador ${adminGenerado.nombre} ${adminGenerado.apellido} y se actualizaron sus datos [Mail]`,
    datos: adminGenerado,
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
};
