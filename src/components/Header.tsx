import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';

const Header = () => {
  const location = useLocation();

  const socialLinks = [
    { href: 'https://www.facebook.com/share/1Joy2Vib6d/', icon: 'fab fa-facebook-f', label: 'Facebook' },
    { href: 'https://www.instagram.com/la.terraza.de.la.salsa.pe', icon: 'fab fa-instagram', label: 'Instagram' },
    { href: 'https://www.youtube.com/@La_Terraza_De_La.SalsaPE', icon: 'fab fa-youtube', label: 'YouTube' },
    { href: 'https://tiktok.com/@la_terraza_de_la_salsa', icon: 'fab fa-tiktok', label: 'TikTok' },
    { href: 'https://wa.me/51918831356', icon: 'fab fa-whatsapp', label: 'WhatsApp' },
  ];

  const navigation = [
    { name: 'Inicio', href: '/' },
    { name: 'Nosotros', href: '/nosotros' },
    { name: 'Clases', href: '/clases' },
    { name: 'Alumnos', href: '/alumnos' },
    { name: 'Contacto', href: '/contacto' },
    { name: 'Ritmo Latino', href: 'https://ritmo-latino-yoh8.vercel.app/signup', external: true },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-20 backdrop-blur-sm transition-all duration-300">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img src={logo} alt="La Terraza de la Salsa Logo" className="h-12" />
            <div className="text-white">
              <h1 className="text-2xl font-bold font-['Arizonia',_cursive]">La Terraza</h1>
              <p className="text-sm text-yellow-300 font-['Lora',_serif]">de la Salsa</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            {navigation.map((item) => (
              item.external ? (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-medium transition-colors duration-300 hover:text-yellow-300 text-yellow-200"
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-lg font-medium transition-colors duration-300 hover:text-yellow-300 ${
                    location.pathname === item.href ? 'text-yellow-400' : 'text-yellow-200'
                  }`}
                >
                  {item.name}
                </Link>
              )
            ))}
          </nav>

          {/* Social Media */}
          <div className="flex space-x-2">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-black rounded-md flex items-center justify-center text-yellow-400 hover:text-yellow-300 hover:bg-gray-900 transition-all duration-300 hover:scale-110"
              >
                <i className={`${social.icon} text-lg`}></i>
              </a>
            ))}
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden mt-4 flex flex-wrap justify-center space-x-4">
          {navigation.map((item) => (
            item.external ? (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium transition-colors duration-300 hover:text-yellow-300 text-yellow-200"
              >
                {item.name}
              </a>
            ) : (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors duration-300 hover:text-yellow-300 ${
                  location.pathname === item.href ? 'text-yellow-400' : 'text-yellow-200'
                }`}
              >
                {item.name}
              </Link>
            )
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;