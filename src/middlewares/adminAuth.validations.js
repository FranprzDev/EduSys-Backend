const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../common/constants");

const verifyJWT = (req, res, next) => {
    if (!req.headers.authorization) return res.status(401).json({ message: 'No autorizado, no eres SuperADMIN' });

    const token = req.headers.authorization.split(" ")[1]

    // Verificacion
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido.' });
        }

        // El token es válido, guardamos los datos del usuario en el objeto 'req'
        next()
    });
}

module.exports = {
    verifyJWT
}