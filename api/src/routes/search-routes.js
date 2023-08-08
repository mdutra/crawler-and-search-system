const express = require("express");
const { param } = require("express-validator");
const SearchController = require("../controllers/search-controller");
const { checkValidation } = require("../middlewares/custom-middlewares");

const router = express.Router();

const validations = [
  param('cpf').notEmpty().withMessage('CPF não informado'),
  param('cpf').matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/).withMessage('O formato do CPF deve ser 000.000.000-00'),
]

router.get("/benefit-number/:cpf",
    validations,
    checkValidation,
    async (req, res, next) => {
    const { cpf } = req.params;
    let data;

    try {
        data = await SearchController.getBenefitNumberByCpf(cpf);
    } catch (e) {
        return next(e);
    }

    res.json(data);
});

module.exports = router;
