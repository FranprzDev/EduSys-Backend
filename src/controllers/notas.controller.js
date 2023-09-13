const Alumno = require("../models/alumno.model");
const Materias = require("../models/materias.model");
const Notas = require("../models/notas.model");

const editarNota = async (req, res) => {
  try {
    const { idAlumno, idMateria, anio, nota } = req.body;

    const alumno = await Alumno.findById(idAlumno);
    const materia = await Materias.findById(idMateria);

    if (!alumno || !materia) {
      return res.status(404).json({ message: "Alumno o Materia no encontrados" });
    }

    const notaEncontrada = await Notas.findOneAndUpdate(
      {
        alumno: idAlumno,
        materia: idMateria,
        anio,
      },
      {
        nota,
      }
    );

    if (!notaEncontrada) {
      return res.status(404).json({ message: "Nota no encontrada" });
    }

    res.status(200);
    res.json({ message: "Se edito correctamente la nota" });
  } catch (error) {
    res.status(500).json({ message: "Error al editar la nota" });
  }
}

const eliminarNota = async (req, res) => {
  const { idAlumno, idMateria, anio } = req.body;

  try {
    const alumno = await Alumno.findById(idAlumno);
    const materia = await Materias.findById(idMateria);

    if (!alumno || !materia) {
      return res.status(404).json({ message: "Alumno o Materia no encontrados" });
    }

    const nota = await Notas.findOneAndDelete({
      alumno: idAlumno,
      materia: idMateria,
      anio,
    });

    if (!nota) {
      return res.status(404).json({ message: "Nota no encontrada" });
    }

    res.status(200);
    res.json({ message: "Se elimino correctamente la nota" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la nota" });
  }
}

const promedioCursoAnio = async (req, res) => {

  const idAlumno = req.params.idAlumno;
  const anio = req.params.anio

  try {
    const notas = await Notas.find({ alumno: idAlumno, anio: anio });

    if(notas.length === 0) {
      return res.status(404).json({ message: "No hay notas para el año indicado" });
    }

    const promedio = notas.reduce((acc, nota) => {
      return acc + nota.nota;
    }, 0) / notas.length;

    res.status(200);
    res.json({ promedio });
  } catch (error) {
    res.status(500).json({ message: "Error al calcular el promedio" });
  }
}

const encontrarTodasLasNotas = async (req, res) => {
  const idAlumno = req.params.idAlumno;

  try {
    const notas = await Notas.find({ alumno: idAlumno });
    
    const notasFiltradas = notas.map(nota => {
      return {
        materia: nota.nombreMateria,
        nota: nota.nota,
        anio: nota.anio,
        idMateria: nota.materia,
        idNota: nota._id,
      }
    }
    )

    res.status(200);
    res.json({ notasFiltradas });
  } catch (error) {
    res.status(500).json({ message: "Error al encontrar las notas" });
}
}

module.exports = {
    eliminarNota,
    promedioCursoAnio,
    editarNota,
    encontrarTodasLasNotas,
}