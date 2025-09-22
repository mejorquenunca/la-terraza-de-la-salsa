import React from 'react';

// Import local images
import img13DeNoviembre from '../assets/13-de-noviembre.jpg';
import imgAlcaldia from '../assets/alcaldia.jpg';
import imgJrLima from '../assets/jr-lima.jpg';
import imgJrLima1 from '../assets/jr-lima1.jpg';
import imgLaPantoja from '../assets/la-pantoja.png';
import imgLaPantoja2 from '../assets/la-pantoja2.jpg';
import imgLaTerraza from '../assets/la-terraza.png';
import imgTupac from '../assets/tupac.png';

const About = () => {
  const galleryImages = [
    img13DeNoviembre,
    imgAlcaldia,
    imgJrLima,
    imgJrLima1,
    imgLaPantoja,
    imgLaPantoja2,
    imgLaTerraza,
    imgTupac,
  ];

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Descubre Nuestra 
            <span className="text-yellow-500"> Pasión por el Baile</span>
          </h1>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            En La Terraza de la Salsa, transformamos vidas a través del ritmo y la música. 
            Somos más que una academia, somos una familia que celebra la cultura latina 
            y el arte del baile en cada paso que damos.
          </p>
        </div>

        {/* Story Section */}
        <div className="bg-white rounded-xl shadow-xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-black mb-6 text-center">Nuestra Historia</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                Fundada en 2015, La Terraza de la Salsa nació del sueño de compartir la rica 
                tradición musical latina con Lima. Nuestros fundadores, apasionados bailarines 
                con más de 15 años de experiencia, crearon este espacio para que personas 
                de todas las edades pudieran experimentar la alegría del baile.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                Hoy, con más de 500 alumnos graduados y presencia en eventos culturales 
                importantes de la ciudad, seguimos creciendo y manteniendo viva la 
                tradición del baile latino.
              </p>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-6">
              <h3 className="text-xl font-bold text-black mb-4">Nuestros Logros</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Más de 500 estudiantes graduados</li>
                <li>• 8 años formando bailarines profesionales</li>
                <li>• Participación en 50+ eventos culturales</li>
                <li>• Instructores certificados internacionalmente</li>
                <li>• Ambiente familiar y acogedor</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Photo Gallery */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <img
                src={image}
                alt={`Academy photo ${index + 1}`}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
