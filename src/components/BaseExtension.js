/*global chrome*/

import React, { Component } from 'react';
import { PauseCircleOutlined, PlayCircleOutlined } from '@ant-design/icons';

import { turnCatOn, turnCatOff } from "../utils";
import angry_cat from '../assets/angry_cat.jpeg';

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
        chrome.storage.sync.set({'timesIgnored': 0}, function(result) {
          this.setState({'timesIgnored': 0});
        }.bind(this));
      } else {
        this.setState({'timesIgnored': result.timesIgnored});
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
     chrome.storage.sync.set({'timesIgnored': this.state.timesIgnored}, function(result) {
     });
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
                src={angry_cat}
                onClick={() => this.togglePause()}
                alt='angry_cat'
              />
            </div>
            <div class="top-left">Click to activate</div>
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
          </div>
      )
   }
}

export default BaseExtension;
