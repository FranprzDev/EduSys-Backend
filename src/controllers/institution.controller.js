const Institution = require("../models/institution.model");

const createInstitution = async (req, res) => {
    const { nombreInst, celularInst, mailInst } = req.body;
    console.log("por crear")
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

const getInstitution = async (req, res) => {

    let institucion = await Institution.find();

    if(institucion.length === 0){
        institucion = [{
            nombreInst: '',
            mailInst: '',
            celularInst: ''
        }]
        res.status(200);
        return res.json({ institucion });
    }

    res.status(200);
    res.json({ institucion });
}

module.exports = {
    createInstitution,
    getInstitution,
};