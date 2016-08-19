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
    this.offsetHeight = null;
  }

  componentDidMount(){
    this.node = ReactDOM.findDOMNode(this);
    this.ResizeSensor = new ResizeSensor(this.node, () => this.props.onHeightChange(this.node.offsetHeight));
    this.props.onHeightChange(this.node.offsetHeight);
  }

  shouldComponentUpdate = shouldComponentUpdate

  componentWillUnmount(){
    if (this.ResizeSensor){
      this.ResizeSensor.detach();
    }
  }

  componentDidUpdate(){
    if (this.node && this.node.offsetHeight !== this.offsetHeight){
      this.props.onHeightChange(this.node.offsetHeight);
    }
  }

  render(){
    const { children, onHeightChange, ...props } = this.props;

    if (this.node){
      this.offsetHeight = this.node.offsetHeight;
    }

    return (
      <div {...props}>
        {children || null}
      </div>
    )
  }
}

export default HeightReporter;
