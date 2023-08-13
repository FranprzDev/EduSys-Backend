const Alumno = require("../models/alumno.model");
const Materias = require("../models/materias.model");
const Notas = require("../models/notas.model");

/* -> Creación en DB Alumno <- */

const createAlumno = async (req, res) => {
  // Realizo la destructuración de la req
  const { nombre, apellido, dni, alDia, anioCursado } = req.body;

  // Genero mediante el modelo el Administrador
  const alumno = new Alumno({
    nombre: nombre,
    apellido: apellido,
    dni: dni,
    alDia: alDia,
    anioCursado: anioCursado,
  });

  // Espero que se guarde
  await alumno.save();

  // Genero el código HTTP & Un mensaje de respueta
  res.status(201);
  res.json({ message: `Se creo el Alumno ${nombre} ${apellido}` });
};

/* -> Borrado en DB Alumno */

const deleteAlumno = async (req, res) => {
  const alumno = await Alumno.findById(req.params.id);

  if (alumno === null) {
    res.status(404);
    return res.json({ message: "Alumno no encontrado" });
  }

  const idAlumno = req.params.id;

  const filters = { idAlumno };
  await alumno.deleteOne(filters);

  // Como elimino el alumno, necesariamente DEBO eliminar todas las notas asociadas a él.

  const notas = await Notas.find({ alumno: idAlumno });

  if (notas.length > 0) {
    notas.map(async (nota) => {
      await Notas.findByIdAndDelete(nota._id);
    });
  }
  
  res.status(200);
  res.json({ message: "Se elimino el alumno de la DB." });
};

/* -> Busqueda en DB Alumno <- */
const findAllAlumno = async (req, res) => {
  const alumno = await Alumno.find();
  if (alumno.length == 0) {
    res.status(404);
    res.json({ message: "No se pudo encontrar la tabla de Alumnos." });
  }

  res.status(200);
  res.json({ alumno });
  // si aquí no hay nada en la DB tira un error.
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

  console.log(alumno);

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

  // Vamos a hacer la lógica para que se generen las notas para cada materia del alumno
  // de modo automático una vez que se añada un año.
  // Para eso vamos a tener que importar el modelo de Notas y Materias
  // y utilizar el método create() para generar las notas.

  const materias = await Materias.find()
  const notasPromises = materias.map(async (materia) => {
    const nota = new Notas({
      materia: materia._id,
      alumno: this._id,
      nombreMateria: materia.nombre,
      anio: this.anioCursado,
      nota: 0,
    });

    await nota.save();
  })


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
