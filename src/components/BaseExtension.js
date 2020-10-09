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
    // persist state
    chrome.storage.sync.get(['timesIgnored'], function(result) {
      if (result.timesIgnored === undefined) {
        chrome.storage.sync.set({'timesIgnored': 0}, function(result) {
          this.setState({'timesIgnored': 0})
        }.bind(this));
      } else {
        this.setState({'timesIgnored': result.timesIgnored})
      }
    }.bind(this));

    // the notification was closed, either by the system or by user action
    chrome.notifications.onClosed.addListener(function() {
      this.incrementTimesIgnored()
    }.bind(this));
  }

  incrementTimesIgnored() {
    this.setState({ timesIgnored: this.state.timesIgnored + 1 })
  }

  componentDidUpdate() {
     chrome.storage.sync.set({'timesIgnored': this.state.timesIgnored}, function(result) {
     }.bind(this));
  }

  render() {
      return (
          <div class="container">
            <img
              src={angry_cat}
              onClick={() => turnCatOn()}
            />
            <div style={{ color: 'black' }}>
              <p>{`You have ignored your cat ${this.state.timesIgnored} ${this.state.timesIgnored === 1 ? 'time' : 'times'}`}</p>
            </div>
            <div class="top-left">Click to activate</div>
          </div>
      )
   }
}

export default BaseExtension;
