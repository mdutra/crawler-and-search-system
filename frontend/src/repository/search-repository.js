import axios from 'axios';

async function findBenefitNumberByCpf(cpf) {
    return axios.get(`http://localhost:3000/search/benefit-number/${cpf}`);
}

export default {
    findBenefitNumberByCpf,
}
