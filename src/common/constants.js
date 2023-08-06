require("dotenv").config()

const JWT_SECRET = process.env.JWT_SECRET;

const arrayMaterias = [
    'Matemáticas',
    'Lengua y Literatura',
    'Biología',
    'Física',
    'Química',
    'Economía',
    'Geografía',
    'Historia',
    'Educación Física'
  ];

module.exports = {
    JWT_SECRET,
    arrayMaterias,
}