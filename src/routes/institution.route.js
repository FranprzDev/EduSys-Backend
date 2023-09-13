const { Router } = require("express");
const { body } = require("express-validator");
const { expressValidations } = require("../middlewares/common.validations");
const { verifyJWT } = require("../middlewares/adminAuth.validations");
const { uniqueInstitution } = require("../middlewares/institution.validations");
const { createInstitution, getInstitution } = require("../controllers/institution.controller"); 

const instRouter = Router();

instRouter.post(
    "/create-inst",
    [
        body("nombreInst").notEmpty().isString().isLength({ min: 3, max: 40 }).withMessage("Debe enviar un nombre de la Institución válido."),
        body("mailInst").notEmpty().isString().isEmail().isLength({ min: 5, max: 40 }).withMessage("Debe enviar un mail de la institución válido."), 
        body("celularInst").notEmpty().isString().isLength({ min: 7, max: 8 }).withMessage("Debe enviar un número de celular (381) + ......."),
    ],
    verifyJWT,
    uniqueInstitution,
    expressValidations,
    createInstitution,
);

instRouter.get(
    "/get-inst",
    getInstitution,
)

module.exports = instRouter;
