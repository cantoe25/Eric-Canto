import { ProjectItem, WorkExperience, EducationItem, TechnicalValidation, VolunteerItem, LanguageItem } from '../types';

export const PERSONAL_INFO = {
  name: "Eric Fernando Canto Caballero",
  role: "Atención al Cliente y Soporte Técnico Bilingüe | Desarrollador de Software (Autodidacta)",
  bio: "Estudiante de Negocios Internacionales (USMA) con experiencia práctica en atención al cliente, soporte técnico/help-desk y resolución de problemas basada en datos. Hablante nativo de español con dominio profesional del inglés, con experiencia manejando llamadas, chat y correo electrónico en ambos idiomas. Desarrollador de software autodidacta que ha creado y desplegado aplicaciones web full-stack (React, Firebase, Node.js) e integrado herramientas de IA (Google Gemini) en productos reales — lo que me da una ventaja natural para la resolución de problemas técnicos, sistemas de CRM/tickets y el aprendizaje rápido de nuevo software. Confiable, orientado al detalle y acostumbrado a cumplir métricas de desempeño mensuales en entornos de servicio de alto volumen.",
  email: "ecantoc25@gmail.com",
  secondaryEmail: "ecantoc25@email.com",
  phone: "+507 6125-6159",
  location: "La Chorrera, Panamá",
  availability: "Disponible para roles remotos de Soporte, Help-Desk, Gestión y Desarrollo Web",
  experienceYears: "+3",
  languagesCount: "4 Idiomas",
  completedProjects: "5+",
  kpiFulfillment: "100%",
  social: {
    linkedin: "https://linkedin.com/in/eric-canto-b31056372",
    github: "https://github.com/ecantoc25",
    phoneUrl: "tel:+50761256159"
  }
};

export const LANGUAGES: LanguageItem[] = [
  { language: "Español", level: "Nativo" },
  { language: "Inglés", level: "B1 (Dominio profesional en llamadas, chat y correo)" },
  { language: "Portugués", level: "B1" },
  { language: "Guna / Dulegaya", level: "B1" }
];

export const SKILL_CATEGORIES = [
  {
    category: "ATENCIÓN AL CLIENTE & SOPORTE TÉCNICO",
    skills: [
      "Soporte por teléfono, chat y correo",
      "Sistemas de CRM y tickets",
      "Resolución de quejas",
      "Entornos de métricas de desempeño (BPO)",
      "Soporte bilingüe (ES / EN)"
    ]
  },
  {
    category: "RESOLUCIÓN TÉCNICA & DESARROLLO WEB",
    skills: [
      "Diagnóstico básico hardware/software",
      "Variables de entorno & APIs",
      "JavaScript / TypeScript",
      "React",
      "Node.js / Express",
      "Firebase (Google Cloud)",
      "HTML / CSS / Tailwind",
      "Git / GitHub & Vercel"
    ]
  },
  {
    category: "HERRAMIENTAS DE IA & ECOSISTEMA GOOGLE",
    skills: [
      "Google AI Studio / API de Gemini",
      "Google Flow (generación de video con IA)",
      "Automatización asistida por IA",
      "Integración de chatbots",
      "Google Workspace (Docs, Sheets, Drive, Gmail)",
      "Firebase (Google Cloud)"
    ]
  },
  {
    category: "DATOS, INFORMES & NEGOCIOS",
    skills: [
      "Excel (Tablas dinámicas, fórmulas financieras)",
      "Power BI & Power Query (en curso)",
      "Análisis de estados financieros",
      "Google Analytics & Vercel Analytics",
      "Negocios Internacionales"
    ]
  }
];

