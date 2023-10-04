import data from './data/data';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Country from './Country.jsx';

const Results = (props) => {
    const { searchTerm, searchType } = props;

    useEffect(() => {
        async function importData() {
            const imported = await data();
            setCountries(imported);
        }
        importData();
    }, []);

    useEffect(() => {
        search();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm, searchType]);

    const [result, setResult] = useState([]);
    const [countries, setCountries] = useState({});

    const search = () => {
        if (
            !searchTerm?.length ||
            (searchTerm?.length <= 2 && searchType === 'description')
        ) {
            setResult([]);
            return;
        }

        const filterToSearchType = {
            strict: (entry) => entry.plate === searchTerm,
            firstLetter: (entry) => entry.plate.startsWith(searchTerm),
            description: (entry) =>
                entry.district.toUpperCase().includes(searchTerm),
        };

        const filter = filterToSearchType[searchType];

        const filtered = countries
            .map((country) => ({
                ...country,
                entries: country.entries.filter(filter).map((plate) => plate),
            }))
            .filter((country) => !!country.entries.length);

        setResult(filtered);
    };

    return (
        <div>
            {result.map((country) => (
                <Country
                    label={country.label}
                    entries={country.entries}
                    key={country.name}
                    flag={country.flag}
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
