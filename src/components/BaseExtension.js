import React, { Component } from 'react';

import { turnCatOn, turnCatOff } from "../utils";
import angry_cat from '../assets/angry_cat.jpeg';

class BaseExtension extends Component {
  render() {
      return (
          <div class="container">
            <img
              src={angry_cat}
              onClick={() => turnCatOn()}
            />
            <div class="top-left">Click to activate</div>
          </div>
      )
   }
}

export default BaseExtension;
