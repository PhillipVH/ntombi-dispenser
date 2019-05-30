import axios from 'axios';
import React from 'react';

import Button from './Button';
import Display from './Display';

import './Dispenser.css';


class Dispenser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      capacity: 20,
      dispensed: 0,
      refillRequested: false
    };

    this.onDispense = this.onDispense.bind(this);
    this.onRefill = this.onRefill.bind(this);

    this.axios = axios.create({ baseURL: 'http://192.168.8.101:5000' });
  }

  onDispense() {
    // If the dispenser is not yet empty, we can still dispense.
    if (this.state.dispensed !== this.state.capacity) {
      // Update the state of the display
      this.setState({ dispensed: this.state.dispensed + 1 })

      // Send an update event to the Gateway
      const dispenseEvent = { id: 1, token: '42x5yz', type: 'DISPENSE' };
      this.axios.post('/', dispenseEvent);

      // If the dispenser is below 10 items, request a refill
      const remaining = this.state.capacity - (this.state.dispensed + 1);
      console.log('Items remaining: ' + remaining);
      if (remaining <= 10) {
        this.requestRefill();
      }
    } else {
      // Send an empty device event to the Gateway
      if (!this.state.emptyWarningSent) {
        this.setState({ emptyWarningSent: true })

        const emptyEvent = { id: 1, token: '42x5yz', type: 'EMPTY' };
        this.axios.post('/', emptyEvent);
      }
    }
  }

  requestRefill() {
    // If a refill hasn't yet been requested, send an event
    // and set the flag.
    if (!this.state.refillRequested) {
      this.setState({ refillRequested: true })

      // Send a refill request event to the Gateway
      const requestRefillEvent = { id: 1, token: '42x5yz', type: 'REFILL' };
      this.axios.post('/', requestRefillEvent);
    }
  }

  onRefill() {
    // Reset the refill request flag
    // Reset the number of products in the dispenser
    this.setState({
      refillRequested: false,
      emptyWarningSent: false,
      dispensed: 0
    });

    // Send a refilled event to the Gateway
    const refilledEvent = { id: 1, token: '42x5yz', type: 'REFILLED' };
    this.axios.post('/', refilledEvent);
  }

  render() {
    return (
      <div className="dispenser">
        <Display dispensed={this.state.dispensed}
          capacity={this.state.capacity} />
        <Button label='Dispense' onClick={this.onDispense} />
        {this.state.dispensed !== 0 ? <Button label='Refill' onClick={this.onRefill} /> : ''}
      </div>
    );
  }
}

export default Dispenser;
