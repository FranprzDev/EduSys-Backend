const { Router } = require("express");
const {
  createAdmin,
  deleteAdmin,
  findAllAdmin,
  findAdminById,
  updateAdminByID_mail,
  updateAdminByID_celular,
  updateAdminByID_direccion,
} = require("../controllers/admin.controller")
const { body, param } = require("express-validator");
const { expressValidations } = require("../middlewares/common.validations");

const adminRouter = Router();
// Operaciones para el CRUD de ADministradores (Only - Super Administrador)

/* --> Creación <-- */

// Operación de Creación
adminRouter.post("/create",
  [
    body("nombre").notEmpty().isString().isLength({ min: 3, max: 25} ).withMessage("Debe enviar un nombre."),
    body("apellido").notEmpty().isString().isLength({ min: 3, max: 25} ).withMessage("Debe enviar un apellido."),
    body("dni").notEmpty().isString().isLength({ min: 7, max: 8} ).withMessage("Debe enviar un dni."),
    body("direccion").notEmpty().isString().isLength({ min: 6, max: 70} ).withMessage("Debe enviar un domicilio."),
    body("celular").notEmpty().isString().isLength({ min: 7, max: 8} ).withMessage("Debe enviar un número de celular (381) + ......."),
    body("mail").notEmpty().isString().isEmail().withMessage("Debe enviar un mail."),
    // Faltaria un custom para verificar si el mail es único (lo hace el models pero se puede hacer aquí con .custom)
  ], 
  expressValidations, 
  createAdmin
);

/* --> Borrado <-- */

// Operación de Borrado  por ID
adminRouter.delete("/delete-by-id/:id", 
  [
    param("id").isMongoId().withMessage("Debe mandar un ID valido"),
  ], 
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
  expressValidations,
  findAdminById
);

/* --> Actualización <-- */

// Operación de Actualización Mail por ID
adminRouter.put("/update-mail-by-id/:id", 
  [
    param("id").isMongoId().withMessage("Debe mandar un ID valido"),
    body("mail").notEmpty().isString().isEmail().withMessage("Debe mandar un mail valido"),
  ],
  expressValidations,
  updateAdminByID_mail
);

// Operación de Actualización Celular por ID
adminRouter.put("/update-phone-by-id/:id", 
  [
    param("id").isMongoId().withMessage("Debe mandar un ID valido"),
    body("celular").notEmpty().isString().isLength({ min: 7, max: 8} ).withMessage("Debe mandar un celular valido"),
  ],
  expressValidations,
  updateAdminByID_celular
);

// Operación de Actualización Dirección por ID
  adminRouter.put("/update-direction-by-id/:id", 
  [
    param("id").isMongoId().withMessage("Debe mandar un ID valido"),
    body("direccion").notEmpty().isString().isLength({ min: 6, max: 70} ).withMessage("Debe mandar un domicilio valido [6-70 Caracteres]"),
  ],
  expressValidations,
  updateAdminByID_direccion
);

module.exports = adminRouter;
