const Institution = require("../models/institution.model");

const createInstitution = async (req, res) => {
    const { nombreInst, celularInst, mailInst } = req.body;

    try {
        const institution = new Institution({
            nombreInst: nombreInst,
            celularInst: celularInst,
            mailInst: mailInst,
        });

        await institution.save();
        res.status(201).json({ message: "Institution creada exitosamente." });
    } catch (error) {
        console.error("Error al crear la institución:", error);
        res.status(500).json({ error: "Ha ocurrido un error al crear la institución." });
    }
};

module.exports = {
    createInstitution,
};