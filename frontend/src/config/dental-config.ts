// Configurações específicas para clínica odontológica

export const DENTAL_PROCEDURES = [
  // Procedimentos Preventivos
  "Limpeza e Profilaxia",
  "Aplicação de Flúor",
  "Selante de Fóssulas e Fissuras",
  
  // Procedimentos Restauradores
  "Restauração em Resina Composta",
  "Restauração em Amálgama",
  "Restauração em Porcelana",
  "Coroa Protética",
  "Faceta de Porcelana",
  
  // Endodontia
  "Tratamento de Canal",
  "Retratamento Endodôntico",
  "Apicectomia",
  
  // Cirurgia Oral
  "Extração Simples",
  "Extração de Siso",
  "Cirurgia de Implante",
  "Enxerto Ósseo",
  
  // Periodontia
  "Raspagem e Alisamento Radicular",
  "Cirurgia Periodontal",
  "Gengivoplastia",
  
  // Ortodontia
  "Instalação de Aparelho Fixo",
  "Manutenção Ortodôntica",
  "Remoção de Aparelho",
  
  // Prótese
  "Prótese Total",
  "Prótese Parcial",
  "Prótese sobre Implante",
  
  // Urgências
  "Urgência - Dor de Dente",
  "Urgência - Trauma Dental",
  "Urgência - Abscesso"
];

export const TOOTH_CHART = {
  // Numeração Universal (1-32)
  permanent: [
    { number: 18, name: "3º Molar Superior Direito" },
    { number: 17, name: "2º Molar Superior Direito" },
    { number: 16, name: "1º Molar Superior Direito" },
    { number: 15, name: "2º Pré-molar Superior Direito" },
    { number: 14, name: "1º Pré-molar Superior Direito" },
    { number: 13, name: "Canino Superior Direito" },
    { number: 12, name: "Incisivo Lateral Superior Direito" },
    { number: 11, name: "Incisivo Central Superior Direito" },
    { number: 21, name: "Incisivo Central Superior Esquerdo" },
    { number: 22, name: "Incisivo Lateral Superior Esquerdo" },
    { number: 23, name: "Canino Superior Esquerdo" },
    { number: 24, name: "1º Pré-molar Superior Esquerdo" },
    { number: 25, name: "2º Pré-molar Superior Esquerdo" },
    { number: 26, name: "1º Molar Superior Esquerdo" },
    { number: 27, name: "2º Molar Superior Esquerdo" },
    { number: 28, name: "3º Molar Superior Esquerdo" },
    { number: 38, name: "3º Molar Inferior Esquerdo" },
    { number: 37, name: "2º Molar Inferior Esquerdo" },
    { number: 36, name: "1º Molar Inferior Esquerdo" },
    { number: 35, name: "2º Pré-molar Inferior Esquerdo" },
    { number: 34, name: "1º Pré-molar Inferior Esquerdo" },
    { number: 33, name: "Canino Inferior Esquerdo" },
    { number: 32, name: "Incisivo Lateral Inferior Esquerdo" },
    { number: 31, name: "Incisivo Central Inferior Esquerdo" },
    { number: 41, name: "Incisivo Central Inferior Direito" },
    { number: 42, name: "Incisivo Lateral Inferior Direito" },
    { number: 43, name: "Canino Inferior Direito" },
    { number: 44, name: "1º Pré-molar Inferior Direito" },
    { number: 45, name: "2º Pré-molar Inferior Direito" },
    { number: 46, name: "1º Molar Inferior Direito" },
    { number: 47, name: "2º Molar Inferior Direito" },
    { number: 48, name: "3º Molar Inferior Direito" }
  ]
};

export const DENTAL_DIAGNOSES = [
  // Cáries
  "K02.0 - Cárie limitada ao esmalte",
  "K02.1 - Cárie da dentina",
  "K02.2 - Cárie do cemento",
  "K02.3 - Cárie dentária estacionária",
  "K02.9 - Cárie dentária não especificada",
  
  // Doenças da polpa e tecidos periapicais
  "K04.0 - Pulpite",
  "K04.1 - Necrose da polpa",
  "K04.2 - Degeneração da polpa",
  "K04.4 - Periodontite apical aguda",
  "K04.5 - Periodontite apical crônica",
  
  // Doenças gengivais e periodontais
  "K05.0 - Gengivite aguda",
  "K05.1 - Gengivite crônica",
  "K05.2 - Periodontite aguda",
  "K05.3 - Periodontite crônica",
  
  // Outros transtornos dos dentes
  "K08.1 - Perda de dentes devida a acidente, extração ou doença periodontal local",
  "K08.2 - Atrofia do rebordo alveolar desdentado",
  "K08.3 - Raiz dentária retida"
];

export const ANESTHETICS = [
  "Lidocaína 2% com Epinefrina",
  "Lidocaína 2% sem Vasoconstritor",
  "Articaína 4% com Epinefrina",
  "Articaína 4% sem Vasoconstritor",
  "Mepivacaína 3% sem Vasoconstritor",
  "Prilocaína 3% com Felipressina"
];

export const DENTAL_MATERIALS = [
  "Resina Composta",
  "Amálgama",
  "Ionômero de Vidro",
  "Cimento de Óxido de Zinco e Eugenol",
  "Hidróxido de Cálcio",
  "Guta-percha",
  "Cimento Endodôntico"
];

export const CLINIC_SETTINGS = {
  name: "DentalCRM - Clínica Odontológica",
  specialties: [
    "Odontologia Geral",
    "Endodontia",
    "Periodontia", 
    "Ortodontia",
    "Cirurgia Oral",
    "Prótese Dentária",
    "Odontopediatria",
    "Implantodontia"
  ],
  workingHours: {
    monday: { start: "08:00", end: "18:00" },
    tuesday: { start: "08:00", end: "18:00" },
    wednesday: { start: "08:00", end: "18:00" },
    thursday: { start: "08:00", end: "18:00" },
    friday: { start: "08:00", end: "18:00" },
    saturday: { start: "08:00", end: "12:00" },
    sunday: { closed: true }
  },
  appointmentDuration: {
    evaluation: 60,
    cleaning: 45,
    restoration: 90,
    endodontics: 120,
    surgery: 180,
    orthodontics: 30
  }
};