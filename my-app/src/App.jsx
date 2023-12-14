import {BrowserRouter, Routes, Route, NavLink} from "react-router-dom";
import {LoginPage} from './pages/LoginPage.jsx'
import {StorePage} from "./pages/StorePage.jsx";
import {HomePage} from "./pages/HomePage.jsx";
import {InventoryPage} from "./pages/InventoryPage.jsx";
import "semantic-ui-css/semantic.min.css"
import {Navbar} from "./components/Navbar/Navbar.jsx";
import {useState} from "react";
import {SignupPage} from "./pages/SIgnupPage.jsx";


function App() {
    const [authUser,setAuthUser]= useState(null);

  return (
      <>

          <BrowserRouter>
              <Navbar></Navbar>
              <div>
                  <Routes>
                      <Route path='/login' element={<LoginPage/>} />
                      <Route path='/store' element={<StorePage/>} />
                      <Route path='/' element={<HomePage/>} />
                      <Route path='/inventory' element={<InventoryPage/>}/>
                      <Route path='/signup' element={<SignupPage></SignupPage>}/>
                  </Routes>
              </div>
          </BrowserRouter>
      </>

  )
}

export default App
