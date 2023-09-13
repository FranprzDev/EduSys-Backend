const { Router } = require("express");
const adminAuthRouter = Router();
const { body } = require("express-validator");
const { loginAdmin } = require("../controllers/adminAuth.controllers");

adminAuthRouter.post("/login",
  [
    body("mail").notEmpty().isString().isEmail().withMessage("Debe enviar un mail."), 
    body("contrasenia").notEmpty().isLength({ min: 8 }).withMessage("Debe enviar una contraseña válida."),
  ],
  loginAdmin
);

module.exports = adminAuthRouter;
