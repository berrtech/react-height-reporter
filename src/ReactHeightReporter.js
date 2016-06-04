'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import ResizeSensor from './vendor/ResizeSensor/ResizeSensor.js';

class HeightReporter extends React.Component {
  constructor(props){
    super(props);

    if (!props.children) console.error('You must provide children for HeightReporter component!');

    this.ResizeSensor = null;
  }

  componentDidMount(){
    const node = ReactDOM.findDOMNode(this);
    this.ResizeSensor = new ResizeSensor(node, () => this.props.onHeightChange(node.offsetHeight));
    this.props.onHeightChange(node.offsetHeight);
  }

  componentWillUnmount(){
    if (this.ResizeSensor){
      this.ResizeSensor.detach();
    }
  }

  render(){
    return (
      <div>
        {this.props.children || null}
      </div>
    )
  }
}

export default HeightReporter;