import React from 'react';

class Display extends React.Component {
    render() {
        const remaining = this.props.capacity - this.props.dispensed;
        const display_warning = remaining < 10;
        const empty = remaining === 0;
        return (
            <div className="display">
                Remaining: {remaining}
                <br/>
                {display_warning && !empty ? "Warning: Refill soon!" : ""}
                {empty ? "Warning: Empty!" : ""}
            </div>
        )
    }
}

export default Display;