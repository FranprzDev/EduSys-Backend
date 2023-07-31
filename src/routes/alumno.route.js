const { Router } = require("express");
const {
  createAlumno,
  deleteAlumno,
  findAllAlumno,
  findAlumnoById,
  actualizarAlDia,
  findAnioCursado,


} = require("../controllers/alumno.controller")
const { body, param } = require("express-validator");
const { expressValidations } = require("../middlewares/common.validations");
// const { verifyToken } = require("../controllers/adminAuth.controllers");
//const { verifyJWT } = require("../middlewares/adminAuth.validations");
const { deleteAlumno, findAllAlumno } = require("../controllers/alumno.controller");

const alumnoRouter = Router();

/* Todas las rutas deben estar verificadas con JWT por que SÓLAMENTE el superAdmin debe acceder al CRUD de Administradores */

/* --> Creación <-- */

alumnoRouter.post("/create",
  [
    body("nombre").notEmpty().isString().isLength({ min: 3, max: 25} ).withMessage("Debe enviar un nombre válido."),
    body("apellido").notEmpty().isString().isLength({ min: 3, max: 25} ).withMessage("Debe enviar un apellido válido."),
    body("dni").notEmpty().isString().isLength({ min: 7, max: 8} ).withMessage("Debe enviar un dni válido."),
    body("alDia").notEmpty().isBoolean().withMessage("Debe enviar si esta ala día."),
    body("anioCursado").notEmpty().isNumeric().isLength({ min: 1, max: 1} ).withMessage("Debe enviar el año de cursado."),
    // Faltaria un custom para verificar si el mail es único (lo hace el models pero se puede hacer aquí con .custom)
  ],
  verifyJWT,
  expressValidations, 
  dniValidation,
  createAlumno,
);

/* --> Borrado <-- */

// Operación de Borrado  por ID
alumnoRouter.delete("/delete-by-id/:id", 
  [
    param("id").isMongoId().withMessage("Debe mandar un ID valido"),
  ], 
  verifyJWT,
  expressValidations,
  deleteAlumno
);


/* --> Busqueda <-- */

// Operación de Busqueda Total
alumnoRouter.get("/findall", findAllAlumno);

// Operación de Busqueda por ID
alumnoRouter.get("/find-by-id/:id", 
  [
    param("id").isMongoId().withMessage("Debe mandar un ID valido"),
  ], 
  verifyJWT,
  expressValidations,
  findAlumnoById,
);

/* --> Actualización <-- */
alumnoRouter.put("/update-alDia-by-id/:id"),
[
    param("id").isMongoId().withMessage("Debe enviar si esta al día"),
    body("alDia").notEmpty().isBoolean().withMessage("Debe enviar si esta ala día."),
],

alumnoRouter.put("/update-anioCursao-by-id/:id"),
[
    param("id").isMongoId().withMessage("Debe enviar el año cursado"),
    body("anioCursado").notEmpty().isNumeric().isLength({ min: 1, max: 1} ).withMessage("Debe enviar el año de cursado."),

]



verifyJWT,
expressValidations,

);






module.exports = alumnoRouter;
