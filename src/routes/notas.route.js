const express = require("express");
const { body, param } = require("express-validator");
const {  
  editarNota,
  eliminarNota, 
  promedioCursoAnio, 
  encontrarTodasLasNotas,
 } = require("../controllers/notas.controller");
const {
  esNotaValida,
  esAnioValido,
  expressValidations,
} = require("../middlewares/common.validations");
const { anioCoincidente } = require("../middlewares/notas.validations"); 
const { verifyJWT } = require("../middlewares/adminAuth.validations");

const notasRouter = express.Router();

notasRouter.post(
  "/editar-nota",
  [
    body("idAlumno")
      .notEmpty()
      .isMongoId()
      .withMessage("Debe enviar un id de alumno válido."),
    body("idMateria")
      .notEmpty()
      .isMongoId()
      .withMessage("Debe enviar un id de materia válido."),
    body("anio")
      .notEmpty()
      .isNumeric()
      .withMessage("Debe enviar un año válido."),
    body("nota")
      .notEmpty()
      .isNumeric()
      .isLength({ min: 1, max: 2 })
      .withMessage("Debe enviar una nota válida."),
  ],
  esAnioValido,
  anioCoincidente,
  esNotaValida,
  verifyJWT,
  expressValidations,
  editarNota,
);

notasRouter.delete(
  "/eliminar-nota",
  [
    body("idAlumno")
      .notEmpty()
      .isMongoId()
      .withMessage("Debe enviar un id de alumno válido."),
    body("idMateria")
      .notEmpty()
      .isMongoId()
      .withMessage("Debe enviar un id de materia válido."),
    body("anio")
      .notEmpty()
      .isNumeric()
      .withMessage("Debe enviar un año válido."),
  ],
  esAnioValido,
  verifyJWT,
  expressValidations,
  eliminarNota
);

notasRouter.get(
  "/calcular-promedio-anio/:anio/:idAlumno",
  [
    param("anio").notEmpty().isNumeric().withMessage("Debe enviar un año válido."),
    param("idAlumno").notEmpty().isMongoId().withMessage("Debe enviar un id de alumno válido."),
  ],
  esAnioValido,
  verifyJWT,
  expressValidations,
  promedioCursoAnio
);

notasRouter.get("/alumno/:idAlumno",
  [
    param("idAlumno").notEmpty().isMongoId().withMessage("Debe enviar un id de alumno válido."),
  ],
  verifyJWT,
  expressValidations,
  encontrarTodasLasNotas
)

module.exports = notasRouter;
