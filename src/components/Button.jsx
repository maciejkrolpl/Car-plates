import PropTypes from 'prop-types';
import './Button.css';
import './Form.css';

function Button(props) {
    const { label, id, type = 'standard', onclick, name } = props;

    const buttonClass = () => `button button-${type}`;

    return (
        <button type="text" onInput={oninput} id={id} onClick={onclick} className={buttonClass()} name={name}>
            {label}
        </button>
    );
}

Button.propTypes = {
    label: PropTypes.string.isRequired,
    onclick: PropTypes.func,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
};

export default Button;
