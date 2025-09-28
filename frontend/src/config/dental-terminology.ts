// Terminologia odontológica padronizada para o sistema

export const DENTAL_TERMS = {
  // Substituições de termos médicos gerais por odontológicos
  REPLACEMENTS: {
    "médico": "dentista",
    "consulta": "atendimento",
    "exame físico": "exame clínico intraoral",
    "história da doença": "história odontológica",
    "prontuário médico": "prontuário odontológico",
    "clínica médica": "clínica odontológica",
    "atendimento médico": "atendimento odontológico",
    "procedimento médico": "procedimento odontológico",
    "emergência": "urgência odontológica",
    "medicação": "prescrição odontológica"
  },

  // Tipos de atendimento odontológico
  APPOINTMENT_TYPES: [
    "Avaliação Inicial",
    "Limpeza e Profilaxia",
    "Restauração",
    "Tratamento de Canal (Endodontia)",
    "Extração Dentária",
    "Cirurgia Oral",
    "Ortodontia - Consulta",
    "Ortodontia - Manutenção",
    "Prótese - Moldagem",
    "Prótese - Instalação",
    "Periodontia",
    "Implante Dentário",
    "Urgência Odontológica",
    "Retorno/Controle"
  ],

  // Especialidades odontológicas
  SPECIALTIES: [
    "Odontologia Geral",
    "Endodontia",
    "Periodontia",
    "Ortodontia",
    "Cirurgia Oral e Maxilofacial",
    "Prótese Dentária",
    "Implantodontia",
    "Odontopediatria",
    "Dentística Restauradora",
    "Radiologia Odontológica"
  ],

  // Procedimentos comuns
  COMMON_PROCEDURES: [
    "Anestesia local",
    "Radiografia periapical",
    "Radiografia panorâmica",
    "Profilaxia",
    "Aplicação de flúor",
    "Restauração em resina composta",
    "Restauração em amálgama",
    "Tratamento endodôntico",
    "Extração simples",
    "Extração de siso",
    "Raspagem e alisamento radicular",
    "Gengivoplastia",
    "Instalação de aparelho ortodôntico",
    "Moldagem para prótese",
    "Instalação de implante"
  ],

  // Materiais odontológicos
  MATERIALS: [
    "Resina composta",
    "Amálgama",
    "Ionômero de vidro",
    "Cimento de óxido de zinco",
    "Hidróxido de cálcio",
    "Guta-percha",
    "Cimento endodôntico",
    "Anestésico local",
    "Clorexidina",
    "Flúor gel"
  ],

  // Instrumentos odontológicos
  INSTRUMENTS: [
    "Espelho bucal",
    "Sonda exploradora",
    "Pinça clínica",
    "Escavador de dentina",
    "Broca diamantada",
    "Broca carbide",
    "Lima endodôntica",
    "Fórceps para extração",
    "Cureta periodontal",
    "Seringa carpule"
  ],

  // Diagnósticos odontológicos (CID-10)
  DIAGNOSES: [
    "K02.0 - Cárie limitada ao esmalte",
    "K02.1 - Cárie da dentina",
    "K02.2 - Cárie do cemento",
    "K04.0 - Pulpite",
    "K04.1 - Necrose da polpa",
    "K04.4 - Periodontite apical aguda",
    "K04.5 - Periodontite apical crônica",
    "K05.0 - Gengivite aguda",
    "K05.1 - Gengivite crônica",
    "K05.2 - Periodontite aguda",
    "K05.3 - Periodontite crônica",
    "K08.1 - Perda de dente",
    "K08.2 - Atrofia do rebordo alveolar"
  ],

  // Medicamentos comuns em odontologia
  MEDICATIONS: [
    "Ibuprofeno 400mg/600mg",
    "Paracetamol 500mg/750mg",
    "Amoxicilina 500mg",
    "Azitromicina 500mg",
    "Clindamicina 300mg",
    "Clorexidina 0,12%",
    "Lidocaína gel 2%",
    "Nimesulida 100mg"
  ],

  // Anestésicos odontológicos
  ANESTHETICS: [
    "Lidocaína 2% com epinefrina",
    "Lidocaína 2% sem vasoconstritor",
    "Articaína 4% com epinefrina",
    "Articaína 4% sem vasoconstritor",
    "Mepivacaína 3%",
    "Prilocaína 3% com felipressina"
  ]
};

// Função para converter termos médicos em odontológicos
export function convertToOdontological(text: string): string {
  let convertedText = text;
  
  Object.entries(DENTAL_TERMS.REPLACEMENTS).forEach(([medical, dental]) => {
    const regex = new RegExp(medical, 'gi');
    convertedText = convertedText.replace(regex, dental);
  });
  
  return convertedText;
}

// Função para validar se um termo é apropriado para odontologia
export function isOdontologicalTerm(term: string): boolean {
  const allTerms = [
    ...DENTAL_TERMS.APPOINTMENT_TYPES,
    ...DENTAL_TERMS.SPECIALTIES,
    ...DENTAL_TERMS.COMMON_PROCEDURES,
    ...DENTAL_TERMS.MATERIALS,
    ...DENTAL_TERMS.INSTRUMENTS,
    ...Object.values(DENTAL_TERMS.REPLACEMENTS)
  ];
  
  return allTerms.some(t => t.toLowerCase().includes(term.toLowerCase()));
}