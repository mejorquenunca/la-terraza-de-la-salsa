import React, { useState } from 'react';
import { MapPin, Mail, MessageCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent('Consulta desde la web - La Terraza de la Salsa');
    const body = encodeURIComponent(`
      Nombre: ${formData.name}
      Email: ${formData.email}
      Teléfono: ${formData.phone}
      Interés en: ${formData.interest}
      
      Mensaje enviado desde la página web.
    `);
    
    window.open(`mailto:contacto@la-terraza-de-la-salsa.com?subject=${subject}&body=${body}`);
  };

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Location Info */}
          <div>
            <h2 className="text-3xl font-bold text-black mb-8">Cómo Llegar</h2>
            
            {/* Map */}
            <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d975.4232950353071!2d-75.21934952539385!3d-12.064618986160804!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sLa%20Terraza%20De%20La%20Salsa!5e0!3m2!1ses-419!2spe!4v1757815960510!5m2!1ses-419!2spe" 
                className="w-full h-96" 
                style={{ border:0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade">
              </iframe>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <a
                href="https://maps.app.goo.gl/mSQmB57KYJ2r5h92A"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <MapPin className="w-6 h-6 text-yellow-500 flex-shrink-0" />
                <span className="text-gray-700 font-medium">Pasaje Magán 140, El Tambo, Huancayo, Junín</span>
              </a>

              <a
                href="mailto:contacto@la-terraza-de-la-salsa.com"
                className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <Mail className="w-6 h-6 text-yellow-500 flex-shrink-0" />
                <span className="text-gray-700 font-medium">contacto@la-terraza-de-la-salsa.com</span>
              </a>

              <a
                href="https://wa.me/51918831356"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <MessageCircle className="w-6 h-6 text-yellow-500 flex-shrink-0" />
                <span className="text-gray-700 font-medium">+51 918 831 356</span>
              </a>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div>
            <h2 className="text-3xl font-bold text-black mb-2">Únete a Nosotros</h2>
            <p className="text-xl text-yellow-500 mb-8">y Descubre un Mundo Fascinante</p>

            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-xl p-8">
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300"
                    placeholder="Tu nombre completo"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300"
                    placeholder="tu@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Número de Teléfono
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300"
                    placeholder="+51 999 999 999"
                  />
                </div>

                <div>
                  <label htmlFor="interest" className="block text-sm font-medium text-gray-700 mb-2">
                    Interés en
                  </label>
                  <select
                    id="interest"
                    name="interest"
                    required
                    value={formData.interest}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="Salsa Casino">Salsa Casino</option>
                    <option value="Salsa Sensual">Salsa Sensual</option>
                    <option value="Bachata">Bachata</option>
                    <option value="Merengue">Merengue</option>
                    <option value="Todas las clases">Todas las clases</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 px-6 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  Enviar Mensaje
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;