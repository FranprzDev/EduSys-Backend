const Admin = require("../models/admin.model");
const bcrypt = require("bcryptjs");
const { JWT_SECRET } = require("../common/constants")
const jwt = require("jsonwebtoken");

/* -> Login en DB Admin <-.*/

const loginAdmin = async (req, res) => {
  const { mail, contrasenia } = req.body;

  // Los datos pasan bien por aquí
  const admin = await Admin.findOne({mail});

  if (admin === null) {
    res.status(404);
    return res.json({ message: "Administrador no encontrado" });
  }

  // Verifica si la contraseña es igual a la del principio. 
  const isMatch = bcrypt.compareSync(contrasenia, admin.contrasenia);

  if (!isMatch) {
    res.status(401);
    return res.json({ message: "Sin autorización / Contraseña Incorrecta" });
  }

  // Firmo el JWT
  const token = jwt.sign(
    {
      id: admin._id,
      nombre: admin.nombre,
      apellido: admin.contrasenia,
      direccion: admin.direccion,
      dni: admin.dni,
      celular: admin.celular,
      mail: admin.mail
    },
    JWT_SECRET
  );

  // Genero el código HTTP & Un mensaje de respueta
  res.status(200);
  res.json({ access_token: token });
};

module.exports = {
  loginAdmin,
};
