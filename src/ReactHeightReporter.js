'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import ResizeSensor from './vendor/ResizeSensor/ResizeSensor.js';

import {shouldComponentUpdate} from 'react/lib/ReactComponentWithPureRenderMixin';

class HeightReporter extends React.Component {
  static propTypes = {
    children: React.PropTypes.node.isRequired,
    onHeightChange: React.PropTypes.func.isRequired
  }

  constructor(props){
    super(props);
    this.ResizeSensor = null;
  }

  componentDidMount(){
    const node = ReactDOM.findDOMNode(this);
    this.ResizeSensor = new ResizeSensor(node, () => this.props.onHeightChange(node.offsetHeight));
    this.props.onHeightChange(node.offsetHeight);
  }

  shouldComponentUpdate = shouldComponentUpdate

  componentWillUnmount(){
    if (this.ResizeSensor){
      this.ResizeSensor.detach();
    }
  }

  render(){
    const { children, onHeightChange, ...props } = this.props;

    return (
      <div {...props}>
        {children || null}
      </div>
    )
  }
}

export default HeightReporter;