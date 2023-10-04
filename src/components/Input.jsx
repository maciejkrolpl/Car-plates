import PropTypes from 'prop-types';
import './Input.css';
import './Form.css';
import searchIcon from './icons/search.svg';
import deleteIcon from './icons/delete.svg';
import {useRef} from 'react';

function Input(props) {
    const { label, oninput, id, ondeleteclick } = props;
    const inputRef = useRef(null);

    const handleDeleteClick = () => {
      inputRef.current.value = ''
      ondeleteclick();
    }

    return (
        <div className="form-element">
            <label className="form-element_label" htmlFor={id}>
                {label}
            </label>
            <div className="form-element_control">
                <img
                    src={searchIcon}
                    width="16"
                    height="16"
                    className="form-element_left-icon"
                />
                <input
                    className="form-element_input"
                    type="text"
                    placeholder={label}
                    onInput={oninput}
                    id={id}
                    ref={inputRef}
                />
                <img
                    src={deleteIcon}
                    width="16"
                    height="16"
                    className="form-element_right-icon"
                    onClick={handleDeleteClick}
                />
            </div>
        </div>
    );
}

Input.propTypes = {
    label: PropTypes.string,
    oninput: PropTypes.func,
    ondeleteclick: PropTypes.func,
    id: PropTypes.string.isRequired,
};

export default Input;
