const { Router } = require("express");
const Admin = require("../models/admin.model");

const adminRouter = Router();
// Operaciones para el CRUD de ADministradores (Only - Super Administrador)



// Operación de Creación
adminRouter.post("/create", async (req, res) => {
  // Lógica asociada aquí
});


// Operación de Borrado físico por ID
adminRouter.delete("/delete-by-id/:id", async (req, res) => {
  // Lógica asociada aquí
});


// --> Busqueda <--

// Operación de Busqueda Total
adminRouter.get("/findall", async (req, res) => {
  // Lógica asociada aquí
});

// Operación de Busqueda por ID
adminRouter.get("/find/by-id/:id", async (req, res) => {
  // Lógica asociada aquí
});


// --> Actualización <-- 

// Operación de Actualización Mail por ID
adminRouter.put("/update-mail-by-id/:id", async (req, res) => { 
    // Lógica asociada aquí
});

// Operación de Actualización Celular por ID
adminRouter.put("/update-phone-by-id/:id", async (req, res) => { 
    // Lógica asociada aquí
});

// Operación de Actualización Dirección por ID
adminRouter.put("/update-direction-by-id/:id", async (req, res) => { 
    // Lógica asociada aquí
});

module.exports = adminRouter;
