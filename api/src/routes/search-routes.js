const express = require("express");
const SearchController = require("../controllers/search-controller");

const router = express.Router();

router.get("/benefit-number/:cpf", async (req, res, next) => {
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
