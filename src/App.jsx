import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { Athletes } from "./pages/Athletes";
import SingleAthlete from "./pages/SingleAthlete";
import Authentication from "./pages/Authentication";
import Registration from "./pages/Registration";
import { AuthProvider, RequireAuth } from '../src/hooks/useAuth';




function App() {

  

  return (
    <div className="w-screen h-[2000px] bg-black text-white ">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            
              <Route path='/authentication' element={<Authentication />} />
              <Route path='/registration' element={<Registration />} />
              <Route path='/' element={
                 <RequireAuth>
                    <Athletes />
                  </RequireAuth>
                } 
              />
              <Route path='contact/:id' element={
                <RequireAuth>
                  <SingleAthlete />
                </RequireAuth>} 
              />
                 
          </Routes>
        </AuthProvider>      
      </BrowserRouter>
    </div>
    
  )
}

export default App
