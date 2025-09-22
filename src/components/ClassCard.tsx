import React from 'react';

interface ClassCardProps {
  id: string;
  name: string;
  image: string;
  audioUrl: string;
  description: string;
  onHover: (audioUrl: string) => void;
  onLeave: () => void;
  onClick: (id: string) => void;
}

const ClassCard: React.FC<ClassCardProps> = ({
  id,
  name,
  image,
  audioUrl,
  description,
  onHover,
  onLeave,
  onClick,
}) => {
  return (
    <div
      className="group bg-black rounded-xl overflow-hidden shadow-xl cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl animate-pulse hover:animate-none"
      onMouseEnter={() => onHover(audioUrl)}
      onMouseLeave={onLeave}
      onClick={() => onClick(id)}
      style={{
        animation: 'vibrate 0.3s ease-in-out infinite',
        animationPlayState: 'paused',
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.animationPlayState = 'running';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.animationPlayState = 'paused';
      }}
    >
      {/* Header with title */}
      <div className="bg-black p-4 text-center">
        <h3 className="text-xl font-bold text-yellow-400 group-hover:text-yellow-300 transition-colors">
          {name}
        </h3>
      </div>

      {/* Image */}
      <div className="relative overflow-hidden h-48">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Description overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <p className="text-white text-sm text-center">{description}</p>
      </div>

      <style jsx>{`
        @keyframes vibrate {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-2px); }
          75% { transform: translateX(2px); }
        }
      `}</style>
    </div>
  );
};

export default ClassCard;