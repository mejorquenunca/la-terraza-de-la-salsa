import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import ImageGallery from '../components/ImageGallery';

const Home = () => {
  return (
    <div className="relative">
      {/* Hero Section with Gallery */}
      <section className="relative h-screen overflow-hidden">
        <ImageGallery />
        
        {/* Video and Welcome Message Overlay */}
        <div className="absolute inset-0 flex items-end justify-between p-8 bg-gradient-to-t from-black/50 to-transparent">
          {/* YouTube Video */}
          <div className="w-full md:w-80 h-48 md:h-60 bg-black rounded-lg overflow-hidden shadow-xl">
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Presentación La Terraza de la Salsa"
              className="w-full h-full"
              frameBorder="0"
              allowFullScreen
            />
          </div>

          {/* Welcome Message */}
          <div className="flex-1 ml-0 md:ml-8 mt-8 md:mt-0">
            <div className="bg-black/70 backdrop-blur-sm rounded-lg p-6 md:p-8 max-w-md ml-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                ¡Bienvenidos a 
                <span className="text-yellow-400"> La Terraza de la Salsa!</span>
              </h2>
              <p className="text-gray-200 text-lg mb-6 leading-relaxed">
                Descubre el mundo fascinante de la salsa, bachata y merengue en el corazón de Lima. 
                Únete a nuestra familia y aprende a bailar con los mejores instructores.
              </p>
              
              <a
                href="https://wa.me/51918831356?text=Hola,%20quiero%20más%20información%20sobre%20las%20clases"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-3 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Contáctanos</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Content Sections */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center bg-white rounded-lg p-6 shadow-lg">
              <h3 className="text-2xl font-bold text-black mb-3">Instructores Profesionales</h3>
              <p className="text-gray-600">Aprende con los mejores bailarines y coreógrafos de Lima</p>
            </div>
            <div className="text-center bg-white rounded-lg p-6 shadow-lg">
              <h3 className="text-2xl font-bold text-black mb-3">Ambiente Familiar</h3>
              <p className="text-gray-600">Disfruta de un espacio acogedor y lleno de buena energía</p>
            </div>
            <div className="text-center bg-white rounded-lg p-6 shadow-lg">
              <h3 className="text-2xl font-bold text-black mb-3">Horarios Flexibles</h3>
              <p className="text-gray-600">Clases todos los días de la semana para tu comodidad</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;