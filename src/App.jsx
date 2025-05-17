import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicio from './pages/Inicio';
import Carga from './componentes/Carga';
import ParticlesBackground from './componentes/Particles';

import Login from './pages/Login';
import Historia from './pages/Historia';
import Planetas from './pages/Planetas';

function App() {

  return (
      <div className="App">
        <ParticlesBackground />
            <Router>
              {/* Usa solo un Router que envuelva las rutas */}
                <Routes>
                  <Route path="/" element={<Inicio />} />
                  <Route path="/carga" element={<Carga />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/historia" element={<Historia />} />
                  <Route path="/planetas" element={<Planetas />} />
                </Routes>


            </Router>

          </div>
  )
}

export default App;
