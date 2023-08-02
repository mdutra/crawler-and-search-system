const SearchService = require("../services/search-service");

async function getBenefitNumberByCpf(cpf) {
    return SearchService.getBenefitNumberByCpf(cpf);
}

module.exports = {
    getBenefitNumberByCpf,
};
