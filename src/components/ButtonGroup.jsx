import { useState } from 'react';
import Button from './Button';
import './Form.css';
import PropTypes from 'prop-types';

export default function ButtonGroup(props) {
    const { options, onchange, value } = props;

    const [activeButton, setActiveButton] = useState(value);

    const handleButtonClick = (e) => {
        const clicked = e.target.name;
        if (clicked !== activeButton) {
            setActiveButton(clicked);
            onchange(clicked);
        }
    };

    const BUTTON_CLICKED = 'mainaction';
    const BUTTON_LOOSE = 'standard';

    const buttons = options.map((item) => (
        <Button
            type={item.value === activeButton ? BUTTON_CLICKED : BUTTON_LOOSE}
            key={item.value}
            id={item.value}
            label={item.label}
            name={item.value}
            onclick={handleButtonClick}
        />
    ));

    return <div className="button-group"> {buttons} </div>;
}

ButtonGroup.propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
        })
    ),
    onchange: PropTypes.func,
    value: PropTypes.string
};