export const WORK_EXPERIENCES: WorkExperience[] = [
  {
    id: "exp-1",
    role: "Representante de Atención al Cliente (Remoto)",
    period: "Experiencia BPO Remoto",
    company: "Alorica",
    location: "Remoto",
    description: "Gestioné y registré datos de clientes en plataformas digitales con alta atención al detalle. Elaboré informes de desempeño y di seguimiento a KPIs mensuales en un entorno de alto volumen orientado a métricas. Cumplí consistentemente metas mensuales cuantificables trabajando de forma totalmente remota.",
    skills: ["Atención BPO", "CRM & Tickets", "Seguimiento de KPIs", "Resolución de Casos", "Gestión Remota"]
  },
  {
    id: "exp-2",
    role: "Atención al Cliente y Ventas",
    period: "Sector Retail",
    company: "Empresas del sector retail",
    location: "Panamá",
    description: "Brindé soporte al cliente personalizado y resolví casos de servicio, manteniendo registros precisos de las interacciones. Realicé seguimiento post-venta y análisis de satisfacción del cliente para fortalecer la fidelización.",
    skills: ["Atención Personalizada", "Ventas Consultivas", "Registro de Interacciones", "Post-venta", "Satisfacción"]
  },
  {
    id: "exp-3",
    role: "Administrador de Analítica Web",
    period: "Agencia Web",
    company: "Vex Design Studio",
    location: "Panamá / Remoto",
    description: "Monitoreé el tráfico y las métricas de uso del sitio web para identificar oportunidades comerciales. Interpreté datos de comportamiento de usuarios para apoyar decisiones de negocio y mejorar la tasa de conversión.",
    skills: ["Google Analytics", "Vercel Analytics", "Comportamiento de Usuario", "Métricas Web", "UX Data"]
  },
  {
    id: "exp-4",
    role: "Administración Financiera",
    period: "Gestión Comercial",
    company: "Negocio Familiar",
    location: "Panamá",
    description: "Gestioné ingresos, gastos, compras y seguimiento de rentabilidad de un pequeño negocio comercial, implementando control sistemático con hojas de cálculo y análisis financiero.",
    skills: ["Excel Financiero", "Tablas Dinámicas", "Control de Flujo de Caja", "Compras & Rentabilidad"]
  }
];

export const VOLUNTEER_ITEMS: VolunteerItem[] = [
  {
    id: "vol-1",
    role: "Voluntario de Servicio Comunitario",
    organization: "La Iglesia de Jesucristo de los Santos de los Últimos Días",
    period: "Dic. 2020 – Ene. 2023",
    description: "Seguimiento riguroso de metas diarias, semanales y mensuales. Trabajo activo en equipos interculturales, gestión de relaciones humanas con cientos de personas y mediación en resolución de problemas comunitarios."
  },
  {
    id: "vol-2",
    role: "Proyecto de Conservación del Idioma Dulegaya",
    organization: "Iniciativa Personal Propia",
    period: "2024 — En curso",
    description: "Recopilación de información del idioma originario dulegaya y desarrollo de una agrupación de datos para aprendizaje asistido con Inteligencia Artificial (Google Gemini), concebido para preservarlo para futuras generaciones."
  }
];

export const EDUCATION_ITEMS: EducationItem[] = [
  {
    id: "edu-1",
    period: "En curso (8vo trimestre)",
    degree: "Licenciatura en Negocios Internacionales",
    institution: "Universidad Santa María la Antigua (USMA)",
    highlight: "Formación en resolución de problemas basada en datos, análisis financiero y gestión comercial"
  },
  {
    id: "edu-2",
    period: "Certificación Especializada",
    degree: "Gestión de Datos en Excel",
    institution: "Capacitación Técnica",
    highlight: "Tablas dinámicas avanzadas, fórmulas financieras y análisis de datos"
  },
  {
    id: "edu-3",
    period: "Certificación de Aplicación Práctica",
    degree: "Herramientas de IA para Análisis y Automatización de Procesos",
    institution: "Google AI Studio & Ecosistema de Automatización",
    highlight: "Integración de la API de Gemini, Google Flow y flujos asistidos con IA"
  },
  {
    id: "edu-4",
    period: "En curso",
    degree: "Power Query y Fundamentos de Power BI",
    institution: "Formación Analítica",
    highlight: "Modelado relacional de datos, transformación ETL y paneles de control"
  }
];

export const TECHNICAL_VALIDATIONS: TechnicalValidation[] = [
  { title: "Atención al Cliente y Help-Desk Bilingüe (Inglés B1 / Español Nativo)", verified: true },
  { title: "Desarrollo Web Full-Stack (React, Node.js, Firebase, Vercel)", verified: true },
  { title: "Integración de IA (Google AI Studio & API de Gemini)", verified: true },
  { title: "Gestión de Datos en Excel (Tablas Dinámicas & Fórmulas Financieras)", verified: true },
  { title: "Ecosistema Google Workspace & Google Analytics", verified: true },
  { title: "Metodología orientada a KPIs y métricas de desempeño BPO", verified: true }
];

