

import React,{createContext,useState} from "react";
import {  BrowserRouter ,Route , Routes} from "react-router-dom"
import Setting from './dashboard/Setting';
import Sidebar from './dashboard/Sidebar';
import Home from './dashboard/Home';
import PageNotFound from './dashboard/PageNotFound';
import DesignSize from './dashboard/DesignSize';
import Mockups from './dashboard/Mockups';
import Materials from './dashboard/Materials';
import UpdateSetting from './components/UpdateSetting';
import UpdateDesign from "./components/UpdateDesign";
import UpdateMockUp from "./components/UpdateMockUp";
import UpdateMaterial from "./components/UpdateMaterial";

const AppContaxt = createContext()
                 

function App() {
  // this value for update setting
  const [updatedValue_, setupdatedValue_] = useState()
  const [updateDesignSize, setupdateDesignSize] = useState()
  const [updateMockUp, setupdateMockUp] = useState()
  const [updateMaterial, setupdateMaterial] = useState()

  return (
    <>
    <AppContaxt.Provider
    value={{
      updatedValue_, setupdatedValue_,
      updateDesignSize, setupdateDesignSize,
      updateMockUp, setupdateMockUp,
      updateMaterial, setupdateMaterial
    } }
    >
     <div className="container-fluid">
     <div className="row my-1">
     <BrowserRouter> 
      <div className="col-sm-2">

      <Sidebar/>
      </div>
      <div className="col-sm-10">

      <Routes>
         <Route path='/' element={<Home/>}/>
         <Route path='/setting' element={<Setting/>}/>
         <Route path='/designSize' element={<DesignSize/>}/>
         <Route path='/mockups' element={<Mockups/>}/>
         <Route path='/materials' element={<Materials/>}/>
         <Route path='/updateSetting' element={<UpdateSetting/>}/>
         <Route path='/updateDesign' element={<UpdateDesign/>}/>
         <Route path='/updateMockup' element={<UpdateMockUp/>}/>
         <Route path='/updateMaterial' element={<UpdateMaterial/>}/>
         <Route path='*' element={<PageNotFound/>}/>
      </Routes>
      </div>
     </BrowserRouter>
     </div>
     </div>
     </AppContaxt.Provider>
    </>
  );
}

export default App;

export {AppContaxt};

