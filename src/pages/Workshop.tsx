import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Award, CheckCircle, Play, ChevronDown, ChevronUp } from 'lucide-react';
import jsPDF from 'jspdf';

const Workshop = () => {
  const { style, level, workshop } = useParams();
  const navigate = useNavigate();
  
  // El estilo de baile viene directamente de los parámetros de la URL
  const danceStyle = style || 'salsa-casino';
  const [completedWorkshops, setCompletedWorkshops] = useState<string[]>([]);
  const [downloadedCertificates, setDownloadedCertificates] = useState<string[]>([]);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [expandedLesson, setExpandedLesson] = useState<string | null>(null);

  // Workshop structure
  const workshopStructure = {
    'basico': ['básico-1', 'básico-2', 'básico-3', 'básico-4'],
    'intermedio': ['intermedio-1', 'intermedio-2', 'intermedio-3'],
    'avanzado': ['avanzado-1', 'avanzado-2', 'avanzado-3'],
    'master': ['máster-1', 'máster-2', 'máster-3'],
  };

  // Salsa Casino Lessons Data
  const salsaCasinoLessons = {
    'básico-1': [
      'Pasos libres 1', 'Pasos libres 2', 'Pasos libres 3', 'Giros', 'Para arriba', 
      'Dame un Cachito', 'Cachito Doble', 'Cachito Triple', 'Cachito hasta la tuya', 
      'Cachito hasta el tuyo', 'Cachito con la tulla', 'Cachito con lager', 
      'Cachito de mentira', 'Cachito complicado', 'Otro de mentira', 'Hombres abajo',
      'Vamos al centro', 'Mata la cucaracha', 'Quedó viva', 'Con los dos pies',
      'Con los dos pies y una bulla', 'Para abajo', 'Exhibela', 'Exhibela doble triple etc.'
    ],
    'básico-2': [
      'Espejo', 'Enchufla para arriba', 'Enchufla doble Triple etc.', 'Dile que no',
      'Dame una', 'Dame otra', 'Dame dos', 'Enchufla y dame', 'La Prima',
      'Prima con la hermana', 'Prima con la tía', 'Vacílala', 'Vacila con ella',
      'Vacíla y dame', 'Ponle Sombrero', 'Sombrero con una', 'Torniquete',
      'Torniquete con túnel', 'New York New York', 'New York complicado',
      'Strike', 'Métele el Dedo'
    ],
    'básico-3': [
      'SESENTA Y NUEVE', 'SETENTA', 'ENCHUA Y CASATE CON LA SUEGRA', 'PRIMA CON TODA LA FAMILIA',
      'ABRAZALA', 'EL UNO', 'EL DOS', 'CADENETA', 'EVELYN AL CENTRO', 'LA FLOR',
      'CARRUSEL', 'LLEVALA AL CIELO', 'VA Y VÉN', 'PANQUE / FLY, CENTRO Y ROLLING',
      'OCHENTA Y CUATRO', 'PELOTA 1,2,3', 'DOBLE PLAY', 'CUATRO CON CUATRO',
      'DESPRECIALA', 'BALSERO', 'PASEALA', 'TRES PULPITOS', 'CROQUETA', 'UNA PARA ARRIBA'
    ],
    'básico-4': [
      'MONTAÑA', 'ENCHUFALA CON RAULIN', 'VACILA CON ENGAÑO', 'OCHENTA Y CUATRO CON ESCALERA',
      'SETENTA Y UNO', 'EL DEDO CON UNA', 'ABANICO', 'EVELYN', 'ENCHUFA CON EL TROMPO',
      'EXHIBELA HASTA AFUERA', 'CROQUETA CON ALARDE', 'EL SIETE', 'COCA COLA',
      'SETENTA Y DOS', 'MONTAÑA RUSA', 'DAME UNA, CON DOS', 'SETENTA PA`TI',
      'DAME DOS CON CUBA', 'BRAZALETE', 'MOLINETE', 'ARCO'
    ],
    'intermedio-1': [
      'POR LAS MANOS Y TRANCA', 'BESITO', 'SETENTA Y CUATRO', 'ENCHUFA CON ENGAÑO',
      'COMBO I', 'LA TRALLA', 'SOMBREALA', 'SETENTA Y CINCO', 'DEDO,GUARAPO Y BOTA',
      'DAME UNA CON RAULIN', 'ENCHUFA ARRIBA', 'PRIMA ARRIBA', 'EXHIBELA CON EL CERO',
      'SETENTA Y CINCO CON ENGAÑO', 'SIETE SETENTA', 'TORNIQUETE CON TUNEL Y ALARDE',
      'ESMERALDA', 'KENTUCKY', 'SIETE MODERNO', 'DAME UNA Y NO LE LLEGUES',
      'DAME UNA Y PASEALA', 'PASEALA ARRIBA', 'PASATELA POR EL FILO', 'CAREO'
    ],
    'intermedio-2': [
      'JUANA LA CUBANA', 'SOMBRERO DOBLE', 'ARCO DOBLE', 'LAS JIMAGUAS',
      'COCA – COLA POR DETRÁS', 'ENCHUFALA Y ESCONDELA', 'ZAMBUCA',
      'EXHIBELAS HASTA AFUERA NO LE LLEGUES', 'MIMI-MIMI', 'EL DOCE (12)',
      'DAME DOS TIAS', 'TROPICANA', 'TORNILLO', 'EL CUN CUN', 'VACILA Y FLOREA',
      'DEDO POR DEBAJO', 'SOMBRERO DE MANI', 'PASEALA Y COMPLICATE', 'OCHENTA Y DOS(82)'
    ],
    'intermedio-3': [
      'EL BEBE', 'PONLE SABOR', 'EL DEDO SABOREADO', 'TIRABUZON', 'ARCO TRIPLE',
      'MUÑEQUITO', 'SETENTA Y TRES (73)', 'EL LASO', 'PELOTA LOCA',
      'DOBLE PLAY CON ADORNO', 'AVIONETA', '70 COMPLICADO', 'PEDRITO',
      'CROQUETA CON VUELTA', 'SIETE LOCO', 'PASEALA POR EL PARQUE',
      'EXHIBELA COMO YO', '75 CON GANCHO COMPLICADO'
    ],
    'avanzado-1': [
      '84 COMPLICADO', 'LA HABANA', 'TITANIC', 'CANDADO', 'NOVENTA (90)',
      'PARA ARRIBA INVERTIDO', 'RUBENADA', 'SIETE LOCO COMPLICADO',
      'ADALBERTO AL CENTRO', 'EXHIBETE', 'THREE WAY STOP', 'ENCHUFA MOERNO',
      'LA CUADRA', 'SETENTA NUEVO', 'ABANICO COMPLICADO', 'LA JENNY',
      'VACILATE', '70 POR LAS MANOS', 'MOLINETE COMPLICADO', 'CASINO EN LINEA (1ERA PARTE)'
    ],
    'avanzado-2': [
      'CASINO EN LINEA (2DA PARTE)', 'QUIEBRALA', 'AGAMENON', 'ENCHUFA Y BIKINI',
      'LA HOLANESA', 'SOMBRERO AL CENTRO', 'EL TERMINAL', 'LIMON', 'MELAO',
      'LA ENSAMBLADORA', 'SABROSURA', '70 DOBLE', 'COPELIA',
      'SOMBRERO LARGO POR DEBAJO', 'MICAELA', 'PELUQUERO', 'MEDIO SOMBRERO'
    ],
    'avanzado-3': [
      'SOMBRERO DOBLE COMPLICADO', 'SETENTA E YANEE', 'AZUQUITA', 'BACARI LIMON',
      'EL KIWI', 'CUBA LIBRE', 'LA MARIPOSA', 'MEDIA NOCHE', 'ENREDADERA',
      'REMOLINO', 'FERNANDO', 'SABROSURA', 'LA JULIE', 'COPELIA COMPLICADO',
      'SOMBRERO POR DEBAJO COMPLICADO'
    ],
    'máster-1': [
      'LIMON DOBLE', '7 UNISEX / 7 UNISEX COMPLICADO', 'LEONCIO', 'SABADAZO',
      'CANDADO COMPLICADO', 'AJIACO 2000', 'CHEQUENENGUE', 'CUN CUN CUBANO',
      'CARNAVAL', 'LAS TIJERAS'
    ],
    'máster-2': [
      'SABOR Y CACHE', 'EPISODIO III', 'NIAGARA', 'SERPIENTE', 'LA FRANCESA',
      'MICAELA COMPLICADA', 'SAOCO', 'SABOR UNISEX', 'LA PRESA', 'LA TUYA',
      'MASCARITA', 'SETENTA Y PESCAO', 'BACARI COMPLICADO'
    ],
    'máster-3': [
      'LA ESTRELLA', 'LEONCIO COMPLICADO', 'BAYAMO EN COCHE', 'PRISMAS',
      'PEDRO NAVAJA', 'LA PRESA COMPLICADA', 'DURDO EL LOCO', 'CARNAVAL UNISEX'
    ]
  };

  const workshopData = {
    'básico-1': {
      title: `${getDanceStyleName(danceStyle)} - Básico 1`,
      objectives: [
        `Aprender los pasos básicos del ${getDanceStyleName(danceStyle)}`,
        'Desarrollar el sentido del ritmo',
        'Dominar la postura correcta',
        'Practicar el paso básico en pareja',
      ],
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      transcript: `En esta primera clase de ${getDanceStyleName(danceStyle)}, comenzaremos con los fundamentos básicos. 
      Aprenderás la postura correcta, el paso básico y cómo llevar el ritmo. Es importante mantener una 
      postura relajada pero firme, y siempre seguir la clave de la música.`,
    },
    'básico-2': {
      title: `${getDanceStyleName(danceStyle)} - Básico 2`,
      objectives: [
        'Perfeccionar el paso básico',
        'Aprender movimientos fundamentales',
        'Introducir giros básicos',
        'Mejorar la coordinación en pareja',
      ],
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      transcript: `En el segundo nivel básico, profundizaremos en los movimientos fundamentales del ${getDanceStyleName(danceStyle)}. 
      Aprenderemos pasos que permiten la transición entre diferentes figuras. Practicaremos también los primeros giros.`,
    },
    'básico-3': {
      title: `${getDanceStyleName(danceStyle)} - Básico 3`,
      objectives: [
        'Dominar figuras intermedias',
        'Aprender variaciones básicas',
        'Introducir nuevos movimientos',
        'Mejorar el timing musical',
      ],
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      transcript: `En esta clase aprenderás figuras fundamentales que abren las puertas a movimientos más 
      complejos en ${getDanceStyleName(danceStyle)}. Aprenderás a ejecutarlas correctamente y a combinarlas con 
      otras figuras básicas para crear secuencias fluidas.`,
    },
    'básico-4': {
      title: `${getDanceStyleName(danceStyle)} - Básico 4`,
      objectives: [
        'Consolidar todos los pasos básicos',
        'Aprender figuras avanzadas del nivel básico',
        'Introducir movimientos de transición',
        'Prepararse para el nivel intermedio',
      ],
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      transcript: `En esta última clase del nivel básico de ${getDanceStyleName(danceStyle)}, consolidaremos todo lo aprendido. 
      Las figuras avanzadas requieren mayor coordinación y marcan 
      la transición hacia movimientos más avanzados.`,
    },
    // Intermedio
    'intermedio-1': {
      title: `${getDanceStyleName(danceStyle)} - Intermedio 1`,
      objectives: [
        'Aprender figuras de nivel intermedio',
        'Mejorar la fluidez en los movimientos',
        'Introducir técnicas avanzadas',
        'Desarrollar el estilo personal',
      ],
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      transcript: `Bienvenido al nivel intermedio de ${getDanceStyleName(danceStyle)}. Aquí comenzaremos a trabajar con figuras 
      más complejas y técnicas avanzadas que caracterizan este hermoso baile.`,
    },
    'intermedio-2': {
      title: `${getDanceStyleName(danceStyle)} - Intermedio 2`,
      objectives: [
        'Perfeccionar técnicas intermedias',
        'Aprender figuras avanzadas',
        'Mejorar la musicalidad',
        'Desarrollar la improvisación',
      ],
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      transcript: `En esta clase de ${getDanceStyleName(danceStyle)} intermedio, 
      perfeccionaremos la técnica y aprenderemos a improvisar con mayor libertad y expresión.`,
    },
    'intermedio-3': {
      title: `${getDanceStyleName(danceStyle)} - Intermedio 3`,
      objectives: [
        'Dominar figuras complejas',
        'Perfeccionar el liderazgo',
        'Mejorar la expresión corporal',
        'Prepararse para el nivel avanzado',
      ],
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      transcript: `En esta clase final del nivel intermedio de ${getDanceStyleName(danceStyle)}, nos enfocaremos en perfeccionar 
      el liderazgo y la expresión corporal, elementos clave para avanzar al siguiente nivel.`,
    },
    // Avanzado
    'avanzado-1': {
      title: `${getDanceStyleName(danceStyle)} - Avanzado 1`,
      objectives: [
        'Ejecutar figuras de alta complejidad',
        'Dominar la improvisación',
        'Perfeccionar la técnica',
        'Desarrollar el estilo propio',
      ],
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      transcript: `El nivel avanzado de ${getDanceStyleName(danceStyle)} requiere precisión técnica y creatividad. Trabajaremos 
      con figuras complejas que demandan coordinación perfecta entre los bailarines.`,
    },
    'avanzado-2': {
      title: `${getDanceStyleName(danceStyle)} - Avanzado 2`,
      objectives: [
        'Perfeccionar movimientos acrobáticos',
        'Mejorar la sincronización',
        'Desarrollar la creatividad',
        'Preparar coreografías',
      ],
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      transcript: `Los movimientos avanzados añaden espectacularidad al ${getDanceStyleName(danceStyle)}. Aprenderemos 
      a ejecutarlos de forma segura y elegante, siempre manteniendo la esencia del baile.`,
    },
    'avanzado-3': {
      title: `${getDanceStyleName(danceStyle)} - Avanzado 3`,
      objectives: [
        'Dominar todas las técnicas avanzadas',
        'Perfeccionar la performance',
        'Preparar para competencias',
        'Desarrollar habilidades de enseñanza',
      ],
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      transcript: `En esta clase final del nivel avanzado de ${getDanceStyleName(danceStyle)}, nos prepararemos para el nivel 
      máster, enfocándonos en la perfección técnica y la capacidad de performance.`,
    },
    // Master
    'máster-1': {
      title: `${getDanceStyleName(danceStyle)} - Máster 1`,
      objectives: [
        'Ejecutar técnicas de nivel profesional',
        'Dominar la enseñanza',
        'Crear coreografías originales',
        'Perfeccionar el estilo único',
      ],
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      transcript: `El nivel máster de ${getDanceStyleName(danceStyle)} está diseñado para formar instructores y bailarines 
      profesionales. Aquí desarrollarás tu propio estilo y aprenderás técnicas de enseñanza.`,
    },
    'máster-2': {
      title: `${getDanceStyleName(danceStyle)} - Máster 2`,
      objectives: [
        'Perfeccionar técnicas de competencia',
        'Desarrollar metodología de enseñanza',
        'Crear variaciones innovadoras',
        'Dominar la improvisación total',
      ],
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      transcript: `En este nivel de ${getDanceStyleName(danceStyle)} trabajaremos técnicas de competencia y metodologías de 
      enseñanza avanzadas. Aprenderás a crear tus propias variaciones y a improvisar 
      con total libertad.`,
    },
    'máster-3': {
      title: `${getDanceStyleName(danceStyle)} - Máster 3`,
      objectives: [
        'Certificación como instructor',
        `Dominio total del ${getDanceStyleName(danceStyle)}`,
        'Capacidad de crear programas de estudio',
        'Preparación para enseñar profesionalmente',
      ],
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      transcript: `Esta es la clase final del programa completo de ${getDanceStyleName(danceStyle)}. Al completarla, habrás 
      dominado todos los aspectos de este baile y estarás preparado para enseñar 
      y competir a nivel profesional.`,
    },
  };

  // Helper function to get dance style display name
  function getDanceStyleName(style: string): string {
    switch (style) {
      case 'salsa-casino': return 'Salsa Casino';
      case 'salsa-sensual': return 'Salsa Sensual';
      case 'bachata': return 'Bachata';
      case 'merengue': return 'Merengue';
      default: return 'Salsa Casino';
    }
  }

  // Load completed workshops and lessons from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('completedWorkshops');
    if (saved) {
      setCompletedWorkshops(JSON.parse(saved));
    }
    const savedCertificates = localStorage.getItem('downloadedCertificates');
    if (savedCertificates) {
      setDownloadedCertificates(JSON.parse(savedCertificates));
    }
    const savedLessons = localStorage.getItem('completedLessons');
    if (savedLessons) {
      setCompletedLessons(JSON.parse(savedLessons));
    }
  }, []);

  // Save completed workshops to localStorage
  const saveCompletedWorkshops = (workshops: string[]) => {
    localStorage.setItem('completedWorkshops', JSON.stringify(workshops));
    setCompletedWorkshops(workshops);
  };

  // Save downloaded certificates to localStorage
  const saveDownloadedCertificates = (certificates: string[]) => {
    localStorage.setItem('downloadedCertificates', JSON.stringify(certificates));
    setDownloadedCertificates(certificates);
  };

  // Save completed lessons to localStorage
  const saveCompletedLessons = (lessons: string[]) => {
    localStorage.setItem('completedLessons', JSON.stringify(lessons));
    setCompletedLessons(lessons);
  };

  const currentLevel = level as keyof typeof workshopStructure;
  const currentWorkshops = workshopStructure[currentLevel] || [];
  const currentWorkshopIndex = currentWorkshops.indexOf(workshop || '');
  const currentWorkshopData = workshopData[workshop as keyof typeof workshopData];

  if (!currentWorkshopData) {
    return <div>Taller no encontrado</div>;
  }

  const isFirstWorkshop = currentWorkshopIndex === 0;
  const isLastWorkshop = currentWorkshopIndex === currentWorkshops.length - 1;
  const isWorkshopCompleted = completedWorkshops.includes(workshop || '');
  
  // Check if all workshops in current level are completed (including current one if it's completed)
  const allWorkshopsInLevel = currentWorkshops.every(w => 
    completedWorkshops.includes(w) || (w === workshop && isWorkshopCompleted)
  );
  
  // Check if this is the last workshop and all others in level are completed
  const canGenerateCertificate = isLastWorkshop && 
    currentWorkshops.slice(0, -1).every(w => completedWorkshops.includes(w));
  
  // Check if certificate has been downloaded for this level
  const certificateDownloaded = downloadedCertificates.includes(level || '');
  
  // Get next level info
  const getNextLevelInfo = () => {
    switch (level) {
      case 'basico':
        return { nextLevel: 'intermedio', buttonText: 'Ir a Intermedio' };
      case 'intermedio':
        return { nextLevel: 'avanzado', buttonText: 'Ir a Avanzado' };
      case 'avanzado':
        return { nextLevel: 'master', buttonText: 'Ir a Máster' };
      default:
        return null;
    }
  };
  
  const nextLevelInfo = getNextLevelInfo();

  // Get lessons for current workshop (only for Salsa Casino)
  const getCurrentLessons = () => {
    console.log('Dance Style:', danceStyle); // Debug log
    console.log('Workshop:', workshop); // Debug log
    
    if (danceStyle === 'salsa-casino') {
      return salsaCasinoLessons[workshop as keyof typeof salsaCasinoLessons] || [];
    } else {
      // For other dance styles, generate generic lessons
      const lessonCounts = {
        'básico-1': 24, 'básico-2': 22, 'básico-3': 24, 'básico-4': 21,
        'intermedio-1': 24, 'intermedio-2': 19, 'intermedio-3': 18,
        'avanzado-1': 20, 'avanzado-2': 17, 'avanzado-3': 15,
        'máster-1': 10, 'máster-2': 13, 'máster-3': 8
      };
      const count = lessonCounts[workshop as keyof typeof lessonCounts] || 10;
      return Array.from({ length: count }, (_, i) => `Lección ${i + 1}`);
    }
  };
  
  const currentLessons = getCurrentLessons();
  console.log('Current Lessons:', currentLessons); // Debug log

  const handlePreviousWorkshop = () => {
    if (!isFirstWorkshop) {
      const prevWorkshop = currentWorkshops[currentWorkshopIndex - 1];
      const prevWorkshopSlug = prevWorkshop.toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/á/g, 'a')
        .replace(/é/g, 'e')
        .replace(/í/g, 'i')
        .replace(/ó/g, 'o')
        .replace(/ú/g, 'u');
      navigate(`/workshop/${danceStyle}/${level}/${prevWorkshopSlug}`);
    }
  };

  const handleNextWorkshop = () => {
    if (!isLastWorkshop) {
      const nextWorkshop = currentWorkshops[currentWorkshopIndex + 1];
      const nextWorkshopSlug = nextWorkshop.toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/á/g, 'a')
        .replace(/é/g, 'e')
        .replace(/í/g, 'i')
        .replace(/ó/g, 'o')
        .replace(/ú/g, 'u');
      navigate(`/workshop/${danceStyle}/${level}/${nextWorkshopSlug}`);
    }
  };

  const handleMarkCompleted = () => {
    if (!isWorkshopCompleted) {
      const updated = [...completedWorkshops, workshop || ''];
      saveCompletedWorkshops(updated);
    }
  };

  const generateCertificate = () => {
    const pdf = new jsPDF();
    
    // Certificate design
    pdf.setFillColor(255, 215, 0); // Gold background
    pdf.rect(0, 0, 210, 297, 'F');
    
    pdf.setFillColor(0, 0, 0); // Black border
    pdf.rect(10, 10, 190, 277, 'S');
    pdf.rect(15, 15, 180, 267, 'S');
    
    // Title
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(28);
    pdf.setFont('helvetica', 'bold');
    pdf.text('CERTIFICADO DE COMPLETACIÓN', 105, 60, { align: 'center' });
    
    // Academy name
    pdf.setFontSize(20);
    pdf.text('La Terraza de la Salsa', 105, 80, { align: 'center' });
    
    // Certificate text
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'normal');
    pdf.text('Certifica que', 105, 110, { align: 'center' });
    
    // Student name placeholder
    pdf.setFontSize(24);
    pdf.setFont('helvetica', 'bold');
    pdf.text('[NOMBRE DEL ESTUDIANTE]', 105, 130, { align: 'center' });
    
    // Completion text
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'normal');
    pdf.text('ha completado satisfactoriamente el nivel', 105, 150, { align: 'center' });
    
    // Level name
    pdf.setFontSize(20);
    pdf.setFont('helvetica', 'bold');
    const levelName = level?.charAt(0).toUpperCase() + level?.slice(1);
    const danceStyleDisplay = getDanceStyleName(danceStyle);
    pdf.text(`${levelName} de ${danceStyleDisplay}`, 105, 170, { align: 'center' });
    
    // Date
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'normal');
    const currentDate = new Date().toLocaleDateString('es-ES');
    pdf.text(`Fecha: ${currentDate}`, 105, 200, { align: 'center' });
    
    // Signature line
    pdf.line(70, 230, 140, 230);
    pdf.text('Director Académico', 105, 240, { align: 'center' });
    pdf.text('La Terraza de la Salsa', 105, 250, { align: 'center' });
    
    // Download the PDF
    pdf.save(`Certificado-${levelName}-${danceStyleDisplay.replace(/\s+/g, '-')}.pdf`);
    
    // Mark certificate as downloaded
    const updatedCertificates = [...downloadedCertificates, level || ''];
    saveDownloadedCertificates(updatedCertificates);
  };
  
  const handleGoToNextLevel = () => {
    if (nextLevelInfo) {
      navigate(`/${danceStyle}`);
      // Scroll to the next level section after navigation
      setTimeout(() => {
        const nextLevelElement = document.getElementById(nextLevelInfo.nextLevel);
        if (nextLevelElement) {
          nextLevelElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const handleLessonClick = (lessonIndex: number) => {
    const lessonKey = `${workshop}-lesson-${lessonIndex}`;
    
    if (expandedLesson === lessonKey) {
      setExpandedLesson(null);
    } else {
      setExpandedLesson(lessonKey);
    }
  };

  const handleLessonComplete = (lessonIndex: number) => {
    const lessonKey = `${workshop}-lesson-${lessonIndex}`;
    if (!completedLessons.includes(lessonKey)) {
      const updatedLessons = [...completedLessons, lessonKey];
      saveCompletedLessons(updatedLessons);
      
      // Auto-expand next lesson
      const nextLessonKey = `${workshop}-lesson-${lessonIndex + 1}`;
      if (lessonIndex + 1 < currentLessons.length) {
        setExpandedLesson(nextLessonKey);
      } else {
        setExpandedLesson(null);
      }
    }
  };

  const isLessonCompleted = (lessonIndex: number) => {
    const lessonKey = `${workshop}-lesson-${lessonIndex}`;
    return completedLessons.includes(lessonKey);
  };

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Workshop Title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
              {currentWorkshopData.title}
            </h1>
            <div className="w-24 h-1 bg-yellow-500 mx-auto rounded-full"></div>
            {isWorkshopCompleted && (
              <div className="mt-4 flex items-center justify-center space-x-2 text-green-600">
                <CheckCircle className="w-6 h-6" />
                <span className="font-semibold">Taller Completado</span>
              </div>
            )}
          </div>

          {/* Objectives */}
          <div className="bg-white rounded-xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-black mb-6">Objetivos de {workshop?.replace('-', ' ')}</h2>
            <ul className="space-y-3">
              {currentWorkshopData.objectives.map((objective, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-black font-bold text-sm">{index + 1}</span>
                  </div>
                  <span className="text-gray-700 text-lg">{objective}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Video and Transcript */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Video */}
            <div className="bg-white rounded-xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-black mb-4">Introducción al {workshop?.replace('-', ' ')}</h3>
              <div className="relative h-64 bg-black rounded-lg overflow-hidden">
                <iframe
                  src={currentWorkshopData.videoUrl}
                  title={currentWorkshopData.title}
                  className="w-full h-full"
                  frameBorder="0"
                  allowFullScreen
                />
              </div>
            </div>

            {/* Transcript */}
            <div className="bg-white rounded-xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-black mb-4">Objetivos de {workshop?.replace('-', ' ')}</h3>
              <div className="h-64 overflow-y-auto bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700 leading-relaxed">
                  {currentWorkshopData.transcript}
                </p>
              </div>
            </div>
          </div>

          {/* Lessons Section - Only for Salsa Casino */}
          {currentLessons.length > 0 && (
            <div className="bg-white rounded-xl shadow-xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-black mb-6">Lecciones del Taller</h2>
              <div className="space-y-4">
                {currentLessons.map((lesson, index) => {
                  const lessonKey = `${workshop}-lesson-${index}`;
                  const isExpanded = expandedLesson === lessonKey;
                  const isCompleted = isLessonCompleted(index);
                  
                  return (
                    <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                      {/* Lesson Header */}
                      <div
                        className={`p-4 cursor-pointer transition-all duration-300 hover:bg-gray-50 ${
                          isCompleted ? 'bg-green-50 border-green-200' : 'bg-white'
                        }`}
                        onClick={() => handleLessonClick(index)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              isCompleted ? 'bg-green-500' : 'bg-yellow-500'
                            }`}>
                              {isCompleted ? (
                                <CheckCircle className="w-5 h-5 text-white" />
                              ) : (
                                <Play className="w-4 h-4 text-black ml-0.5" />
                              )}
                            </div>
                            <span className={`font-medium ${
                              isCompleted ? 'text-green-700' : 'text-gray-700'
                            }`}>
                              Lección {index + 1}: {lesson}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            {isCompleted && (
                              <span className="text-sm text-green-600 font-medium">Completada</span>
                            )}
                            {isExpanded ? (
                              <ChevronUp className="w-5 h-5 text-gray-400" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-gray-400" />
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Lesson Content */}
                      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                        isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}>
                        <div className="p-6 bg-gray-50 border-t border-gray-200">
                          {/* Video Player */}
                          <div className="mb-4">
                            <div className="relative h-48 bg-black rounded-lg overflow-hidden">
                              <iframe
                                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                                title={`${lesson} - Video Tutorial`}
                                className="w-full h-full"
                                frameBorder="0"
                                allowFullScreen
                              />
                            </div>
                          </div>
                          
                          {/* Lesson Description */}
                          <p className="text-gray-600 mb-4">
                            En esta lección aprenderás la técnica y ejecución de "{lesson}". 
                            Presta atención a los detalles de postura, timing y coordinación con tu pareja.
                          </p>
                          
                          {/* Complete Lesson Button */}
                          <button
                            onClick={() => handleLessonComplete(index)}
                            disabled={isCompleted}
                            className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${
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
          )}

          {/* Navigation Buttons */}
          <div className="text-center">
            <div className="bg-white rounded-xl shadow-xl p-8">
              <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
                {/* Previous Workshop Button */}
                {!isFirstWorkshop && (
                  <button
                    onClick={handlePreviousWorkshop}
                    className="flex items-center space-x-2 bg-gray-500 hover:bg-gray-600 text-white font-bold px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg transform"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    <span>Taller Anterior</span>
                  </button>
                )}

                {/* Mark as Completed / Generate Certificate Button */}
                {isLastWorkshop && canGenerateCertificate && isWorkshopCompleted ? (
                  certificateDownloaded ? (
                    nextLevelInfo ? (
                      <button
                        onClick={handleGoToNextLevel}
                        className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white font-bold px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg transform"
                      >
                        <ChevronRight className="w-5 h-5" />
                        <span>{nextLevelInfo.buttonText}</span>
                      </button>
                    ) : (
                      <button
                        disabled
                        className="flex items-center space-x-2 bg-purple-500 text-white font-bold px-6 py-3 rounded-lg cursor-not-allowed"
                      >
                        <Award className="w-5 h-5" />
                        <span>¡Máster Completado!</span>
                      </button>
                    )
                  ) : (
                    <button
                      onClick={generateCertificate}
                      className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg transform"
                    >
                      <Award className="w-5 h-5" />
                      <span>Generar Certificado</span>
                    </button>
                  )
                ) : (
                  <button
                    onClick={handleMarkCompleted}
                    disabled={isWorkshopCompleted}
                    className={`flex items-center space-x-2 font-bold px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg transform ${
                      isWorkshopCompleted
                        ? 'bg-green-500 text-white cursor-not-allowed'
                        : 'bg-yellow-500 hover:bg-yellow-600 text-black'
                    }`}
                  >
                    <CheckCircle className="w-5 h-5" />
                    <span>
                      {isWorkshopCompleted ? 'Completado' : 'Marcar como Completado'}
                    </span>
                  </button>
                )}

                {/* Next Workshop Button */}
                {!isLastWorkshop && (
                  <button
                    onClick={handleNextWorkshop}
                    className="flex items-center space-x-2 bg-gray-500 hover:bg-gray-600 text-white font-bold px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg transform"
                  >
                    <span>Siguiente Taller</span>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Progress Indicator */}
              <div className="mt-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Progreso del Nivel</span>
                  <span className="text-sm text-gray-600">
                    {currentWorkshopIndex + 1} de {currentWorkshops.length}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${((currentWorkshopIndex + 1) / currentWorkshops.length) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workshop;