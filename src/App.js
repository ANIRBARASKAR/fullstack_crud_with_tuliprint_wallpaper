import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
 import {  BrowserRouter ,Route , Routes} from "react-router-dom"
import './assets/css/style.css'
import MainComponent from './MainComponent';
import Setting from './dashboard/Setting';
import Sidebar from './dashboard/Sidebar';
import Home from './dashboard/Home';
import PageNotFound from './dashboard/PageNotFound';
import DesignSize from './dashboard/DesignSize';
import Mockups from './dashboard/Mockups';
import Materials from './dashboard/Materials';
 

function App() {
  return (
    <>
     <MainComponent/>
    </>
  );
}

export default App;



