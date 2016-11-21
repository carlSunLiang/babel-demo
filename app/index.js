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
        <h1>hello, {this.props.name}</h1>
        <Book />
        <Timer />
        <TodoApp />
        <UserGithub source="https://api.github.com/users/torvalds"/>
      </div>
    )
  }
}

App.propTypes = {
  name: React.PropTypes.string
}

App.defaultProps = {
  name: 'world'
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

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.tick = this.tick.bind(this);
    this.state = {
      secondsElapsed: 0
    }
  }
  tick() {
    this.setState({secondsElapsed: this.state.secondsElapsed + 1})
  }
  componentDidMount() {
    this.interval = setInterval(this.tick, 1000)
  }
  componentWillUnmount() {
    clearInterval(this.interval)
  }
  render() {
    return (
        <div>Seconds Elapsed: {this.state.secondsElapsed}</div>
    )
  }
}

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <ul>
        {
          this.props.items.map((item) => {
            <li key={item.id}>{item.text}</li>
          })
        }
      </ul>
    )
  }
}


class TodoApp extends React.Component {
  constructor(props){
    super(props)
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      items: [],
      text: '222'
    }
  }
  onChange(e) {
    this.setState({text: e.target.value})
  }
  handleSubmit(e) {
    e.perventDefult();
    const nextItems = this.state.items.concat([{text: this.state.text, id: Date.now()}]);
    const nextText = '';
    this.setState({items: nextItems, text: nextText});
  }

  render() {
    return (
      <div>
        <h3>todo</h3>
        <TodoList items={this.state.items} />
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.onChange} value={this.state.text}/>
          <button>{'Add#' + (this.state.items.length + 1)}</button>
        </form>
      </div>
    )
  }
}

class UserGithub extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      githubUrl: '',
      avatarUrl: '',
    }
  }
  componentDieMount() {
    $.get(this.props.source, (result) => {
      console.log(result);
      const data = result;
      if (data) {
        this.setState({
          username: data.name,
          githubUrl: data.html_url,
          avatarUrl: data.avatar_url
        })
      }
    })
  }
  render() {
    return (
      <div>
        <h3>{this.state.username}</h3>
        <img src="{this.state.avatarUrl}" alt="" />
        <a href="{this.state.githubUrl}">github link</a>
      </div>
    )
  }
}



render(<App name="hehe"/>, document.getElementById('app'));



































