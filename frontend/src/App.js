import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Body from './components/Body';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RegisterList from './components/register/RegisterList';
import RegisterCreate from './components/register/RegisterCreate';
import RegisterView from './components/register/RegisterView';
import React from 'react';

function App() {
  return (
    <React.Fragment>
      <Router>
        <Header logo="fa-solid fa-blog" />
        <div className="container">
          <Switch>
            <Route path="/" exact component={RegisterList}></Route>
            <Route path="/register_list" component={RegisterList}></Route>
            <Route path="/add-register/:id" component={RegisterCreate}></Route>
            <Route path="/view-register/:id" component={RegisterView}></Route>
          </Switch>
        </div>
        <Footer special="Bütün Haklar Saklıdır" />
      </Router>
    </React.Fragment>
  );
}

export default App;
