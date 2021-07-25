import logo from './logo.svg';
import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import checkToken from './utils/checkToken';

import Header from './components/header';
import List from './components/list';
import League from './components/league';
import Matches from './components/matches';
import Tierlist from './components/tierlist';
import SubHeader from './components/subHeader';
import Login from './components/login';
import Logout from './components/logout';
import Signup from './components/signup';
import Register from './components/register';
import AddLeague from './components/addLeague';
import ManageLeague from './components/manageLeague';
import CreateDivision from './components/createDivision';
import ManageCoaches from './components/manageCoaches';
import AddMatch from './components/addMatch';
import SubmitResult from './components/submitResult';

function App() {

  checkToken();

  let apiURL = "http://localhost:3001";
  
  sessionStorage.setItem("apiURL", apiURL);

  return (

    <div>
      
      <Router>
        <Switch>
          <Route path="/league">
            <Header></Header>
            <LeagueRouter />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/logout">
            <Logout />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/">
            <Header></Header>
            <List />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

function LeagueRouter() {
    let match = useRouteMatch();
    return (<Switch>
        <Route path={`${match.path}/add`}>
            <AddLeague />
        </Route>
        <Route path={`${match.path}/manage/:id`}>
            <SubHeader />
            <ManageLeague />
        </Route>
        <Route path={`${match.path}/createDivisions/:id`}>
            <SubHeader />
            <CreateDivision />
        </Route>
        <Route path={`${match.path}/matches/:id`}>
            <SubHeader />
            <Matches />
        </Route>
        <Route path={`${match.path}/manageCoaches/:id`}>
            <SubHeader />
            <ManageCoaches />
        </Route>
        <Route path={`${match.path}/signup/:id`}>
            <SubHeader />
            <Register />
        </Route>
        <Route path={`${match.path}/tierlist/:id`}>        
          <SubHeader />
          <Tierlist />
        </Route>
        <Route path={`${match.path}/createMatches/:id`}>        
          <SubHeader />
          <AddMatch />
        </Route>
        <Route path={`${match.path}/submitResult/:id`}>
          <SubmitResult />
        </Route>
        <Route path={`${match.path}/:id`}>
          <SubHeader />
          <League />
        </Route>
    </Switch>)
}

export default App;