import React, { Component } from 'react';

import { turnCatOn, turnCatOff } from "../utils";
import angry_cat from '../assets/angry_cat.jpeg';

class BaseExtension extends Component {
  render() {
      return (
          <div>
            <img
              src={angry_cat}
              onClick={() => turnCatOn()}
            />
          </div>
      )
   }
}

export default BaseExtension;