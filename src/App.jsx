import { useState } from 'react';
import './App.css';
import Input from './components/Input';
import ButtonGroup from './components/ButtonGroup';
import Results from './Results';

function App() {
    const options = [
        {
            label: 'Dokładnie',
            value: 'strict',
            inputLabel: 'Wyszukaj tablice rejestracyjne',
        },
        {
            label: 'Początek',
            value: 'firstLetter',
            inputLabel: 'Wyszukaj tablice rejestracyjne',
        },
        {
            label: 'Opis',
            value: 'description',
            inputLabel: 'Wyszukaj tablice (min. 3 znaki)',
        },
    ];

    const [searchTerm, setSearchTerm] = useState();
    const [searchType, setSearchType] = useState(options[0].value);
    const [inputLabel, setInputLabel] = useState(options[0].inputLabel);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value.toUpperCase());
    };

    const handleSearchTypeChange = (value) => {
        setSearchType(value);
        setInputLabel(
            options.find((option) => option.value === value).inputLabel
        );
    };

    return (
        <div>
            <header>
                <h1>Wyszukiwarka tablic rejestracyjnych</h1>
            </header>
            <section>
                <ButtonGroup
                    options={options}
                    value={searchType}
                    onchange={handleSearchTypeChange}
                />
            </section>

            <section>
                <Input
                    id="search-input"
                    label={inputLabel}
                    oninput={handleSearch}
                />
            </section>

            <section>
                <Results searchTerm={searchTerm} searchType={searchType} />
            </section>
        </div>
    );
}

export default App;
