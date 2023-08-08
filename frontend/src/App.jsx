import React, { useState } from 'react';
import SearchRepository from './repository/search-repository';
import './App.css';

function App() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResult, setSearchResult] = useState(null);
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        try {
            const result = await SearchRepository.findBenefitNumberByCpf(searchTerm);
            setSearchResult(result.data);
        } catch (e) {
            setError(e.response.data.error);
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Buscar Número do Benefício</h1>
                <div>
                    <input
                        type="text"
                        placeholder="Insira o CPF"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button onClick={handleSearch}>Search</button>
                </div>
                {searchResult ? (
                    <div>
                        <h2>Número de benefício encontrado</h2>
                        <p>{searchResult.benefitNumber}</p>
                    </div>
                ) : ""}
                {error ? (
                    <div>
                        <h2>Erro:</h2>
                        <p>{error}</p>
                    </div>
                ) : ""}
            </header>
        </div>
    );
}

export default App;
