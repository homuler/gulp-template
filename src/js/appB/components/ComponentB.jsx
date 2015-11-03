'use strict';

import React from 'react';
import {SubComponentB} from './SubComponentB';
import {utility} from './../../common/util';

var ComponentB = React.createClass({
  render() {
    return (
      <div>
        <div>ComponentB</div>
        <SubComponentB />
      </div>
    );
  }
});

export {
  ComponentB
};
