const mongoose = require("mongoose")

const institutionSchema = mongoose.Schema({
    nombreInst: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minLength: 3,
        maxLength: 25
    },
    celularInst: {
        type: String,
        required: true,
        trim: true,
        unique: false,
        minLength: 7,
        maxLength: 8
    },
    mailInst: {
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
});

const Institution = mongoose.model("Institution", institutionSchema)

module.exports = Institution;
