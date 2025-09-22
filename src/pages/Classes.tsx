import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ClassCard from '../components/ClassCard';

// Import local images
import casinoImage from '../assets/casino.jpg';
import sensualImage from '../assets/sensual.png';
import bachataImage from '../assets/bachata.png';
import merengueImage from '../assets/merengue.jpeg';

const Classes = () => {
  const navigate = useNavigate();
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const classes = [
    {
      id: 'salsa-casino',
      name: 'Salsa Casino',
      image: casinoImage,
      audioUrl: '/audio/salsa-casino.mp3', // Placeholder URL
      description: 'La salsa más auténtica y divertida'
    },
    {
      id: 'salsa-sensual',
      name: 'Salsa Sensual',
      image: sensualImage,
      audioUrl: '/audio/salsa-sensual.mp3', // Placeholder URL
      description: 'Elegancia y sensualidad en cada movimiento'
    },
    {
      id: 'bachata',
      name: 'Bachata',
      image: bachataImage,
      audioUrl: '/audio/bachata.mp3', // Placeholder URL
      description: 'El romance dominicano hecho baile'
    },
    {
      id: 'merengue',
      name: 'Merengue',
      image: merengueImage,
      audioUrl: '/audio/merengue.mp3', // Placeholder URL
      description: 'Energía pura y diversión garantizada'
    },
  ];

  const handleCardHover = (audioUrl: string) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    
    audioRef.current = new Audio(audioUrl);
    audioRef.current.volume = 0.3;
    audioRef.current.play().catch(() => {
      // Handle audio play error silently
    });
    setPlayingAudio(audioUrl);
  };

  const handleCardLeave = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setPlayingAudio(null);
  };

  const handleCardClick = (classId: string) => {
    navigate(`/${classId.toLowerCase().replace(' ', '-')}`);
  };

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Nuestras <span className="text-yellow-500">Clases</span>
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Explora nuestros diferentes estilos de baile y encuentra el que más te apasione. 
            Cada clase está diseñada para llevarte desde lo básico hasta un nivel profesional.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {classes.map((classItem) => (
            <ClassCard
              key={classItem.id}
              {...classItem}
              onHover={handleCardHover}
              onLeave={handleCardLeave}
              onClick={() => handleCardClick(classItem.id)}
            />
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-white rounded-xl shadow-xl p-8 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-black mb-4">¿Listo para Comenzar?</h2>
            <p className="text-gray-700 text-lg mb-6">
              Únete a nuestra comunidad de bailarines y descubre un mundo lleno de ritmo, 
              diversión y nuevas amistades.
            </p>
            <a
              href="https://wa.me/51918831356?text=Quiero%20información%20sobre%20las%20clases"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Solicita Información
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Classes;
