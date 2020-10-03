import React from 'react';
import './toggleButton.css';

class ToggleButton extends React.Component {

    render() {
        const sliderClassname = (this.props.rounded) ? 'slider rounded' : 'slider';

        return (
            <React.StrictMode>
                <p>Sort in Descending Order
                <label className="switch">
                        <input type="checkbox" checked={this.props.isToggled} onClick={this.props.onToggle}/>
                        <span className={sliderClassname} />
                    </label>
                </p>
            </React.StrictMode>
        );
    }
}

export default ToggleButton;