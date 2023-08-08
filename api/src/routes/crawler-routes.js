const express = require("express");
const { body } = require("express-validator");
const CrawlerController = require("../controllers/crawler-controller");
const { checkValidation } = require("../middlewares/custom-middlewares");

const router = express.Router();

const validations = [
  body('cpf').notEmpty().withMessage('CPF não informado'),
  body('cpf').matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/).withMessage('O formato do CPF deve ser 000.000.000-00'),
  body('login').notEmpty().withMessage('login não informado'),
  body('senha').notEmpty().withMessage('senha não informada'),
]

router.post("/extract-benefit-number",
    validations,
    checkValidation,
    async (req, res, next) => {
    const { cpf, login, senha } = req.body;

    try {
        await CrawlerController.extractBenefitNumber({ cpf, login, senha });
    } catch (e) {
        return next(e);
    }

    res.json({ ok: true });
});

module.exports = router;
