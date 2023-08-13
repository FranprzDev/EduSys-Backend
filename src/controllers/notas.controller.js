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
  const { idAlumno, anio } = req.body;

  try {
    const notas = await Notas.find({ alumno: idAlumno, anio: anio });
    // Esto es un array con las notas que encontró

    if(notas.length === 0) {
      return res.status(404).json({ message: "No hay notas para el año indicado" });
    }

    // Calculo el promedio mediante reduce y lo devuelvo en el response,
    // reduce es una función de los arrays que permite hacer operaciones
    // con cada elemento del array y devolver un valor único, en este caso
    // el promedio de las notas.
    // La mostró José en el taller de JS de enero.
    const promedio = notas.reduce((acc, nota) => {
      return acc + nota.nota;
    }, 0) / notas.length;

    res.status(200);
    res.json({ promedio });
  } catch (error) {
    res.status(500).json({ message: "Error al calcular el promedio" });
  }
}

const promedioCursada = async (req, res) => {
  const { idAlumno } = req.body; 

  const alumno = await Alumno.findById(idAlumno);

  if(!alumno) {
    return res.status(404).json({ message: "Alumno no encontrado" });
  }

  try {
    const notas = await Notas.find({ alumno: idAlumno });
    // Esto es un array con las notas que encontró de todas las materias disponibles

    if(!notas) {
      return res.status(404).json({ message: "No hay notas para el alumno indicado" });
    }

    // Calculo el promedio mediante reduce y lo devuelvo en el response,
    // reduce es una función de los arrays que permite hacer operaciones
    // con cada elemento del array y devolver un valor único, en este caso
    // el promedio de las notas.
    // La mostró José en el taller de JS de enero.

    // Este reduce calcula el promedio DE TODO el curso.

    const promedio = notas.reduce((acc, nota) => {
      return acc + nota.nota;
    }, 0) / notas.length;

    res.status(200);
    res.json({ promedio });
  } catch (error) {
    res.status(500).json({ message: "Error al calcular el promedio" });
  }
}

const encontrarNotas = async (req, res) => {
  const idAlumno = req.params.idAlumno;
  const anio = req.params.anio;

  try {
    const notas = await Notas.find({ alumno: idAlumno, anio: anio });
    // Esto es un array con las notas que encontró

    if(notas.length === 0) {
      return res.status(404).json({ message: "No hay notas para el año indicado" });
    }

    // Utilizo un map para quedarme solo con los datos que me interesan.
    
    const notasFiltradas = notas.map(nota => {
      return {
        materia: nota.nombreMateria,
        nota: nota.nota,
        anio: nota.anio,
        idMateria: nota.materia,
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
    promedioCursada,
    encontrarNotas,
    editarNota,
}