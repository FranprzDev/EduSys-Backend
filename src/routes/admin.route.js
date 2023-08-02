const { Router } = require("express");
const {
  createAdmin,
  deleteAdmin,
  findAllAdmin,
  findAdminById,
  updateCommonAdminByID,
  updateCampID,
  actualizarPasswordByID,
} = require("../controllers/admin.controller")
const { body, param } = require("express-validator");
const { expressValidations } = require("../middlewares/common.validations");
const { emailValidation, dniValidation, validarContrasenia } = require("../middlewares/admin.validations");
// const { verifyToken } = require("../controllers/adminAuth.controllers");
const { verifyJWT } = require("../middlewares/adminAuth.validations");

const adminRouter = Router();

/* Todas las rutas deben estar verificadas con JWT por que SÓLAMENTE el superAdmin debe acceder al CRUD de Administradores */

/* --> Creación <-- */

adminRouter.post("/create",
  [
    body("apellido").notEmpty().isString().isLength({ min: 3, max: 25} ).withMessage("Debe enviar un apellido válido."),
    body("dni").notEmpty().isString().isLength({ min: 7, max: 8} ).withMessage("Debe enviar un dni válido."),
    body("direccion").notEmpty().isString().isLength({ min: 6, max: 70} ).withMessage("Debe enviar un domicilio válido."),
    body("celular").notEmpty().isString().isLength({ min: 7, max: 8} ).withMessage("Debe enviar un número de celular (381) + ......."),
    body("mail").notEmpty().isString().isEmail().withMessage("Debe enviar un mail."), 
    body("contrasenia").notEmpty().isLength({ min: 8 }).withMessage("Debe enviar una contraseña válida."),
    // Faltaria un custom para verificar si el mail es único (lo hace el models pero se puede hacer aquí con .custom)
  ],
  verifyJWT,
  expressValidations, 
  emailValidation,
  dniValidation,
  createAdmin
);

/* --> Borrado <-- */

// Operación de Borrado  por ID
adminRouter.delete("/delete-by-id/:id", 
  [
    param("id").isMongoId().withMessage("Debe mandar un ID valido"),
  ], 
  verifyJWT,
  expressValidations,
  deleteAdmin
);


/* --> Busqueda <-- */

// Operación de Busqueda Total
adminRouter.get("/findall", findAllAdmin);

// Operación de Busqueda por ID
adminRouter.get("/find-by-id/:id", 
  [
    param("id").isMongoId().withMessage("Debe mandar un ID valido"),
  ], 
  verifyJWT,
  expressValidations,
  findAdminById
);

// Actualizar Celular, Direccion & Mail para un Administrador Normal
adminRouter.put("/update-common-by-id/:id", 
  [
    param("id").isMongoId().withMessage("Debe mandar un ID valido"),
    body("celular").notEmpty().isString().isLength({ min: 7, max: 8} ).withMessage("Debe mandar un celular valido"),
    body("direccion").notEmpty().isString().isLength({ min: 6, max: 70} ).withMessage("Debe mandar un domicilio valido [6-70 Caracteres]"),
    body("mail").notEmpty().isString().isEmail().withMessage("Debe mandar un mail valido"),
  ],
  verifyJWT,
  emailValidation,
  expressValidations,
  updateCommonAdminByID
);


adminRouter.put("/update-password/:id", 
  [
    param("id").isMongoId().withMessage("Debe mandar un ID valido"),
    body("pass").notEmpty().isLength({ min: 8 }).withMessage("Debe enviar una contraseña válida."),
    body("retryPass").notEmpty().isLength({ min: 8 }).withMessage("Debe enviar una contraseña válida."),
  ],
  verifyJWT,
  validarContrasenia,
  expressValidations,
  actualizarPasswordByID,
);

// Actualizar Nombre, Apellido y DNI solamente para super adminsitradores.
adminRouter.put("/update-camp-by-id/:id", 
  [
    param("id").isMongoId().withMessage("Debe mandar un ID valido"),
    body("nombre").notEmpty().isString().isLength({ min: 3, max: 40} ).withMessage("Debe mandar un nombre válido [3-40 Caracteres]"),
    body("apellido").notEmpty().isString().isLength({ min: 3, max: 40} ).withMessage("Debe mandar un apellido válido [3-40 Caracteres]"),
    body("dni").notEmpty().isNumeric().isLength({ min: 7, max: 8} ).withMessage("Debe mandar un dni válido [7-8 Caracteres]"),
  ],
  verifyJWT,
  expressValidations,
  updateCampID
);

module.exports = adminRouter;
