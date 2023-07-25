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

module.exports = {
    emailValidation,
    dniValidation,
}