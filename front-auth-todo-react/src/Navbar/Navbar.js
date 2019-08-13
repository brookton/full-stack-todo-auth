import React from 'react'
import TodoContainer from '../TodoContainer/TodoContainer'
import './Navbar.css'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import createBrowserHistory from "history/createBrowserHistory";

export const history = createBrowserHistory();

const Navbar = (props) => {
  return (
    <Router history={history}>
      <div>
        <nav>
          <ul>
            <li>
              <NavLink to="/todos">Todos</NavLink>
            </li>
          </ul>
        </nav>
        <div className="navbar">
          <Route exact={true} path="/" render={() => (
              <div className="get-started">
                <h4>Welcome to Todo</h4>
              </div>
            )} />
          <Route path="/todos" component={() => <TodoContainer {...props}/>} />
        </div>
      </div>
    </Router>
  )
}

export default Navbar
