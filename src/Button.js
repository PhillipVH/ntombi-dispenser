import React from 'react';

class Button extends React.Component {
    render() {
        return (
            <button className="button" onClick={this.props.onClick}>
                <span className='button-label'>{this.props.label}</span>
            </button>
        )
    }
}

export default Button;