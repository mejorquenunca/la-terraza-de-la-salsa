import React from 'react';

const Students = () => {
  const studentImages = [
    'https://images.pexels.com/photos/3662667/pexels-photo-3662667.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    'https://images.pexels.com/photos/3738673/pexels-photo-3738673.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    'https://images.pexels.com/photos/3662845/pexels-photo-3662845.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    'https://images.pexels.com/photos/4473796/pexels-photo-4473796.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    'https://images.pexels.com/photos/3662849/pexels-photo-3662849.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    'https://images.pexels.com/photos/2253844/pexels-photo-2253844.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    'https://images.pexels.com/photos/1405819/pexels-photo-1405819.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    'https://images.pexels.com/photos/3662848/pexels-photo-3662848.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    'https://images.pexels.com/photos/3586966/pexels-photo-3586966.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    'https://images.pexels.com/photos/2253844/pexels-photo-2253844.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    'https://images.pexels.com/photos/3662634/pexels-photo-3662634.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    'https://images.pexels.com/photos/3738694/pexels-photo-3738694.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
  ];

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Nuestros <span className="text-yellow-500">Alumnos</span>
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Conoce a nuestra increíble comunidad de bailarines. Cada foto cuenta una historia 
            de pasión, dedicación y el amor por el baile latino.
          </p>
        </div>

        {/* Student Gallery */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {studentImages.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <img
                src={image}
                alt={`Student ${index + 1}`}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-sm font-medium">Alumno #{index + 1}</p>
                <p className="text-xs text-gray-300">La Terraza de la Salsa</p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-xl shadow-xl p-8 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-black mb-4">¡Sé Parte de Nuestra Familia!</h2>
            <p className="text-gray-700 text-lg mb-6">
              Únete a cientos de estudiantes que ya han descubierto su pasión por el baile. 
              Tu historia podría ser la próxima en nuestra galería.
            </p>
            <a
              href="https://wa.me/51918831356?text=Quiero%20unirme%20a%20las%20clases"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Únete Ahora
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Students;