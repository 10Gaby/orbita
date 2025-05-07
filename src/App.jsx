import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicio from './pages/Inicio';
import Carga from './componentes/Carga';

function App() {

  return (
      <div className="App">
            <Router>
              {/* Usa solo un Router que envuelva las rutas */}
                <Routes>
                  <Route path="/" element={<Inicio />} />
                  <Route path="/carga" element={<Carga />} />
                </Routes>


            </Router>

          </div>
  )
}

export default App;
