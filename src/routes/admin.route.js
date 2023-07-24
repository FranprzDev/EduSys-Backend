const { Router } = require("express");
const Admin = require("../models/admin.model");
const {
  createAdmin,
  deleteAdmin,
  findAllAdmin,
  findAdminById,
  updateAdminByID_mail,
  updateAdminByID_celular,
  updateAdminByID_direccion,
} = require("../controllers/admin.controller")


const adminRouter = Router();
// Operaciones para el CRUD de ADministradores (Only - Super Administrador)

/* --> Creación <-- */

// Operación de Creación
adminRouter.post("/create", createAdmin);

/* --> Borrado <-- */

// Operación de Borrado  por ID
adminRouter.delete("/delete-by-id/:id", deleteAdmin);


/* --> Busqueda <-- */

// Operación de Busqueda Total
adminRouter.get("/findall", findAllAdmin);

// Operación de Busqueda por ID
adminRouter.get("/find-by-id/:id", findAdminById);

/* --> Actualización <-- */

// Operación de Actualización Mail por ID
adminRouter.put("/update-mail-by-id/:id", updateAdminByID_mail);

// Operación de Actualización Celular por ID
adminRouter.put("/update-phone-by-id/:id", updateAdminByID_celular);

// Operación de Actualización Dirección por ID
adminRouter.put("/update-direction-by-id/:id", updateAdminByID_direccion);

module.exports = adminRouter;
