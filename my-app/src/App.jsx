import {BrowserRouter, Routes, Route, NavLink} from "react-router-dom";
import {LoginPage} from './pages/LoginPage.jsx'
import {ShopPage} from "./pages/ShopPage.jsx";
import {HomePage} from "./pages/HomePage.jsx";
import {InventoryPage} from "./pages/InventoryPage.jsx";
import "semantic-ui-css/semantic.min.css"
import {Navbar} from "./components/Navbar/Navbar.jsx";
import {useEffect, useState} from "react";
import {SignupPage} from "./pages/SIgnupPage.jsx";

import {PlayPage} from "./pages/PlayPage.jsx";



function App() {
    const [authUser,setAuthUser]= useState(null);

  return (
      <>

          <BrowserRouter>
              <Navbar></Navbar>
              <div>
                  <Routes>
                      <Route path='/login' element={<LoginPage/>} />
                      <Route path='/store' element={<ShopPage/>} />
                      <Route path='/' element={<HomePage/>} />
                      <Route path='/inventory' element={<InventoryPage/>}/>
                      <Route path='/signup' element={<SignupPage></SignupPage>}/>
                      <Route path='/play' element={<PlayPage/>}/>
                  </Routes>
              </div>
          </BrowserRouter>
          <div>

          </div>
      </>

  )
}

export default App
