const Admin = require("../models/admin.model"); 

const emailValidation = async (req, res, next) => {
  const { mail } = req.body;
  const e = await Admin.findOne({ "mail": mail });

  if (e !== null) {
    res.status(400);
    return res.json({ message: "El email ya está ocupado" });
  }

  next()
}

const dniValidation = async (req, res, next) => {
  const { dni } = req.body;
  const c = await Admin.findOne({ "dni": dni });

  if (c !== null) {
    res.status(400);
    return res.json({ message: "El DNI ya está en uso" });
  }

  next()
}

const validarContrasenia = (req, res, next) => {
  const contrasenia = req.body.contrasenia; 

  // Expresiones regulares para validar los requisitos
  const tieneMayuscula = /[A-Z]/.test(contrasenia);
  const tieneNumero = /\d/.test(contrasenia);
  const tieneCaracterEspecial = /[!@#$%^&*()_+[\]{};':"\\|,.<>/?]/.test(contrasenia);
  const longitudValida = contrasenia.length >= 8;

  if (tieneMayuscula && tieneNumero && tieneCaracterEspecial && longitudValida) {
    next(); // Contraseña válida, pasamos al siguiente middleware o controlador
  } else {
    res.status(400).json({ mensaje: 'La contraseña no cumple con los requisitos necesarios.' });
  }
}

module.exports = {
    emailValidation,
    dniValidation,
    validarContrasenia,
}