import PropTypes from "prop-types";
import './Input.css';
import './Form.css';

function Input(props) {
  const { label, oninput, id } = props;

  return (
    <div className="form-element">
      <label className="form-element_label" htmlFor={id}>{label}</label>
        <input
          className="form-element_input"
          type="text"
          placeholder={label}
          onInput={oninput}
          id={id}
        />
    </div>
  );
}

Input.propTypes = {
  label: PropTypes.string,
  oninput: PropTypes.func,
  id: PropTypes.string.isRequired,
};

export default Input;
