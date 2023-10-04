import PropTypes from 'prop-types';
import './Input.css';
import './Form.css';
import searchIcon from './icons/search.svg';
import deleteIcon from './icons/delete.svg';
import { useRef } from 'react';

function Input(props) {
    const { label, oninput, id, ondeleteclick, type = 'text' } = props;
    const inputRef = useRef(null);

    const handleDeleteClick = () => {
        inputRef.current.value = '';
        ondeleteclick();
    };

    const elementInputClassName = `form-element_input${
        type === 'search' ? ' has-icons' : ''
    }`;

    return (
        <div className="form-element">
            <label className="form-element_label" htmlFor={id}>
                {label}
            </label>
            <div className="form-element_control">
                {type === 'search' ? (
                    <img
                        src={searchIcon}
                        width="16"
                        height="16"
                        className="form-element_left-icon"
                    />
                ) : null}

                <input
                    className={elementInputClassName}
                    type="text"
                    placeholder={label}
                    onInput={oninput}
                    id={id}
                    ref={inputRef}
                />
                {type === 'search' ? (
                    <img
                        src={deleteIcon}
                        width="16"
                        height="16"
                        className="form-element_right-icon"
                        onClick={handleDeleteClick}
                    />
                ) : null}
            </div>
        </div>
    );
}

const typeChecker = (props, propName, componentName) => {
    componentName = componentName || 'ANONYMOUS';
    if (props[propName]) {
        const value = props[propName];
        if (!['text', 'search'].includes(value)) {
            return new Error(
                propName + ' in ' + componentName + ' is invalid type'
            );
        }
    }
    return null;
};

Input.propTypes = {
    label: PropTypes.string,
    oninput: PropTypes.func,
    type: typeChecker,
    ondeleteclick: PropTypes.func,
    id: PropTypes.string.isRequired,
};

export default Input;
