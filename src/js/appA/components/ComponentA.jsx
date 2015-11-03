'use strict';

import React from 'react';
import {SubComponentA} from './SubComponentA';

var ComponentA = React.createClass({
  render() {
    return (
      <div>
        <div>ComponentA</div>
        <SubComponentA />
      </div>
    );
  }
});

export {
  ComponentA
};
