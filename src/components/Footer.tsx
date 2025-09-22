import React from 'react';
import { MapPin, Mail } from 'lucide-react';
import logo from '../assets/logo.png'; // Import the logo

const Footer = () => {
  const socialLinks = [
    { href: 'https://www.facebook.com/share/1Joy2Vib6d/', icon: 'fab fa-facebook-f', label: 'Facebook' },
    { href: 'https://www.instagram.com/la.terraza.de.la.salsa.pe', icon: 'fab fa-instagram', label: 'Instagram' },
    { href: 'https://www.youtube.com/@La_Terraza_De_La.SalsaPE', icon: 'fab fa-youtube', label: 'YouTube' },
    { href: 'https://tiktok.com/@la_terraza_de_la_salsa', icon: 'fab fa-tiktok', label: 'TikTok' },
    { href: 'https://wa.me/51918831356', icon: 'fab fa-whatsapp', label: 'WhatsApp' },
  ];

  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Logo and Social Media */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img src={logo} alt="La Terraza de la Salsa Logo" className="h-12" />
              <div>
                <h3 className="text-xl font-bold">La Terraza de la Salsa</h3>
                <p className="text-yellow-300">Donde la pasión se convierte en baile</p>
              </div>
            </div>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-gray-800 rounded-md flex items-center justify-center text-yellow-400 hover:text-yellow-300 hover:bg-gray-700 transition-all duration-300"
                >
                  <i className={`${social.icon} text-sm`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info and Hours */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-yellow-300">Horarios de Atención</h4>
            <div className="space-y-2 mb-6">
              <p>Lunes a Viernes: 6:00 PM - 10:00 PM</p>
              <p>Sábados: 4:00 PM - 11:00 PM</p>
              <p>Domingos: 5:00 PM - 9:00 PM</p>
            </div>

            <div className="space-y-3">
              <a 
                href="https://maps.app.goo.gl/mSQmB57KYJ2r5h92A" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-gray-300 hover:text-yellow-300 transition-colors"
              >
                <MapPin className="w-5 h-5 text-yellow-400" />
                <span>Pasaje Magán 140, El Tambo, Huancayo, Junín</span>
              </a>
              <a 
                href="mailto:contacto@la-terraza-de-la-salsa.com"
                className="flex items-center space-x-3 text-gray-300 hover:text-yellow-300 transition-colors"
              >
                <Mail className="w-5 h-5 text-yellow-400" />
                <span>contacto@la-terraza-de-la-salsa.com</span>
              </a>
              <a 
                href="https://wa.me/51918831356"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-gray-300 hover:text-yellow-300 transition-colors"
              >
                <i className="fab fa-whatsapp w-5 h-5 text-yellow-400"></i>
                <span>+51 918 831 356</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-4 text-center text-gray-400">
          <p>&copy; 2025 La Terraza de la Salsa. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;