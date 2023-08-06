const { validationResult } = require("express-validator");
const Alumno = require("../models/alumno.model");

const expressValidations = (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        res.status(400)
        return res.send({ errors: result.array() });
    }
    next()
}

const dniExistValidation = async (req, res, next) => {
    const { dni } = req.body;

    const alumno = await Alumno.findOne({ dni });

    if(alumno){
       res.status(400)
       res.send({ message: "El DNI ya existe" }) 
    }

    next()
}

const esAnioValido = (req, res, next) => {
    const { anio } = req.body;

    if (anio < 1 || anio > 4) {
        res.status(400)
        res.send({ message: "El año debe ser entre 1 y 4" }) 
        return;
    }

    next()
}

const esNotaValida = (req, res, next) => {
    const { nota } = req.body;

    if(nota < 0 || nota > 10){
        res.status(400)
        res.send({ message: "La nota debe ser entre 0 y 10" }) 
        return;
    }

    next()
} 


module.exports = {
    expressValidations,
    dniExistValidation,
    esNotaValida,
    esAnioValido, 
}