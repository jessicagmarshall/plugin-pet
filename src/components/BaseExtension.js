/*global chrome*/

import React, { Component } from 'react';
import { PauseCircleOutlined, PlayCircleOutlined } from '@ant-design/icons';

import { turnCatOn, turnCatOff } from "../utils";
import angry_cat from '../assets/angry_cat.jpeg';
import sleeping_cat from '../assets/sleeping_cat.jpg';

class BaseExtension extends Component {
  constructor(props) {
    super(props);
    this.state = {
        timesIgnored: 0,
        paused: true
    }
  }

  componentDidMount() {
    // persist state
    chrome.storage.sync.get(['timesIgnored'], function(result) {
      if (result.timesIgnored === undefined) {
        chrome.storage.sync.set({'timesIgnored': 0});
      } else {
        this.setState({'timesIgnored': result.timesIgnored});
      }
    }.bind(this));

    chrome.storage.sync.get(['paused'], function(result) {
      if (result.paused === undefined) {
        chrome.storage.sync.set({'paused': true});
      } else {
        this.setState({'paused': result.paused});
      }
    }.bind(this));

    // the notification was closed, either by the system or by user action
    chrome.notifications.onClosed.addListener(function() {
      this.incrementTimesIgnored();
    }.bind(this));
  }

  incrementTimesIgnored() {
    this.setState({ timesIgnored: this.state.timesIgnored + 1 });
  }

  componentDidUpdate() {
     chrome.storage.sync.set({'timesIgnored': this.state.timesIgnored});
     chrome.storage.sync.set({'paused': this.state.paused});
  }

  togglePause() {
    this.setState({ paused: !this.state.paused }, () => {
      if (!this.state.paused) {
        turnCatOn()
      } else {
        turnCatOff()
      }
    });
  }

  render() {
      return (
          <div class="container">
            <div>
              <img
                style={{ height: '250px', width: '250px' }}
                src={!this.state.paused ? angry_cat : sleeping_cat}
                onClick={() => this.togglePause()}
                alt='angry_cat'
              />
            </div>
            <div style={{ color: 'black', display: 'flex', justifyContent: 'space-around' }}>
              <div>
                <p>{`You have ignored your cat ${this.state.timesIgnored} ${this.state.timesIgnored === 1 ? 'time' : 'times'}.`}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', paddingBottom: '2px' }}>
                {!this.state.paused ?
                  <PauseCircleOutlined
                    style={{ fontSize: 20, display: 'flex', alignItems: 'center' }}
                    onClick={() => this.togglePause()}
                  /> :
                  <PlayCircleOutlined
                    style={{ fontSize: 20, display: 'flex', alignItems: 'center' }}
                    onClick={() => this.togglePause()}
                  />
                 }
              </div>
            </div>
            <div style={{ color: 'black' }}>
              {this.state.paused ? `Click to wake up your cat.` : `Click to put your cat to sleep.`}
            </div>
          </div>
      )
   }
}

export default BaseExtension;
