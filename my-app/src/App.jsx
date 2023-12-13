
import './App.css'
import {BrowserRouter, Routes, Route, NavLink} from "react-router-dom";
import {LoginPage} from './pages/LoginPage.jsx'
import {StorePage} from "./pages/StorePage.jsx";
import {HomePage} from "./pages/HomePage.jsx";
import {Menu} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css"
import {Inventory} from "./components/Inventory/Inventory.jsx";

function App() {

  return (
      <>
          <BrowserRouter>
              <Menu>
                  <Menu.Item>
                      <NavLink to="/" name={"navbar"}>Home</NavLink>
                  </Menu.Item>
                  <Menu.Item>
                      <NavLink to="/login" name={"navbar"}>S'identifier</NavLink>
                  </Menu.Item>
                  <Menu.Item>
                      <NavLink to="/store" name={"navbar"}>Magasin</NavLink>
                  </Menu.Item>
                  <Menu.Item>
                      <NavLink to="/inventory" name={"navbar"}>Inventaire</NavLink>
                  </Menu.Item>
              </Menu>
              <div>
                  <Routes>
                      <Route path='/login' element={<LoginPage/>} />
                      <Route path='/store' element={<StorePage/>} />
                      <Route path='/' element={<HomePage/>} />
                      <Route path='/inventory' element={<Inventory/>}/>
                  </Routes>
              </div>
          </BrowserRouter>
      </>

  )
}

export default App
