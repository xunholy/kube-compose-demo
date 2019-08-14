import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './Form'
import axios from 'axios'

export default class App extends Component {

  state = {
    fields: {}
  }

  onChange = updatedValue => {
    this.setState({
      fields: {
        ...this.state.fields,
        ...updatedValue
      }
    })
  }

  onSubmit = fields => {
    let config = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }
    axios.post('http://localhost:8081/send', fields, config)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    return (
      <div className="App" >
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Try sending a message!
        </p>
        </header>
        <Form onSubmit={fields => this.onSubmit(fields)} onChange={fields => this.onChange(fields)} />
        <p>
          {JSON.stringify(this.state.fields, null, 2)}
        </p>
      </div>
    );
  }
}
