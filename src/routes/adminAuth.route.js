// Operaciones para el CRUD de Administradores (Only - Super Administrador)
const { Router } = require("express");
const adminAuthRouter = Router();
const { expressValidations } = require("../middlewares/common.validations");
const { body } = require("express-validator");
const { loginAdmin } = require("../controllers/adminAuth.controllers");

/* --> Operación de Login <-- */

adminAuthRouter.post("/login",
  [
    body("mail").notEmpty().isString().isEmail().withMessage("Debe enviar un mail."), 
    body("contrasenia").notEmpty().isLength({ min: 8 }).withMessage("Debe enviar una contraseña válida."),
  ],
  loginAdmin
);

module.exports = adminAuthRouter;
