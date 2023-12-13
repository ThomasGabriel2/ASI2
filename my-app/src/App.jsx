import {BrowserRouter, Routes, Route, NavLink} from "react-router-dom";
import {LoginPage} from './pages/LoginPage.jsx'
import {StorePage} from "./pages/StorePage.jsx";
import {HomePage} from "./pages/HomePage.jsx";
import {InventoryPage} from "./pages/InventoryPage.jsx";
import "semantic-ui-css/semantic.min.css"
import {Navbar} from "./components/Navbar/Navbar.jsx";


function App() {

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
                  </Routes>
              </div>
          </BrowserRouter>
      </>

  )
}

export default App
