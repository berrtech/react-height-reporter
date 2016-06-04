'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import HeightReporter from '../src/ReactHeightReporter.js';

const appRoot = document.createElement('div');

String.prototype.replaceAll = function(search, replacement) {
  var target = this;
  return target.split(search).join(replacement);
};

const containerStyles = {
  width: '400px',
  margin: '0 auto'
}

const nodeStyles = {
  maxWidth: '100%',
  border: '3px solid grey'
}

const nodeWrapperStyles = {
  paddingTop: '10px'
}

const textareaStyles = {
  width: '100%',
  height: '100px'
}

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      height: 0,
      value: '',
      nodes: []
    }
  }

  updateHeight = height => this.setState({height})

  updateValue = e => this.setState({value: e.target.value})

  addNode = e => {
    e.preventDefault();


    const { nodes, value } = this.state;

    this.setState({
      nodes: [
        ...nodes,
        value.replaceAll('\n', '<br/>')
      ],
      value: ''
    })
  }

  removeNode = index => {
    const updatedNodes = [...this.state.nodes];
    updatedNodes.splice(index, 1);
    this.setState({
      nodes: updatedNodes
    })
  }

  render(){
    const { height, nodes, value } = this.state;
    const { updateHeight, addNode, removeNode, updateValue } = this;

    return (
      <div style={containerStyles}>
        <div>
          <form onSubmit={addNode}>
            <textarea style={textareaStyles} value={value} onChange={updateValue}/>
            <button type='submit'>Add node!</button>
          </form>
        </div>
        <br/>
        <br/>

        <div>Calculated height: {height} </div>

        <HeightReporter onHeightChange={updateHeight}>
          {
            nodes.map((node, index) => (
              <div key={index} style={nodeWrapperStyles}>
                <div style={nodeStyles} dangerouslySetInnerHTML={{__html: node}}/>
                <button type='button' onClick={() => removeNode(index)}>Remove node!</button>
              </div>
            ))
          }
        </HeightReporter>
      </div>
    )
  }
}

appRoot.id = 'app';
document.body.appendChild(appRoot);
ReactDOM.render(<App />, appRoot);