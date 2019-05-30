import React from 'react';
import './Dispenser.css';

import Display from './Display';
import Button from './Button';
import Tray from './Tray';

class Dispenser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {capacity: 20,
                  dispensed: 0};

    this.onDispense = this.onDispense.bind(this);
  }

  onDispense() {
    if (this.state.dispensed === this.state.capacity) {
      console.log('Empty!')
    } else {
      this.setState({dispensed: this.state.dispensed + 1})
      console.log('Dispensed!');
    }
  }

  render() {
    return (
      <div className="dispenser">
        <Display dispensed={this.state.dispensed}
                 capacity={this.state.capacity}/>
        <Button onDispense={this.onDispense}/>
        {/* <Tray /> */}
      </div>
    );
  }
}

  export default Dispenser;
