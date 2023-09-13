const Alumno = require("../models/alumno.model");
const Materias = require("../models/materias.model");
const Notas = require("../models/notas.model");

const createAlumno = async (req, res) => {
  const { nombre, apellido, dni, alDia, anioCursado } = req.body;

  const alumno = new Alumno({
    nombre: nombre,
    apellido: apellido,
    dni: dni,
    alDia: alDia,
    anioCursado: anioCursado,
  });

  await alumno.save();

  res.status(201);
  res.json({ message: `Se creo el Alumno ${nombre} ${apellido}` });
};


const deleteAlumno = async (req, res) => {
  const alumno = await Alumno.findById(req.params.id);

  if (alumno === null) {
    res.status(404);
    return res.json({ message: "Alumno no encontrado" });
  }

  const idAlumno = req.params.id;

  const filters = { idAlumno };
  await alumno.deleteOne(filters);

  const notas = await Notas.find({ alumno: idAlumno });

  if (notas.length > 0) {
    notas.map(async (nota) => {
      await Notas.findByIdAndDelete(nota._id);
    });
  }
  
  res.status(200);
  res.json({ message: "Se elimino el alumno de la DB." });
};

const findAllAlumno = async (req, res) => {
  const alumno = await Alumno.find();
  
  if (alumno === null) {
    res.status(404);
    return res.json({ message: "Alumnos no encontrados" });
  }

  res.status(200);
  res.json({ alumno });
};

const findAlumnoById = async (req, res) => {
  const alumno = await Alumno.findById(req.params.id);

  if (alumno === null) {
    res.status(404);
    return res.json({ message: "Alumno no encontrado" });
  }

  res.json({ message: "Se encontró el Alumno", datos: alumno });
};

const actualizarAlDia = async (req, res) => {
  const { alDia } = req.body;
  const alumno = await Alumno.findById(req.params.id);

  if (!alumno) {
    res.status(404);
    return res.json({ message: "Alumno no encontrado" });
  }

  await Alumno.findByIdAndUpdate(req.params.id, {
    alDia: alDia,
  });

  res.status(200);
  res.json({
    message: "Se encontró el Alumno y se cambio su estado.",
  });
};

const actualizarAnioCursado = async (req, res) => {
  const idAlumno = req.params.id
  const alumno = await Alumno.findById(idAlumno)

  const nuevoAnioCursado = alumno.anioCursado + 1

  if(!alumno) {
    res.status(404)
    return res.json({ message: "Alumno no encontrado" })
  }

  if(alumno.anioCursado === 4) {
    res.status(409)
    return res.json({ message: "El alumno ya esta en el último año." })
  }

  await Alumno.findByIdAndUpdate(idAlumno, {
    anioCursado: nuevoAnioCursado
  })

  const materias = await Materias.find(); 

  const notasPromises = [];
  materias.forEach(async (materia) => {
    const nota = new Notas({
      materia: materia._id,
      alumno: idAlumno,
      nombreMateria: materia.nombre,
      anio: nuevoAnioCursado,
      nota: 0,
    });
  
    await nota.save();
    notasPromises.push(nota);
  });
  
  await Promise.all(notasPromises);

  res.status(200)
  res.json({ message: "Se actualizo el año de cursado en (1)." })
}

const actualizarDatos = async (req, res) => {
  const { nombre, apellido } = req.body;
  const idAlumno = req.params.id

  const alumno = await Alumno.findById(idAlumno)

  if(!alumno){
    res.status(404)
    return res.json({ message: "Alumno no encontrado" })
  }

  await Alumno.findByIdAndUpdate(idAlumno, {
    nombre: nombre,
    apellido: apellido
  })

  res.status(200)
  res.json({ message: "Se actualizo el nombre y apellido del alumno." })
}

module.exports = {
  createAlumno,
  deleteAlumno,
  findAllAlumno,
  findAlumnoById,
  actualizarAlDia,
  actualizarAnioCursado,
  actualizarDatos,
};
