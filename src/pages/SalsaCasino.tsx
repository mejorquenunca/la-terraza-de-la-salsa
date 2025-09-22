import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, ChevronDown, ChevronUp, CheckCircle } from 'lucide-react';
import casinoImage from '../assets/casino.jpg';

const SalsaCasino = () => {
  const navigate = useNavigate();
  const [selectedLevel, setSelectedLevel] = useState('basico');
  const [expandedLesson, setExpandedLesson] = useState<string | null>(null);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  // Salsa Casino Lessons Data
  const salsaCasinoLessons = {
    'básico-1': [
      'Pasos libres 1', 'Pasos libres 2', 'Pasos libres 3', 'Giros', 'Para arriba', 
      'Dame un Cachito', 'Cachito Doble', 'Cachito Triple', 'Cachito hasta la tuya', 
      'Cachito hasta el tuyo', 'Cachito con la tuya', 'Cachito con lager', 
      'Cachito de mentira', 'Cachito complicado', 'Otro de mentira', 'Hombres abajo',
      'Vamos al centro', 'Mata la cucaracha', 'Quedó viva', 'Con los dos pies',
      'Con los dos pies y una bulla', 'Para abajo', 'Exhibela', 'Exhibela doble/triple'
    ],
    'básico-2': [
      'Espejo', 'Enchufla para arriba', 'Enchufa doble/triple', 'Dile que no',
      'Dame una', 'Dame otra', 'Dame dos', 'Enchufla y dame', 'La Prima',
      'Prima con la hermana', 'Prima con la tía', 'Vacílala', 'Vacila con ella',
      'Vacíla y dame', 'Ponle Sombrero', 'Sombrero con una', 'Torniquete',
      'Torniquete con túnel', 'New York', 'New York complicado',
      'Strike', 'Métele el Dedo'
    ],
    'básico-3': [
      'Sesenta y nueve', 'Setenta', 'Enchufa y cásate con la suegra', 'Prima con toda la familia',
      'Abrázala', 'El uno', 'El dos', 'Cadeneta', 'Evelyn al centro', 'La flor',
      'Carrusel', 'Llévala al cielo', 'Va y vén', 'Panqué / Fly, centro y rolling',
      'Ochenta y cuatro', 'Pelota 1,2,3', 'Doble play', 'Cuatro con cuatro',
      'Despréciala', 'Balsero', 'Paséala', 'Tres pulpitos', 'Croqueta', 'Una para arriba'
    ],
    'básico-4': [
      'Montaña', 'Enchufa con Raulin', 'Vacila con engaño', 'Ochenta y cuatro con escalera',
      'Setenta y uno', 'El dedo con una', 'Abanico', 'Evelyn', 'Enchufa con el trompo',
      'Exhibela hasta afuera', 'Croqueta con alarde', 'El siete', 'Coca Cola',
      'Setenta y dos', 'Montaña rusa', 'Dame una con dos', 'Setenta pa\' ti',
      'Dame dos con Cuba', 'Brazalete', 'Molinete', 'Arco'
    ],
    'intermedio-1': [
      'Por las manos y tranca', 'Besito', 'Setenta y cuatro', 'Enchufa con engaño',
      'Combo I', 'La tralla', 'Sombréala', 'Setenta y cinco', 'Dedo, guarapo y bota',
      'Dame una con Raulin', 'Enchufa arriba', 'Prima arriba', 'Exhibela con el cero',
      'Setenta y cinco con engaño', 'Siete setenta', 'Torniquete con túnel y alarde',
      'Esmeralda', 'Kentucky', 'Siete moderno', 'Dame una y no le llegues',
      'Dame una y paséala', 'Paséala arriba', 'Pásatela por el filo', 'Careo'
    ],
    'intermedio-2': [
      'Juana la cubana', 'Sombrero doble', 'Arco doble', 'Las Jimaguas',
      'Coca-Cola por detrás', 'Enchúfala y escóndela', 'Zambuca',
      'Exhibelas hasta afuera no le llegues', 'Mimi-Mimi', 'El doce (12)',
      'Dame dos tías', 'Tropicana', 'Tornillo', 'El Cun Cun', 'Vacila y florea',
      'Dedo por debajo', 'Sombrero de maní', 'Paséala y complicado', 'Ochenta y dos (82)'
    ],
    'intermedio-3': [
      'El bebé', 'Ponle sabor', 'El dedo saboreado', 'Tirabuzón', 'Arco triple',
      'Muñequito', 'Setenta y tres (73)', 'El lazo', 'Pelota loca',
      'Doble play con adorno', 'Avioneta', '70 complicado', 'Pedrito',
      'Croqueta con vuelta', 'Siete loco', 'Paseo por el parque',
      'Exhibela como yo', '75 con gancho complicado'
    ],
    'avanzado-1': [
      '84 complicado', 'La Habana', 'Titanic', 'Candado', 'Noventa (90)',
      'Para arriba invertido', 'Rubenada', 'Siete loco complicado',
      'Adalberto al centro', 'Exhibete', 'Three way stop', 'Enchufa moderno',
      'La cuadra', 'Setenta nuevo', 'Abanico complicado', 'La Jenny',
      'Vacílate', '70 por las manos', 'Molinete complicado', 'Casino en línea (1era parte)'
    ],
    'avanzado-2': [
      'Casino en línea (2da parte)', 'Quiébrala', 'Agamenón', 'Enchufa y bikini',
      'La holandesa', 'Sombrero al centro', 'El terminal', 'Limón', 'Melao',
      'La ensambladora', 'Sabrosura', '70 doble', 'Copelia',
      'Sombrero largo por debajo', 'Micaela', 'Peluquero', 'Medio sombrero'
    ],
    'avanzado-3': [
      'Sombrero doble complicado', 'Setenta e\' Yanee', 'Azuquita', 'Bacardi Limón',
      'El kiwi', 'Cuba libre', 'La mariposa', 'Media noche', 'Enredadera',
      'Remolino', 'Fernando', 'Sabrosura', 'La Julie', 'Copelia complicado',
      'Sombrero por debajo complicado'
    ],
    'máster-1': [
      'Limón doble', '7 unisex / 7 unisex complicado', 'Leoncio', 'Sabadazo',
      'Candado complicado', 'Ajiaco 2000', 'Chequenengue', 'Cun Cun cubano',
      'Carnaval', 'Las tijeras'
    ],
    'máster-2': [
      'Sabor y caché', 'Episodio III', 'Niágara', 'Serpiente', 'La francesa',
      'Micaela complicada', 'Saoco', 'Sabor unisex', 'La presa', 'La tuya',
      'Mascarita', 'Setenta y pescao', 'Bacardi complicado'
    ],
    'máster-3': [
      'La estrella', 'Leoncio complicado', 'Bayamo en coche', 'Prismas',
      'Pedro Navaja', 'La presa complicada', 'Durdo el loco', 'Carnaval unisex'
    ]
  };

  const levels = [
    {
      id: 'basico',
      name: 'Básico',
      workshops: [
        {
          id: 'básico-1',
          name: 'Básico 1',
          objectives: 'Aprender los pasos fundamentales de la salsa casino, desarrollar el sentido del ritmo y dominar la postura correcta. Incluye pasos libres, giros básicos y las primeras figuras con cachito.'
        },
        {
          id: 'básico-2',
          name: 'Básico 2',
          objectives: 'Perfeccionar el paso básico e introducir movimientos fundamentales como enchufla, prima y torniquete. Desarrollar la coordinación en pareja y aprender los primeros giros.'
        },
        {
          id: 'básico-3',
          name: 'Básico 3',
          objectives: 'Dominar figuras intermedias como el 69, 70 y cadeneta. Aprender variaciones básicas y mejorar el timing musical con movimientos más complejos.'
        },
        {
          id: 'básico-4',
          name: 'Básico 4',
          objectives: 'Consolidar todos los pasos básicos con figuras avanzadas como montaña, abanico y molinete. Prepararse para el nivel intermedio con movimientos de transición.'
        }
      ]
    },
    {
      id: 'intermedio',
      name: 'Intermedio',
      workshops: [
        {
          id: 'intermedio-1',
          name: 'Intermedio 1',
          objectives: 'Aprender figuras de nivel intermedio con mayor complejidad técnica. Introducir combinaciones avanzadas y mejorar la fluidez en los movimientos.'
        },
        {
          id: 'intermedio-2',
          name: 'Intermedio 2',
          objectives: 'Perfeccionar técnicas intermedias con figuras como Juana la Cubana y las Jimaguas. Desarrollar la musicalidad y la capacidad de improvisación.'
        },
        {
          id: 'intermedio-3',
          name: 'Intermedio 3',
          objectives: 'Dominar figuras complejas y perfeccionar el liderazgo. Mejorar la expresión corporal y prepararse para el nivel avanzado con técnicas sofisticadas.'
        }
      ]
    },
    {
      id: 'avanzado',
      name: 'Avanzado',
      workshops: [
        {
          id: 'avanzado-1',
          name: 'Avanzado 1',
          objectives: 'Ejecutar figuras de alta complejidad y dominar la improvisación. Perfeccionar la técnica con movimientos como Titanic, Candado y Casino en línea.'
        },
        {
          id: 'avanzado-2',
          name: 'Avanzado 2',
          objectives: 'Perfeccionar movimientos acrobáticos y mejorar la sincronización. Desarrollar la creatividad con figuras avanzadas y preparar coreografías.'
        },
        {
          id: 'avanzado-3',
          name: 'Avanzado 3',
          objectives: 'Dominar todas las técnicas avanzadas y perfeccionar la performance. Prepararse para competencias y desarrollar habilidades de enseñanza.'
        }
      ]
    },
    {
      id: 'master',
      name: 'Máster',
      workshops: [
        {
          id: 'máster-1',
          name: 'Máster 1',
          objectives: 'Ejecutar técnicas de nivel profesional y dominar la enseñanza. Crear coreografías originales y perfeccionar el estilo único personal.'
        },
        {
          id: 'máster-2',
          name: 'Máster 2',
          objectives: 'Perfeccionar técnicas de competencia y desarrollar metodología de enseñanza. Crear variaciones innovadoras y dominar la improvisación total.'
        },
        {
          id: 'máster-3',
          name: 'Máster 3',
          objectives: 'Certificación como instructor y dominio total de la Salsa Casino. Capacidad de crear programas de estudio y preparación para enseñar profesionalmente.'
        }
      ]
    }
  ];

  const currentLevelData = levels.find(level => level.id === selectedLevel);

  const handleWorkshopClick = (workshopId: string) => {
    navigate(`/workshop/salsa-casino/${selectedLevel}/${workshopId}`);
  };

  const handleLessonClick = (workshopId: string, lessonIndex: number) => {
    const lessonKey = `${workshopId}-lesson-${lessonIndex}`;
    
    if (expandedLesson === lessonKey) {
      setExpandedLesson(null);
    } else {
      setExpandedLesson(lessonKey);
    }
  };

  const handleLessonComplete = (workshopId: string, lessonIndex: number) => {
    const lessonKey = `${workshopId}-lesson-${lessonIndex}`;
    if (!completedLessons.includes(lessonKey)) {
      const updatedLessons = [...completedLessons, lessonKey];
      setCompletedLessons(updatedLessons);
      
      // Auto-expand next lesson
      const currentLessons = salsaCasinoLessons[workshopId as keyof typeof salsaCasinoLessons] || [];
      const nextLessonKey = `${workshopId}-lesson-${lessonIndex + 1}`;
      if (lessonIndex + 1 < currentLessons.length) {
        setExpandedLesson(nextLessonKey);
      } else {
        setExpandedLesson(null);
      }
    }
  };

  const isLessonCompleted = (workshopId: string, lessonIndex: number) => {
    const lessonKey = `${workshopId}-lesson-${lessonIndex}`;
    return completedLessons.includes(lessonKey);
  };

  return (
    <div>
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center h-80"
        style={{ backgroundImage: `url(${casinoImage})` }}
      >
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              <span className="text-yellow-400">Salsa Casino</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Aprende la auténtica salsa cubana con nuestro sistema de niveles progresivos. 
              Desde los primeros pasos hasta convertirte en un verdadero salsero.
            </p>
          </div>
        </div>
      </div>

      {/* Page Content */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          {/* Sección de Niveles */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-black mb-8 text-center">Niveles</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {levels.map((level) => (
                <button
                  key={level.id}
                  onClick={() => setSelectedLevel(level.id)}
                  className={`px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:scale-105 ${selectedLevel === level.id
                    ? 'bg-yellow-500 text-black shadow-xl transform scale-110 border-4 border-yellow-600'
                    : 'bg-white text-gray-700 shadow-md hover:shadow-lg border-2 border-gray-200'
                  }`}
                >
                  {level.name}
                </button>
              ))}
            </div>
          </div>

          {/* Sección de Talleres */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-black mb-8 text-center">
              Talleres - Nivel {currentLevelData?.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {currentLevelData?.workshops.map((workshop) => (
                <div key={workshop.id} className="bg-white rounded-xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <h3 className="text-2xl font-bold text-black mb-4">{workshop.name}</h3>
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-yellow-600 mb-2">Objetivos a alcanzar:</h4>
                    <p className="text-gray-700 leading-relaxed">{workshop.objectives}</p>
                  </div>
                  
                  {/* Lista de Lecciones */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-black mb-4">Lecciones del Taller:</h4>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {(salsaCasinoLessons[workshop.id as keyof typeof salsaCasinoLessons] || []).map((lesson, index) => {
                        const lessonKey = `${workshop.id}-lesson-${index}`;
                        const isExpanded = expandedLesson === lessonKey;
                        const isCompleted = isLessonCompleted(workshop.id, index);
                        
                        return (
                          <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                            {/* Lesson Header */}
                            <div
                              className={`p-3 cursor-pointer transition-all duration-300 hover:bg-gray-50 ${isCompleted ? 'bg-green-50 border-green-200' : 'bg-white'}`}
                              onClick={() => handleLessonClick(workshop.id, index)}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${isCompleted ? 'bg-green-500' : 'bg-yellow-500'}`}>
                                    {isCompleted ? (
                                      <CheckCircle className="w-4 h-4 text-white" />
                                    ) : (
                                      <Play className="w-3 h-3 text-black ml-0.5" />
                                    )}
                                  </div>
                                  <span className={`text-sm font-medium ${isCompleted ? 'text-green-700' : 'text-gray-700'}`}>
                                    {lesson}
                                  </span>
                                </div>
                                {isExpanded ? (
                                  <ChevronUp className="w-4 h-4 text-gray-400" />
                                ) : (
                                  <ChevronDown className="w-4 h-4 text-gray-400" />
                                )}
                              </div>
                            </div>

                            {/* Lesson Content Panel */}
                            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                              <div className="p-4 bg-gray-50 border-t border-gray-200">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                  {/* Descripción */}
                                  <div>
                                    <h5 className="font-semibold text-gray-800 mb-2">Descripción:</h5>
                                    <p className="text-gray-600 text-sm mb-4">
                                      En esta lección aprenderás la técnica y ejecución de "{lesson}". 
                                      Presta atención a los detalles de postura, timing y coordinación con tu pareja.
                                    </p>
                                  </div>
                                  
                                  {/* Video */}
                                  <div>
                                    <h5 className="font-semibold text-gray-800 mb-2">Video de la Clase:</h5>
                                    <div className="relative h-32 bg-black rounded-lg overflow-hidden">
                                      <iframe
                                        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                                        title={`${lesson} - Video Tutorial`}
                                        className="w-full h-full"
                                        frameBorder="0"
                                        allowFullScreen
                                      />
                                    </div>
                                  </div>
                                </div>
                                
                                {/* Complete Lesson Button */}
                                <button
                                  onClick={() => handleLessonComplete(workshop.id, index)}
                                  disabled={isCompleted}
                                  className={`w-full mt-4 py-2 px-4 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${isCompleted
                                    ? 'bg-green-500 text-white cursor-not-allowed'
                                    : 'bg-yellow-500 hover:bg-yellow-600 text-black hover:shadow-lg'
                                  }`}
                                >
                                  {isCompleted ? 'Lección Completada' : 'Marcar como Completada'}
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <button
                    onClick={() => handleWorkshopClick(workshop.id)}
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    Ver Taller Completo
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Information Section */}
          <div className="bg-white rounded-xl shadow-xl p-8 text-center">
            <h2 className="text-3xl font-bold text-black mb-4">¿Por qué elegir Salsa Casino?</h2>
            <p className="text-gray-700 text-lg mb-6 max-w-4xl mx-auto">
              La Salsa Casino es el estilo más auténtico y social de la salsa. Originaria de Cuba, 
              se caracteriza por su energía contagiosa, sus movimientos circulares y la posibilidad 
              de bailar en pareja o en rueda. Es perfecta tanto para principiantes como para 
              bailarines experimentados que buscan perfeccionar su técnica.
            </p>
            <a
              href="https://wa.me/51918831356?text=Quiero%20información%20sobre%20Salsa%20Casino"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Consulta por Clases
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalsaCasino;
