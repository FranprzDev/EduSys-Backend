const mongoose = require("mongoose")

const adminSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
        unique: false,
        minLength: 3,
        maxLength: 25
    },
    apellido: {
        type: String,
        required: true,
        trim: true,
        unique: false,
        minLength: 3,
        maxLength: 25
    },
    contrasenia: {
        type: String,
        required: true,
        trim: true,
        unique: false,
        minLength: 8,
    },
    direccion: {
        type: String,
        required: true,
        trim: true,
        unique: false,
        minLength: 6,
        maxLength: 70
    },
    dni: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minLength: 7,
        maxLength: 8
    },
    celular: {
        type: String,
        required: true,
        trim: true,
        unique: false,
        minLength: 7,
        maxLength: 8
    },
    mail: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate: {
            validator: function(value) {
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              return emailRegex.test(value);
            },
            message: props => `${props.value} no es un correo electrónico válido.`,
        },
    }
})

const Admin = mongoose.model("Admin", adminSchema)

module.exports = Admin;
