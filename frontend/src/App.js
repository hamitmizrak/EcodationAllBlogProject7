import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Body from './components/Body';
import { Route, Router, Switch } from 'react-router-dom';
import RegisterList from './components/register/RegisterList';
import RegisterCreate from './components/register/RegisterCreate';
import RegisterView from './components/register/RegisterView';

function App() {
  return (
    <div className="App">
      <Router>
        <Header logo="fa-solid fa-blog" />
        <Switch>
          <Body />
          <Route path="/" exact component={RegisterList}></Route>
          <Route path="/register" component={RegisterList}></Route>
          <Route path="/add-register/:id" component={RegisterCreate}></Route>
          <Route path="/view-register/:id" component={RegisterView}></Route>
        </Switch>
        <Footer special="Bütün Haklar Saklıdır" />
      </Router>
    </div>
  );
}

export default App;
