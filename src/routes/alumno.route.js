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
  ],
  verifyJWT,
  dniExistValidation,
  expressValidations,
  createAlumno
);

alumnoRouter.delete(
  "/delete-by-id/:id",
  [param("id").isMongoId().withMessage("Debe mandar un ID valido")],
  verifyJWT,
  expressValidations,
  deleteAlumno
);

alumnoRouter.get("/findall", verifyJWT, expressValidations, findAllAlumno);

alumnoRouter.get(
  "/find-by-id/:id",
  [param("id").isMongoId().withMessage("Debe mandar un ID valido")],
  verifyJWT,
  expressValidations,
  findAlumnoById
);

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
