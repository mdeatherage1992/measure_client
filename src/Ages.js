import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import fetch from 'isomorphic-fetch'
import runtimeEnv from '@mars/heroku-js-runtime-env'

class Ages extends Component {

  constructor() {
    super()
    this.state = {
      data: [],
      ages: false
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    this.setState(state =>({ages: !state.ages}))

  }

  componentDidMount() {
    const url = runtimeEnv().REACT_APP_API_AGE_URL
    fetch(url)
      .then( res => res.json() )
      .then((json) => this.setState({data: json}))
      console.log(this.state.data)
  }

  render() {
    return (
  <div>
  <h1>Ages</h1>
      <table>
      <thead>
      <tr>
      <th>ID</th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Age</th>
      </tr>
      </thead>
      <tbody>
      {this.state.data.map((person,index) =>
      <tr key={index}>
      <td>{person.id}</td>
      <td>{person.first_name}</td>
      <td>{person.last_name}</td>
      <td>{person.age}</td>
      </tr>
    )}
      </tbody>
      </table>
      </div>
    );
  }
}

export default Ages;
