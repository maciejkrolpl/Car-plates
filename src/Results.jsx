import { czech } from './data/czech.js';
import { polish } from './data/polish.js';
import { ukrainian } from './data/ukrainian.js';
import { german } from './data/german.js';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Country from './Country.jsx';

const Results = (props) => {
    const { searchTerm, searchType } = props;

    useEffect(() => {
        search();
           // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm, searchType]);

    const [result, setResult] = useState([]);

    const search = () => {
        if (
            !searchTerm?.length ||
            (searchTerm?.length <= 2 && searchType === 'description')
        ) {
            setResult([])
            return;
        }

        const filterToSearchType = {
            strict: (entry) => entry.plate === searchTerm,
            firstLetter: (entry) => entry.plate.startsWith(searchTerm),
            description: (entry) =>
                entry.district.toUpperCase().includes(searchTerm),
        };

        const filter = filterToSearchType[searchType];

        const filtered = [polish, ukrainian, german, czech].map((country) => ({
            ...country,
            entries: country.entries.filter(filter).map((plate) => plate),
        })).filter(country => !!country.entries.length);

        console.log(filtered);
        setResult(filtered);
    };

    return (
        <div>
            {result.map((country) => (
                <Country
                    name={country.name}
                    label={country.label}
                    entries={country.entries}
                    key={country.name}
                />
            ))}
        </div>
    );
};

Results.propTypes = {
    searchType: PropTypes.string,
    searchTerm: PropTypes.string,
};

export default Results;
