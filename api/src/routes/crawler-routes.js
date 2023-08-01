const express = require("express");
const CrawlerController = require("../controllers/crawler-controller");

const router = express.Router();

router.post("/extract-benefit-number", async (req, res, next) => {
    const { cpf, login, senha } = req.body;

    try {
        await CrawlerController.extractBenefitNumber({ cpf, login, senha });
    } catch (e) {
        return next(e);
    }

    res.json({ ok: true });
});

module.exports = router;
