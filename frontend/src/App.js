
import './App.css';
import Header from './component/Header';
import Footer from './component/Footer';
import {BrowserRouter as Router,Route,Switch } from 'react-router-dom';
import CreateOrUpdateRegister from './component/blog/CreateOrUpdateRegister';
import DetailPageRegister from './component/blog/DetailPageRegister';
import RegisterList from './component/blog/RegisterList';


export default  function App() {
  return (
    <>
      <Router> 
      <Header logo="fa-solid fa-blog" />
         <div className="container">
          <Switch>
            <Route path="/" exact component={RegisterList}></Route>
            <Route path="/register"  component={RegisterList}></Route>
            <Route path="/register_add/:id"  component={CreateOrUpdateRegister}></Route>
            <Route path="/register_view/:id"  component={DetailPageRegister}></Route>
            {/* <Route component={NotFound}/> */}
          </Switch>
        </div>
        <Footer special="@Copy; Bütün Haklar Saklıdır" />
      </Router>
    </>
  ); //end return 
} // end function
