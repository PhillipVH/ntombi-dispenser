import React from 'react';

class Display extends React.Component {
    render() {
        const remaining = this.props.capacity - this.props.dispensed;
        const display_warning = remaining <= 10;
        const empty = remaining === 0;
        return (
            <div className="display">
                Remaining: <span className='remaining'>{remaining}</span>
                <br/>
                {display_warning && !empty ? <span className='warning'>Warning: Refill soon!</span> : ""}
                {empty ? <span className='warning'>Warning: Empty!</span> : ''}
            </div>
        )
    }
}

export default Display;