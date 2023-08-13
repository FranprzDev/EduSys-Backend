const express = require("express");
const { body, param } = require("express-validator");
const {  
  editarNota,
  eliminarNota, 
  promedioCursoAnio, 
  promedioCursada,
  encontrarNotas, } = require("../controllers/notas.controller");
const {
  esNotaValida,
  esAnioValido,
  expressValidations,
} = require("../middlewares/common.validations");
const { anioCoincidente } = require("../middlewares/notas.validations") 

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
  expressValidations,
  eliminarNota
);


// Obtengo el promedio por año
notasRouter.get(
  "/calcular-promedio-anio",
  [
    body("idAlumno")
      .notEmpty()
      .isMongoId()
      .withMessage("Debe enviar un id de alumno válido."),
    body("anio")
      .notEmpty()
      .isNumeric()
      .withMessage("Debe enviar un año válido."),
  ],
  esAnioValido,
  expressValidations,
  promedioCursoAnio
);

notasRouter.get("/calcular-promedio",  
  [
    body("idAlumno").notEmpty().isMongoId().withMessage("Debe enviar un id de alumno válido."), 
  ],
  expressValidations,
  promedioCursada
)

notasRouter.get("/alumno/:idAlumno/:anio", 
  [
    param("idAlumno").notEmpty().isMongoId().withMessage("Debe enviar un id de alumno válido."),
    param("anio").notEmpty().isNumeric().withMessage("Debe enviar un año válido."),
  ],
  esAnioValido,
  expressValidations,
  encontrarNotas
)

module.exports = notasRouter;
