/*global chrome*/

import React, { Component } from 'react';

import { turnCatOn, turnCatOff } from "../utils";
import angry_cat from '../assets/angry_cat.jpeg';

class BaseExtension extends Component {
  constructor(props) {
    super(props)
    this.state = {
        timesIgnored: 0
    }
  }

  componentDidMount() {
    // the notification was closed, either by the system or by user action
    chrome.notifications.onClosed.addListener(function() {
      this.incrementTimesIgnored()
    }.bind(this));
  }

  incrementTimesIgnored() {
    this.setState({ timesIgnored: this.state.timesIgnored + 1 })
  }

  render() {
      console.log(this.state);
      return (
          <div>
            <img
              src={angry_cat}
              onClick={() => turnCatOn()}
            />
            <div>
              <p>You have ignored your cat {this.state.timesIgnored} times.</p>
            </div>
          </div>
      )
   }
}

export default BaseExtension;