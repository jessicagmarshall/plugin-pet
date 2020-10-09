/*global chrome*/

import React, { Component } from 'react';
import { PauseCircleOutlined, PlayCircleOutlined } from '@ant-design/icons';

import { turnCatOn, turnCatOff } from "../utils";
import angry_cat from '../assets/angry_cat.jpeg';
import sleeping_cat from '../assets/sleeping_cat.jpg';

var default_values = {
  'timesIgnored': 0,
  'paused': true
}

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
    this.getStorageValue('timesIgnored');
    this.getStorageValue('paused');

    // the notification was closed, either by the system or by user action
    chrome.notifications.onClosed.addListener(function() {
      this.incrementTimesIgnored();
    }.bind(this));
  }

  getStorageValue(key) {
    chrome.storage.sync.get([key], function(result) {
      console.log(key, result[key], 'get')
      if (result[key] === undefined) {
        chrome.storage.sync.set({key: default_values[key]}, function(result) {
        }.bind(this));
      } else {
//        console.log(key, result[key]);
        this.setState({[key]: result[key]}, () => {
//          console.log(this.state)
        });
      }
    }.bind(this));
  }

  setStorageValue(key) {
     console.log(key, this.state[key], 'set');
     chrome.storage.sync.set({key: this.state[key]}, function() {
     });
  }

  incrementTimesIgnored() {
    this.setState({ timesIgnored: this.state.timesIgnored + 1 });
  }

  componentDidUpdate(prevState) {
    for (const key in Object.keys(this.state)) {
      if (prevState[key] !== this.state[key]) {
        this.setStorageValue(key)
      }
    }
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
