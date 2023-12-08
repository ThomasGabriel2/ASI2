
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Login} from './components/Login/Login.jsx'


function App() {

  return (
      <>
          <BrowserRouter>
              <div>
                  <Routes>
                      <Route path='/login' element={<Login/>} />
                  </Routes>
              </div>
          </BrowserRouter>
      </>

  )
}

export default App
