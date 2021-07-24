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
import Header from './components/header';
import List from './components/list';
import League from './components/league';
import Matches from './components/matches';
import Tierlist from './components/tierlist';
import SubHeader from './components/subHeader';

function App() {
  return (

    <div>
      <Header></Header>
      <Router>
        <Switch>
          <Route path="/league">
            <LeagueRouter />
          </Route>
          <Route path="/">
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
        <Route path={`${match.path}/matches/:id`}>
            <SubHeader />
            <Matches />
        </Route>
        <Route path={`${match.path}/tierlist/:id`}>        
          <SubHeader />
          <Tierlist />
        </Route>
        <Route path={`${match.path}/:id`}>
          <SubHeader />
          <League />
        </Route>
    </Switch>)
}

export default App;