export const PROJECTS: ProjectItem[] = [
  {
    id: "proj-1",
    title: "ID Motors",
    tag: "Terminado · Vercel",
    category: "RED SOCIAL & MARKETPLACE AUTOMOTRIZ",
    year: "2024",
    description: "Red social y marketplace para la comunidad automotriz; arquitectura modular por fases, autenticación de usuarios, feed social interactivo, chatbot asistido por IA y módulo de comercio para compra/venta de vehículos y partes.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDoCNKQfRWd4HFyQQ-IaA7kVI7sm3fExSfAaenoqYo7gEyxUhdTdRZ2es_L6kFw2uHTk4pu59sTQB2Ke_opWmjCaZuQCEzk5wfDKGx0dfvHDeWMvl-0oBn1yBdswAVxVeNVm-DKRyTBii8l4dVshv--bIhyjnGN0TzYWWManIwO0QEavRBibYLt6TN-4_c84XN7PPzDLmueMljLTGsXoXLKpuFJ6iwiP-V-gj7XNgtmqknFdRraTf0",
    imageAlt: "Plataforma web automotriz con diseño minimalista, feed interactivo, catálogo de vehículos y panel de asistencia técnica con inteligencia artificial.",
    techStack: ["React", "Firebase", "Node.js", "API de Gemini", "Tailwind CSS", "Vercel"],
    metrics: "Desplegado en producción · Chatbot IA · Feed en tiempo real",
    liveUrl: "https://drexsport-performance.vercel.app/",
    repoUrl: "https://github.com/ecantoc25/id-motors",
    caseStudyDetails: {
      challenge: "Diseñar una plataforma integral para entusiastas del motor que reúna un feed social de proyectos mecánicos con un marketplace ágil y asistencia técnica inmediata a través de un chatbot con IA.",
      solution: "Construcción con arquitectura modular en React y Firebase, con gestión de perfiles autenticados, sincronización de estados y un motor conversacional conectado con la API de Google Gemini.",
      architecture: [
        "Módulo de autenticación y perfiles con Firebase Auth",
        "Feed social de publicaciones con actualización en tiempo real",
        "Chatbot automotriz asistido por la API de Google Gemini",
        "Despliegue y optimización de entrega continua mediante Vercel"
      ],
      results: [
        "Proyecto desplegado y operativo en producción (drexsport-performance.vercel.app)",
        "Interacción reactiva fluida sin demoras en dispositivos móviles y de escritorio",
        "Demostración integral de integración de IA aplicada a casos de uso de negocio"
      ]
    }
  },
  {
    id: "proj-2",
    title: "ContaFlow",
    tag: "Prototipo SaaS · IA",
    category: "SAAS FINANCIERO & OCR CON IA",
    year: "2024",
    description: "Prototipo de SaaS financiero para pequeñas empresas; incorpora reconocimiento óptico de caracteres (OCR) de facturas con IA (Gemini Vision) y generación automatizada de informes de ingresos y gastos.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCO8TTzALB7Wekb-i9YW2hjJpH13zojgCOz8m1mkkTvl5-8827U3fL8GsoLwUMUrPoJanHERnYAn1C0ybPlR66_NWDS1SqOOzUWsipjYIDA1bokuoNjsJrW2nqtKaNNwk59J7MP1LRLIji5VZRcDDkV8B0XZ6Mragfa77haUJLrIMkTVHC03hJYdDHa6O9pBAXWN3CP_eKI4a6f5vubnaeZ6TriibGyJkR-K--N5SYH8qtiDcljzjc",
    imageAlt: "Interfaz de software financiero SaaS mostrando lectura de facturas por OCR, balances de flujo de caja y gráficos de ingresos y gastos.",
    techStack: ["React", "TypeScript", "Google Gemini Vision", "Fórmulas Financieras", "Tailwind CSS"],
    metrics: "OCR inteligente · Automatización de reportes para PyMEs",
    liveUrl: "https://contaflow-chi.vercel.app/",
    repoUrl: "https://github.com/ecantoc25/contaflow-saas",
    caseStudyDetails: {
      challenge: "Facilitar el registro contable a pequeños comerciantes que pierden tiempo ingresando facturas y recibos manualmente en hojas de cálculo.",
      solution: "Pipeline inteligente que procesa fotos o capturas de comprobantes usando Gemini Vision para extraer montos, fechas y conceptos, clasificándolos automáticamente en libros contables.",
      architecture: [
        "Extracción multimodal con Google Gemini Vision",
        "Estructuración de datos en tablas normalizadas de ingresos y egresos",
        "Cálculo instantáneo de flujo de caja con fórmulas financieras",
        "Interfaz táctil rápida adaptable a smartphones y tabletas"
      ],
      results: [
        "Reducción significativa del tiempo de captura de facturas impresas",
        "Eliminación de errores manuales en transcripción de totales e impuestos",
        "Acceso web directo disponible en contaflow-chi.vercel.app"
      ]
    }
  },
  {
    id: "proj-3",
    title: "Kaizen Glory (Sushi Kaizen)",
    tag: "Terminado · Restaurante",
    category: "PLATAFORMA GASTRONÓMICA & CHECKOUT",
    year: "2024",
    description: "Plataforma web para restaurante con menú interactivo categorizado, panel de administración con base de datos en Firebase y flujo de checkout directo con despacho automático a WhatsApp.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAepg58W22Ow2_OSTd4yUXAQUwatgVP3iZW_wU5Tk1nCIhWbuWXmg7gx4_R3sVG9BW_PixfXvQ23x_oy92lB_cMFe0QlZ8EI0sxsN9yZVjKYDBaLC5nyBjtCzLUc3msVsvm-qPG9uQJwh4eqxcqcuUVm1_nnCFETs5JY1i5ZmSVxLkeFedn9nMomCEo9kta5LAYZw1v9v5raFvMU07EK5GAj7oGiSlpYU2FYe9CAy16LxiymHIpTtE",
    imageAlt: "Aplicación de restaurante con catálogo de platillos de sushi, carrito de compras dinámico y botón de checkout para WhatsApp.",
    techStack: ["React", "Firebase Realtime DB", "WhatsApp Checkout", "Tailwind CSS", "Vercel"],
    metrics: "Cero comisiones intermediarias · Checkout en 1 clic",
    liveUrl: "https://sushi-kaizen.vercel.app/",
    repoUrl: "https://github.com/ecantoc25/kaizen-glory",
    caseStudyDetails: {
      challenge: "Evitar que el negocio dependa de aplicaciones de delivery de terceros que cobran entre 20% y 30% de comisión por cada orden de sushi.",
      solution: "Creación de un catálogo digital fluido con carrito de compras sincronizado en Firebase que envía la orden lista y con desglose de precio directo al WhatsApp del restaurante.",
      architecture: [
        "Catálogo web responsivo con filtrado rápido por categorías de menú",
        "Base de datos Firebase para actualización de platos y disponibilidad",
        "Generador de payload estructurado para API de WhatsApp",
        "Panel de administración sencillo para gestión de pedidos"
      ],
      results: [
        "Ahorro del 100% de comisiones por pedidos directos de clientes",
        "Proceso de compra en menos de 45 segundos para el comensal",
        "Enlace de producción 100% activo en sushi-kaizen.vercel.app"
      ]
    }
  },
  {
    id: "proj-4",
    title: "Proyecto Conservación Dulegaya & Vex Studio",
    tag: "Cultural & IA",
    category: "PRESERVACIÓN LINGÜÍSTICA & ESTUDIO DIGITAL",
    year: "2024",
    description: "Iniciativa personal para la preservación del idioma originario dulegaya mediante recopilación lingüística y desarrollo de una agrupación de datos para aprendizaje asistido con Inteligencia Artificial; junto con la web de agencia de Vex Design Studio.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAAR-WC8tHOKp0BjN7qnYmSmX9RE94HjHMS4yt9IzMxk_0uZtijywlnFQRpwi7W2JId4ats8paHmPZ_3C76M4n3NF4lY68eA5LhQXcXyc5kUIITDeSBBB-x_98jh9dFAA78O6wxLXdkAwG0WSJrmK2NQ_M4mYyhu9wUmOC0BCShkVVV0LaXF6Zr7HaZqH9M-qoPSwpH-z5ORPJkDzyh0J853t0g-4t06ZDr5COEqvJeEMhVL_lhBJM",
    imageAlt: "Plataforma de preservación cultural y lingüística asistida por IA para el idioma originario dulegaya, con catálogo léxico y recursos interactivos.",
    techStack: ["React", "TypeScript", "Google Gemini API", "Tailwind CSS", "Vercel"],
    metrics: "Impacto cultural · Preservación patrimonial con IA",
    liveUrl: "https://dulegaya.vercel.app/",
    repoUrl: "https://github.com/ecantoc25/dulegaya-preservation",
    caseStudyDetails: {
      challenge: "Proteger el idioma ancestral dulegaya del riesgo de desuso frente a las nuevas generaciones, facilitando herramientas digitales accesibles para su consulta y práctica.",
      solution: "Estructuración de un repositorio léxico digital conectado con la API de Google Gemini para responder consultas contextuales y fomentar el aprendizaje activo del idioma.",
      architecture: [
        "Corpus léxico y gramatical organizado digitalmente",
        "Asistente interactivo con IA para consultas y frases comunes",
        "Diseño accesible y liviano optimizado para bajo consumo de datos",
        "Publicación abierta en la web con Vercel"
      ],
      results: [
        "Puesta en marcha de una plataforma pionera en conservación de lenguas nativas",
        "Despliegue operativo y accesible desde cualquier navegador (dulegaya.vercel.app)",
        "Compromiso directo de impacto social y orgullo de identidad cultural"
      ]
    }
  }
];
