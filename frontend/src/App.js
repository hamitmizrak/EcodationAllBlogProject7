import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Body from './components/Body';

function App() {
  return (
    <div className="App">
     <Header logo="fa-solid fa-blog"/>
     <Body/>
     <Footer special="Bütün Haklar Saklıdır"/>
    </div>
  );
}

export default App;
