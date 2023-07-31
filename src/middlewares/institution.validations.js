const Institution = require("../models/institution.model");

const uniqueInstitution = async (req, res, next) => {
  try {
    const existingInstitution = await Institution.findOne({});
    if (existingInstitution) {
      res.status(400).json({ message: "Ya existe una institución creada." });
    } else {
      next();
    }
  } catch (error) {
    console.error("Error al verificar la unicidad de la institución:", error);
    res.status(500).json({ error: "Ha ocurrido un error al verificar la unicidad de la institución." });
  }
};

module.exports = {
  uniqueInstitution,
};
