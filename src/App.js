import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Ages from './Ages';
import People from './People';
import fetch from 'isomorphic-fetch';
import runtimeEnv from '@mars/heroku-js-runtime-env';

class App extends Component {

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
    const url = runtimeEnv().REACT_APP_API_URL
    fetch(url)
      .then( res => res.json() )
      .then((json) => this.setState({data: json}))
  }

  render() {
    return (
      <div>
      <h1>People Searcher</h1>
      <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <ul className="navbar-nav mr-auto">
          <li><Link to={'/people'} className="nav-link"> People </Link></li>
          <li><Link to={'/ages'} className="nav-link">Ages</Link></li>
        </ul>
        </nav>
        <hr />
        <Switch>
            <Route exact path='/people' component={People} />
            <Route path='/ages' component={Ages} />
        </Switch>
      </div>
    </Router>
      </div>
    );
  }
}

export default App;
