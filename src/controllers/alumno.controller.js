
const Alumno = require("../models/alumno.model");

/* -> Creación en DB Alumno <- */

const createAlumno = async (req, res) => {
  // Realizo la destructuración de la req
  const { nombre, apellido, alDia, anioCursado} =
    req.body;

  // Genero mediante el modelo el Administrador
  const alumno = new Alumno({
    nombre: nombre,
    apellido: apellido,
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

  const filters = { _id: req.params.id };
  await alumno.deleteOne(filters);

  res.status(200);
  res.json({ message: "Se elimino el alumno de la DB." });
};

/* -> Busqueda en DB Alumno <- */
const findAllAlumno = async (req, res) => {
  const alumno = await alumno.find();
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

/* ->Al día ...
  const estaAlDia = async (req, res) => {
    const { pagosRealizados, cuotasMensuales } = req.body;
  
    try {
      if (pagosRealizados.length === cuotasMensuales.length) {
        for (let i = 0; i < pagosRealizados.length; i++) {
          if (pagosRealizados[i] !== cuotasMensuales[i]) {
            return false;
          }
        }
        return true;
      } else {
        return false;
      }
    } catch (error) {
      
      res.status(404);
      res.json({ message: "Error al verificar si está al día", error: error.message });
      return false; 
    } 
  }; <- */
/* ->cursado ...
  const findAnioCursado = async (req, res) => {
    const { alumnoId } = req.params;
  
    try {
      const alumno = await Alumno.findById(alumnoId);
  
      if (!alumno) {
        res.status(404).json({ message: "Alumno no encontrado" });
      } else {
        
        const anioCursado = alumno.anioCursado;
        res.status(200).json({ anioCursado });
      }
    } catch (error) {
      res.status(500).json({ message: "Error al buscar el año de cursado", error: error.message });
    }
  };<- */

  const actualizarAlDia = async (req, res) => {
    const {alDia } = req.body;
    const alumno = await Alumno.findById (req.params.id)
    if (alumno === null ) {
      res.status(404)
      return res.json({ message: "Alumno no encontrado" });
    }
    await Alumno.findByIdAndUpdate(req.params.id, {
      alDia: !alDia,
    });
  
    res.status(200)
    res.json({
      message: "Se encontró el Alumno y se cambio su estado."
    })

  }
  

module.exports = {
 createAlumno,
  deleteAlumno,
  findAllAlumno,
  findAlumnoById,
  findAnioCursado,
  actualizarAlDia,
  
 
};
