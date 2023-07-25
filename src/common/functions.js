const bcrypt = require("bcryptjs");
const Admin = require("../models/admin.model");

/* --> Creación del SuperAdministrador <-- */ 

function encriptarContrasenia(contrasenia) {
    const salt = bcrypt.genSaltSync(5);
    return hashedContra = bcrypt.hashSync(contrasenia, salt);
}

function generarSuperAdmin(){
    const superAdmin = new Admin({
        nombre: "admin",
        apellido: "admin",
        contrasenia: hashedContra,
        direccion: "admin house",
        dni: "40000000",
        celular: "admin12",
        mail: "admin@gmail.com",
    });

    return superAdmin
}

function crearSuperAdmin(){
    encriptarContrasenia("Adm1n@RC");
    generarSuperAdmin().save();
}

/* --> Fin de la Creación del SuperAdministrador <-- */ 

module.exports = {
    crearSuperAdmin,
    encriptarContrasenia,
}