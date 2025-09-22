import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Classes from './pages/Classes';
import Students from './pages/Students';
import Contact from './pages/Contact';
import SalsaCasino from './pages/SalsaCasino';
import SalsaSensual from './pages/SalsaSensual';
import Bachata from './pages/Bachata';
import Merengue from './pages/Merengue';
import Workshop from './pages/Workshop';
import Auth from './pages/Auth';

function App() {
  return (
    <Router>
      <div className="min-h-screen" style={{ backgroundColor: '#F8F6F0' }}>
        <Header />
        <main className="pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/nosotros" element={<About />} />
            <Route path="/clases" element={<Classes />} />
            <Route path="/alumnos" element={<Students />} />
            <Route path="/contacto" element={<Contact />} />
            <Route path="/salsa-casino" element={<SalsaCasino />} />
            <Route path="/salsa-sensual" element={<SalsaSensual />} />
            <Route path="/bachata" element={<Bachata />} />
            <Route path="/merengue" element={<Merengue />} />
            <Route path="/workshop/:style/:level/:workshop" element={<Workshop />} />
            
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;