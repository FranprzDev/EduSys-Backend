const { Router } = require("express");
const Admin = require("../models/admin.model");

const adminRouter = Router();
// Operaciones para el CRUD de ADministradores (Only - Super Administrador)

// Operación de Creación
adminRouter.post("/create", async (req, res) => {
  // Realizo la destructuración de la req
  const {
    nombre,
    apellido,
    direccion,
    dni,
    celular,
    mail
  } = req.body

  // Genero mediante el modelo el Administrador

  const adminGenerado = new Admin({
    nombre: nombre,
    apellido: apellido,
    direccion: direccion,
    dni: dni,
    celular: celular,
    mail: mail
  })

  // Espero que se guarde
  await adminGenerado.save()

  // Genero el código HTTP & Un mensaje de respueta
  res.status(201).json({ message: `Se creo el Administrador ${nombre} ${apellido}` });
});


// Operación de Borrado físico por ID
adminRouter.delete("/delete-by-id/:id", async (req, res) => {
  const adminGenerado = await Admin.findById(req.params.id);

  if (adminGenerado === null) {
    res.status(404)
    return res.json({ message: "Administrador no encontrado" })
  }

  const filters = { _id: req.params.id }
  await adminGenerado.deleteOne(filters)

  res.status(204)
  res.json({ message: `El Administrador ${adminGenerado.nombre} ${adminGenerado.apellido} fue eliminado de la DB.`});
});


// --> Busqueda <--

// Operación de Busqueda Total
adminRouter.get("/findall", async (req, res) => {
  const adminGenerado = await Admin.find()
  if(adminGenerado != null){
    res.status(200)
    res.json(adminGenerado)
  }else{
    res.status(404)
    res.json({ message: "No se pudo encontrar la tabla de Administradores." })
  }

});

// Operación de Busqueda por ID
adminRouter.get("/find-by-id/:id", async (req, res) => {
  const adminGenerado = await Admin.findById(req.params.id);

  if (adminGenerado === null) {
    res.status(404)
    return res.json({ message: "Administrador no encontrado" })
  }

  res.json({ message: "Se encontró el administrador", datos: adminGenerado });
});


// --> Actualización <-- 

// Operación de Actualización Mail por ID
adminRouter.put("/update-mail-by-id/:id", async (req, res) => { 
    const adminGenerado = await Admin.findById(req.params.id);
    if (adminGenerado === null) {
      res.status(404);
      return res.json({ message: "Administrador no encontrado" });
    }

    // Lógica para la actualización por ID -> Mail
    await Admin.findByIdAndUpdate(req.params.id, {
      mail: req.body.mail,
    });

    res.status(200);
    res.json({
      message: `Se encontro el administrador ${adminGenerado.nombre} ${adminGenerado.apellido} y se actualizaron sus datos [Mail]`,
      datos: adminGenerado,
    });
    // Preguntar por que los datos que llegan al postman aún no están actualizados [como que van 1 atras]
});

// Operación de Actualización Celular por ID
adminRouter.put("/update-phone-by-id/:id", async (req, res) => { 
  const adminGenerado = await Admin.findById(req.params.id);
  if (adminGenerado === null) {
    res.status(404);
    return res.json({ message: "Administrador no encontrado" });
  }

  // Lógica para la actualización por ID -> Celular
  await Admin.findByIdAndUpdate(req.params.id, {
    celular: req.body.celular
  });

  res.status(200);
  res.json({
    message: `Se encontro el administrador ${adminGenerado.nombre} ${adminGenerado.apellido} y se actualizaron sus datos [Mail]`,
    datos: adminGenerado,
  });
});

// Operación de Actualización Dirección por ID
adminRouter.put("/update-direction-by-id/:id", async (req, res) => { 
  const adminGenerado = await Admin.findById(req.params.id);
  if (adminGenerado === null) {
    res.status(404);
    return res.json({ message: "Administrador no encontrado" });
  }

  // Lógica para la actualización por ID -> Dirección
  await Admin.findByIdAndUpdate(req.params.id, {
    direccion: req.body.direccion
  });

  res.status(200);
  res.json({
    message: `Se encontro el administrador ${adminGenerado.nombre} ${adminGenerado.apellido} y se actualizaron sus datos [Mail]`,
    datos: adminGenerado,
  });
});

module.exports = adminRouter;
