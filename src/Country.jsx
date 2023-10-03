import PropTypes from 'prop-types';
import './Country.css';

function Country(props) {
    const { name, label, entries } = props;

    return (
        <>
            <article className="card">
                <div className="card_header">
                    <div className="icon-container">
                        <img
                            src={`./flags/${name}.svg`}
                            className="flag-image"
                        />
                    </div>
                    <div className="header-title">
                        <h2>{label}</h2>
                    </div>
                </div>
                <div className="card_body">
                    { entries.map(entry => (
                        <div key={entry.plate}><b>{entry.plate}</b> - {entry.district}</div>
                    ) )}
                </div>
            </article>
        </>
    );
}

Country.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    entries: PropTypes.arrayOf(
        PropTypes.shape({
            plate: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
        })
    ),
};

export default Country;
