
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Login} from './components/Login/Login.jsx'
import {Store} from './components/Store/Store.jsx'

function App() {

  return (
      <>
          <BrowserRouter>
              <div>
                  <Routes>
                      <Route path='/login' element={<Login/>} />
                      <Route path='/store' element={<Store/>} />
                  </Routes>
              </div>
          </BrowserRouter>
      </>

  )
}

export default App
