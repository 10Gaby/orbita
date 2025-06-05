import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicio from './pages/Inicio';
import Carga from './componentes/Carga';
import ParticlesBackground from './componentes/Particles';
import ClickSpark from './componentes/ClickSpark';

import Menu from './pages/Menu';

import Registro from './pages/Registro';
import Login from './pages/Login';
import Historia from './pages/Historia';
import Planetas from './pages/Planetas';

import PlanetaContractus from './pages/planetas/PlanetaContractus';
import PlanetaExplotarius from './pages/planetas/PlanetaExplotarius';
import PlanetaPropietas from './pages/planetas/PlanetaPropietas';

import useScoreSync from './store/useScoreSync';

function App() {

  useScoreSync();

  return (
      <div className="App">
        <ParticlesBackground />
        <ClickSpark
          sparkColor='#fff'
          sparkSize={10}
          sparkRadius={15}
          sparkCount={8}
          duration={400}
        >
        <div className='contenedor-general'>
              <Router>
              {/* Usa solo un Router que envuelva las rutas */}
                <Routes>
                  <Route path="/" element={<Inicio />} />
                  <Route path="/carga" element={<Carga />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/registro" element={<Registro />} />

                  <Route path="/menu" element={<Menu />} />


                  <Route path="/historia" element={<Historia />} />
                  <Route path="/planetas" element={<Planetas />} />
                  <Route path="/planeta-contractus" element={<PlanetaContractus />} />
                  <Route path="/planeta-explotarius" element={<PlanetaExplotarius />} />
                  <Route path="/planeta-propietas" element={<PlanetaPropietas />} />

                </Routes>
            </Router>
        </div>
        </ClickSpark>

      </div>
  )
}

export default App;
