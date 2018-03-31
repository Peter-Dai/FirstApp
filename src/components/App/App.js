import React, { Component } from 'react';
import logo from '../../logo.svg';
import './App.css';
import { BrowserRouter as Router, Route,Link } from 'react-router-dom';
import Home from '../Home/Home';
import EditGoods from '../EditGoods/EditGoods';
import AddGoods from '../AddGoods/AddGoods';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <ul>
              <li>
                <Link to="/" >home</Link>
              </li>
              <li>
                <Link to="/edit" >edit</Link>
              </li>
              <li>
                <Link to="/add" >add</Link>
              </li>
            </ul>
            <Route exact path="/" component={Home} />
            <Route path="/edit" component={EditGoods} />
            <Route path="/add" component={AddGoods} />
            
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
