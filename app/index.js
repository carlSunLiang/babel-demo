import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render () {
    return (
      <div>
        <h1>hello, world</h1>
        <Book />
      </div>
    )
  }
}

const lists = ['java', 'node', 'php'];

class Book extends React.Component {
  render() {
    return (
      <ul>
        {
          lists.map((result, index) => {
            return (<li key={index}>{result}</li>)
          })
        }
      </ul>
    )
  }
}

render(<App/>, document.getElementById('app'));