const { Router } = require("express");
const {
  createAlumno,
  deleteAlumno,
  findAllAlumno,
  findAlumnoById,
  actualizarAlDia,
  actualizarAnioCursado,
  actualizarDatos,
} = require("../controllers/alumno.controller");
const { body, param } = require("express-validator");
const {
  expressValidations,
  dniExistValidation,
} = require("../middlewares/common.validations");
const { verifyJWT } = require("../middlewares/adminAuth.validations");

const alumnoRouter = Router();

/* --> Creación <-- */

alumnoRouter.post(
  "/crear",
  [
    body("nombre")
      .notEmpty()
      .isString()
      .isLength({ min: 3, max: 25 })
      .withMessage("Debe enviar un nombre válido."),
    body("apellido")
      .notEmpty()
      .isString()
      .isLength({ min: 3, max: 25 })
      .withMessage("Debe enviar un apellido válido."),
    body("dni")
      .notEmpty()
      .isString()
      .isLength({ min: 7, max: 8 })
      .withMessage("Debe enviar un dni válido."),
    body("alDia")
      .notEmpty()
      .isBoolean()
      .withMessage("Debe enviar si esta ala día."),
    body("anioCursado")
      .notEmpty()
      .isNumeric()
      .isLength({ min: 1, max: 1 })
      .withMessage("Debe enviar el año de cursado."),
    // Faltaria un custom para verificar si el mail es único (lo hace el models pero se puede hacer aquí con .custom)
  ],
  verifyJWT,
  dniExistValidation,
  expressValidations,
  createAlumno
);

/* --> Borrado <-- */

// Operación de Borrado  por ID
alumnoRouter.delete(
  "/delete-by-id/:id",
  [param("id").isMongoId().withMessage("Debe mandar un ID valido")],
  verifyJWT,
  expressValidations,
  deleteAlumno
);

/* --> Busqueda <-- */

// Operación de Busqueda Total
alumnoRouter.get("/findall", findAllAlumno);

// Operación de Busqueda por ID
alumnoRouter.get(
  "/find-by-id/:id",
  [param("id").isMongoId().withMessage("Debe mandar un ID valido")],
  verifyJWT,
  expressValidations,
  findAlumnoById
);

/* --> Actualización <-- */
alumnoRouter.put(
  "/update-alDia-by-id/:id",
  [
    param("id").isMongoId().withMessage("Debe enviar el ID del alumno."),
    body("alDia")
      .notEmpty()
      .isBoolean()
      .withMessage("Debe enviar si esta ala día."),
  ],
  verifyJWT,
  expressValidations,
  actualizarAlDia
);

alumnoRouter.put(
  "/update-anioCursado-by-id/:id",
  [param("id").isMongoId().withMessage("Debe enviar el ID del alumno.")],
  verifyJWT,
  expressValidations,
  actualizarAnioCursado
);

alumnoRouter.put(
  "/update-datos-by-id/:id",
  [
    param("id").isMongoId().withMessage("Debe enviar el ID del alumno."),
    body("nombre")
      .notEmpty()
      .isString()
      .isLength({ min: 3, max: 25 })
      .withMessage("Debe enviar un nombre válido."),
    body("apellido")
      .notEmpty()
      .isString()
      .isLength({ min: 3, max: 25 })
      .withMessage("Debe enviar un apellido válido."),
  ],
  verifyJWT,
  expressValidations,
  actualizarDatos,
);
  
module.exports = alumnoRouter;
