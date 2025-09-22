import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, ChevronDown, ChevronUp, CheckCircle } from 'lucide-react';
import sensualImage from '../assets/sensual.png';

const SalsaSensual = () => {
  const navigate = useNavigate();
  const [selectedLevel, setSelectedLevel] = useState('basico');
  const [expandedLesson, setExpandedLesson] = useState<string | null>(null);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  const levels = [
    {
      id: 'basico',
      name: 'Básico',
      workshops: [
        {
          id: 'básico-1',
          name: 'Básico 1',
          objectives: 'Aprender los fundamentos de la salsa sensual, desarrollar la conexión con la pareja y dominar los movimientos básicos. Enfoque en la fluidez y la expresión corporal.',
          lessonCount: 24
        },
        {
          id: 'básico-2',
          name: 'Básico 2',
          objectives: 'Perfeccionar la técnica básica e introducir movimientos sensuales. Desarrollar la musicalidad y aprender las primeras figuras características del estilo.',
          lessonCount: 22
        },
        {
          id: 'básico-3',
          name: 'Básico 3',
          objectives: 'Dominar figuras intermedias y mejorar la expresión corporal. Introducir movimientos más complejos y desarrollar el estilo personal.',
          lessonCount: 24
        },
        {
          id: 'básico-4',
          name: 'Básico 4',
          objectives: 'Consolidar todos los movimientos básicos con figuras avanzadas. Prepararse para el nivel intermedio con técnicas de transición elegantes.',
          lessonCount: 21
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
          objectives: 'Aprender figuras de nivel intermedio con mayor complejidad técnica. Enfoque en la sensualidad y la conexión avanzada con la pareja.',
          lessonCount: 24
        },
        {
          id: 'intermedio-2',
          name: 'Intermedio 2',
          objectives: 'Perfeccionar técnicas intermedias y desarrollar la capacidad de improvisación. Mejorar la fluidez y la expresión artística.',
          lessonCount: 19
        },
        {
          id: 'intermedio-3',
          name: 'Intermedio 3',
          objectives: 'Dominar figuras complejas y perfeccionar el liderazgo sensual. Prepararse para el nivel avanzado con técnicas sofisticadas.',
          lessonCount: 18
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
          objectives: 'Ejecutar figuras de alta complejidad y dominar la improvisación sensual. Perfeccionar la técnica con movimientos elegantes y sofisticados.',
          lessonCount: 20
        },
        {
          id: 'avanzado-2',
          name: 'Avanzado 2',
          objectives: 'Perfeccionar movimientos acrobáticos sensuales y mejorar la sincronización. Desarrollar la creatividad y preparar coreografías artísticas.',
          lessonCount: 17
        },
        {
          id: 'avanzado-3',
          name: 'Avanzado 3',
          objectives: 'Dominar todas las técnicas avanzadas y perfeccionar la performance sensual. Prepararse para competencias y desarrollar habilidades de enseñanza.',
          lessonCount: 15
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
          objectives: 'Ejecutar técnicas de nivel profesional y dominar la enseñanza de salsa sensual. Crear coreografías originales y perfeccionar el estilo único.',
          lessonCount: 10
        },
        {
          id: 'máster-2',
          name: 'Máster 2',
          objectives: 'Perfeccionar técnicas de competencia y desarrollar metodología de enseñanza. Crear variaciones innovadoras y dominar la improvisación total.',
          lessonCount: 13
        },
        {
          id: 'máster-3',
          name: 'Máster 3',
          objectives: 'Certificación como instructor y dominio total de la Salsa Sensual. Capacidad de crear programas de estudio y preparación para enseñar profesionalmente.',
          lessonCount: 8
        }
      ]
    }
  ];

  const currentLevelData = levels.find(level => level.id === selectedLevel);

  const generateLessons = (count: number) => {
    return Array.from({ length: count }, (_, i) => `Lección ${i + 1}`);
  };

  const handleWorkshopClick = (workshopId: string) => {
    navigate(`/workshop/salsa-sensual/${selectedLevel}/${workshopId}`);
  };

  const handleLessonClick = (workshopId: string, lessonIndex: number) => {
    const lessonKey = `${workshopId}-lesson-${lessonIndex}`;
    
    if (expandedLesson === lessonKey) {
      setExpandedLesson(null);
    } else {
      setExpandedLesson(lessonKey);
    }
  };

  const handleLessonComplete = (workshopId: string, lessonIndex: number, totalLessons: number) => {
    const lessonKey = `${workshopId}-lesson-${lessonIndex}`;
    if (!completedLessons.includes(lessonKey)) {
      const updatedLessons = [...completedLessons, lessonKey];
      setCompletedLessons(updatedLessons);
      
      // Auto-expand next lesson
      const nextLessonKey = `${workshopId}-lesson-${lessonIndex + 1}`;
      if (lessonIndex + 1 < totalLessons) {
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
        style={{ backgroundImage: `url(${sensualImage})` }}
      >
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              <span className="text-yellow-400">Salsa Sensual</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Descubre la elegancia y sensualidad de la salsa moderna. Un estilo que combina 
              técnica refinada con expresión corporal sofisticada para crear movimientos únicos.
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
                  className={`px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:scale-105 ${
                    selectedLevel === level.id
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
                      {generateLessons(workshop.lessonCount).map((lesson, index) => {
                        const lessonKey = `${workshop.id}-lesson-${index}`;
                        const isExpanded = expandedLesson === lessonKey;
                        const isCompleted = isLessonCompleted(workshop.id, index);
                        
                        return (
                          <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                            {/* Lesson Header */}
                            <div
                              className={`p-3 cursor-pointer transition-all duration-300 hover:bg-gray-50 ${
                                isCompleted ? 'bg-green-50 border-green-200' : 'bg-white'
                              }`}
                              onClick={() => handleLessonClick(workshop.id, index)}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                    isCompleted ? 'bg-green-500' : 'bg-yellow-500'
                                  }`}>
                                    {isCompleted ? (
                                      <CheckCircle className="w-4 h-4 text-white" />
                                    ) : (
                                      <Play className="w-3 h-3 text-black ml-0.5" />
                                    )}
                                  </div>
                                  <span className={`text-sm font-medium ${
                                    isCompleted ? 'text-green-700' : 'text-gray-700'
                                  }`}>
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
                            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                              isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                            }`}>
                              <div className="p-4 bg-gray-50 border-t border-gray-200">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                  {/* Descripción */}
                                  <div>
                                    <h5 className="font-semibold text-gray-800 mb-2">Descripción:</h5>
                                    <p className="text-gray-600 text-sm mb-4">
                                      En esta lección de Salsa Sensual aprenderás técnicas específicas de conexión, 
                                      fluidez y expresión corporal. Enfócate en la elegancia y la sensualidad del movimiento.
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
                                  onClick={() => handleLessonComplete(workshop.id, index, workshop.lessonCount)}
                                  disabled={isCompleted}
                                  className={`w-full mt-4 py-2 px-4 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${
                                    isCompleted
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
            <h2 className="text-3xl font-bold text-black mb-4">¿Por qué elegir Salsa Sensual?</h2>
            <p className="text-gray-700 text-lg mb-6 max-w-4xl mx-auto">
              La Salsa Sensual es un estilo moderno que enfatiza la conexión, la fluidez y la 
              expresión corporal. Perfecta para quienes buscan un baile elegante y sofisticado 
              que combina técnica avanzada con movimientos sensuales y expresivos.
            </p>
            <a
              href="https://wa.me/51918831356?text=Quiero%20información%20sobre%20Salsa%20Sensual"
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

export default SalsaSensual;
