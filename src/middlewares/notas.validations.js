const Alumno = require("../models/alumno.model");

const anioCoincidente = async (req, res, next) => {
    const { idAlumno, anio } = req.body;

    const alumno = await Alumno.findById(idAlumno);

    if(!alumno) {
        return res.status(404).json({ message: "Alumno no encontrado" });
    } 

    if (alumno.anioCursado !== anio) {
        return res.status(409).json({ message: "El año de cursada no coincide con el año de la nota" });
    }

    next();
}

module.exports = {
    anioCoincidente,
}