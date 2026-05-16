// Guia de edição estruturado como dados (parseado manualmente do MD original).
// Renderizado em componentes — sem markdown renderer genérico.

export const universalParameters = [
  { name: 'Algorithm',   display: 'ALG', range: '01–36',    desc: 'Seleciona o tipo de síntese (motor DSP).' },
  { name: 'Pitch Head',  display: 'PtH', range: '-50 a +50', desc: 'Afinação do head em semitoms.' },
  { name: 'Pitch Rim',   display: 'Ptr', range: '-50 a +50', desc: 'Afinação do rim em semitoms.' },
  { name: 'Decay Head',  display: 'dcH', range: '0–100',    desc: 'Quanto tempo o som do head sustenta.' },
  { name: 'Decay Rim',   display: 'dcr', range: '0–100',    desc: 'Quanto tempo o som do rim sustenta.' },
  { name: 'Level Head',  display: 'LvH', range: '0–100',    desc: 'Volume do head.' },
  { name: 'Level Rim',   display: 'Lvr', range: '0–100',    desc: 'Volume do rim.' },
  { name: 'Reverb',      display: 'rEv', range: '0–100',    desc: 'Quantidade de reverberação.' },
  { name: 'Delay',       display: 'dLy', range: '0–100',    desc: 'Quantidade de delay (tempo fixo, não BPM).' },
  { name: 'Pressure',    display: 'PrS', range: '0–100',    desc: 'Sensibilidade do sensor de pressão.', tip: 'Em presets como Talk Drum (P.13) e Berimbau (P.47), valores altos liberam expressão drástica.' },
  { name: 'Curve',       display: 'CrV', range: '0–100',    desc: 'Resposta à velocidade (dinâmica).' },
];

export const algorithmSpecificExamples = [
  {
    name: 'Conga (Algoritmo 27 — Double-size)',
    params: [
      { display: 'tnH', desc: 'Tensão da pele (afinação por tensão).' },
      { display: 'mtH', desc: 'Material da pele (skin, metal, wood…).' },
      { display: 'dmH', desc: 'Amortecimento (muffling).' },
    ],
  },
  {
    name: 'Tabla (Algoritmo 14)',
    params: [
      { display: 'tnH', desc: 'Tensão / afinação da tabla.' },
      { display: 'syH', desc: 'Quantidade do "syahi" (pasta preta central).' },
    ],
  },
  {
    name: 'Talk Drum (Algoritmo 17)',
    params: [
      { display: 'PrS', desc: 'Crítico: controla a quantidade de variação por pressão.' },
    ],
  },
];

export const edit2Parameters = [
  { name: 'Head PCM Inst.',     display: 'H.I…', desc: 'Seleciona qual instrumento PCM soa no head.' },
  { name: 'Rim PCM Inst.',      display: 'r.I…', desc: 'Seleciona qual instrumento PCM soa no rim.' },
  { name: 'Head Algorithm 2',   display: 'H.…',  desc: 'Algoritmo DSP do head (quando separado).' },
  { name: 'Rim Algorithm 2',    display: 'r.…',  desc: 'Algoritmo DSP do rim.' },
  { name: 'Play Mode',          display: 'PLY',  desc: 'Como você toca (mão/baqueta/notch). Veja a tabela abaixo.' },
  { name: 'Input Sensitivity',  display: 'Sns',  desc: 'Sensibilidade geral de entrada (novo no Global Edition).' },
];

export const playModes = [
  { code: 'H-H', desc: 'Tocar com a mão em head e rim (percussão de mão tradicional).' },
  { code: 'H-S', desc: 'Head com mão, rim com baqueta (setup misto).' },
  { code: 'S-H', desc: 'Head com baqueta, rim com mão.' },
  { code: 'S-S', desc: 'Baqueta nos dois (bateria, taiko com baqueta).' },
  { code: 'S-n', desc: 'Baqueta no head, notch no rim (cajon com esfregamento).' },
];

export const globalParameters = [
  { name: 'Sensitivity',     display: 'Sns', desc: 'Sensibilidade global de todos os sensores.' },
  { name: 'AUX Mix',         display: 'AuX', desc: 'Volume da entrada AUX IN.' },
  { name: 'Sensor Height',   display: 'SHt', desc: 'Calibra a altura do sensor de pressão.' },
  { name: 'Auto Power Off',  display: 'APo', desc: 'Liga/desliga desligamento automático.' },
];

export const singleSizeAlgorithms = [
  { id: 1,  name: 'Udu',        family: 'Modelagem física',     useFor: 'Udu, sons cavernosos' },
  { id: 2,  name: 'Temple',     family: 'Síntese analógica',    useFor: 'Sons sintéticos básicos' },
  { id: 3,  name: 'WoodDrum',   family: 'Modelagem física',     useFor: 'Madeira, cajon, log drum' },
  { id: 4,  name: 'Analog',     family: 'Síntese analógica',    useFor: 'Kicks eletrônicos, sintetizados' },
  { id: 5,  name: 'Arimbao',    family: 'Corda percutida',      useFor: 'Berimbau, corda' },
  { id: 6,  name: 'Sawari-A',   family: 'Modelagem física',     useFor: 'Sons com "buzz" (sitar, sarod)' },
  { id: 7,  name: 'WindDrum',   family: 'Síntese aditiva',      useFor: 'Sons de vento, flautas' },
  { id: 8,  name: 'Triangle',   family: 'Modelagem física',     useFor: 'Triângulo, metais agudos' },
  { id: 9,  name: 'Water',      family: 'Síntese não-linear',   useFor: 'Água, fluidos, pratos' },
  { id: 10, name: 'BigHand',    family: 'Modelagem física',     useFor: 'Conga, djembe, mãos' },
  { id: 11, name: 'Steel ST',   family: 'Modelagem física',     useFor: 'Steel drum, metalofones' },
  { id: 12, name: "Mo'Daiko",   family: 'Modelagem física',     useFor: 'Taiko, grandes tambores' },
  { id: 13, name: 'Sawari-B',   family: 'Modelagem física',     useFor: 'Variante Sawari, timbre diferente' },
  { id: 14, name: 'Tabla',      family: 'Modelagem física',     useFor: 'Tabla indiana específica' },
  { id: 15, name: 'Gong1',      family: 'Síntese não-linear',   useFor: 'Gong, tam-tam, pratos grandes' },
  { id: 16, name: 'Wah Harp',   family: 'Síntese com filtro',   useFor: 'Harpa judia, wah' },
  { id: 17, name: 'TalkDrum',   family: 'Modelagem física',     useFor: 'Talking drum, sons com pressão' },
  { id: 18, name: 'Jingle',     family: 'Modelagem física',     useFor: 'Pandeiro, jingles' },
  { id: 19, name: 'Bonga',      family: 'Modelagem física',     useFor: 'Bongo, conga genérico' },
  { id: 20, name: 'Koto',       family: 'Corda percutida',      useFor: 'Koto, instrumentos de corda' },
  { id: 21, name: 'Bamboo',     family: 'Modelagem física',     useFor: 'Bambu, madeiras' },
  { id: 22, name: 'JingDrum',   family: 'Síntese mista',        useFor: 'Sons com corpo e ataque' },
  { id: 23, name: 'Don-Hya',    family: 'Modelagem física',     useFor: 'Específico japonês (don/hya)' },
  { id: 24, name: 'Mariko',     family: 'Síntese mista',        useFor: 'Sons com wah/pressão' },
  { id: 25, name: 'Upo',        family: 'Síntese aditiva',      useFor: 'Sons soprados, únicos' },
  { id: 26, name: '1812',       family: 'Síntese PCM+DSP',      useFor: 'Orquestral pesado' },
];

export const doubleSizeAlgorithms = [
  { id: 27, name: 'Conga',                    base: 'Conga / Tumbadora' },
  { id: 28, name: 'Bongo',                    base: 'Bongo (hembra + macho)' },
  { id: 29, name: 'Snare Drum 1',             base: 'Caixa estilo 1' },
  { id: 30, name: 'Snare Drum 2',             base: 'Caixa estilo 2' },
  { id: 31, name: 'Snare Drum 3',             base: 'Caixa estilo 3' },
  { id: 32, name: 'Timbales',                 base: 'Timbales + paila' },
  { id: 33, name: 'Cajon',                    base: 'Cajón' },
  { id: 34, name: 'Djembe',                   base: 'Djembe' },
  { id: 35, name: 'BassDrum + SnareDrum 1',   base: 'Bumbo + caixa split 1' },
  { id: 36, name: 'BassDrum + SnareDrum 2',   base: 'Bumbo + caixa split 2' },
];

export const recipes = [
  {
    id: 'tune-conga',
    title: 'Afinar uma Conga',
    base: 'P.19 (Conga Double-size) ou P.21 (Conga Circle)',
    steps: [
      'Entre em Edit 1 → parâmetro PtH (Pitch Head).',
      'Gire VALUE: positivos = mais agudo, negativos = mais grave.',
      'Para uma conga em Sol: comece do zero e suba até o tom desejado, tocando junto com outro instrumento.',
      'Salve em um slot User (U.00–U.99).',
    ],
    tip: 'No algoritmo Double-size, PtH afina o instrumento inteiro. tnH (tensão) simula o efeito físico de afinar a pele — mais sutil e natural.',
  },
  {
    id: 'dry-djembe',
    title: 'Djembe mais seco (menos reverb)',
    base: 'P.15 ou P.16',
    steps: [
      'Edit 1 → rEv: reduza para 0–10.',
      'Edit 1 → dcH: reduza para 30–50 (menos sustain).',
      'Edit 1 → dmH (se disponível no algoritmo): aumente para simular abafamento.',
      'Salve.',
    ],
  },
  {
    id: 'expressive-berimbau',
    title: 'Berimbau expressivo com pressão',
    base: 'P.47 (Berimbau)',
    steps: [
      'Edit 1 → PrS (Pressure): suba para 70–100.',
      'Toque a pele e simultaneamente aperte-a com a palma — a afinação sobe como no instrumento real.',
      'Edit 1 → PtH: ajuste a afinação base.',
      'Experimente trocar o rim por Caxixi (Head inst #40) para ficar mais completo.',
    ],
  },
  {
    id: 'synth-kick',
    title: 'Kick sintetizado do zero',
    base: 'qualquer preset simples',
    steps: [
      'Edit 1 → ALG: mude para algoritmo 04 (Analog).',
      'PtH: -30 a -50 (grave).',
      'dcH: 10–30 (decay curto, snap do kick).',
      'LvH: 80–100.',
      'rEv: 0 (sem reverb em kick).',
      'Edit 2 → H.I…: experimente PCM #1 (Multi Tubb Kick) ou #2 (Dance Kicks).',
      'Salve e compare com outros presets de kick.',
    ],
  },
  {
    id: 'ddl-jam',
    title: 'Som com delay rítmico (tipo DDL)',
    base: 'P.82 (DDL Mystic Jam) ou qualquer preset',
    steps: [
      'Edit 1 → dLy: suba para 60–80.',
      'O delay é tempo fixo (não sincroniza com BPM). Toque junto e ajuste dLy até bater no groove.',
      'rEv: 30–50 complementa bem.',
    ],
  },
  {
    id: 'pressure-creative',
    title: 'Sensor de pressão criativamente',
    base: 'qualquer preset com PrS sensível',
    steps: [
      'Talk Drum (P.13): aperte a pele enquanto toca — afinação sobe como talking drum real.',
      'Berimbau (P.47): pressão leve simula a cabaça encostando no corpo.',
      'Pressure Wah Drum (P.48): pressão abre um filtro — wah percussivo.',
      'Taiko & Tsuzumi (P.40): pressão muda o timbre do tsuzumi.',
    ],
    tip: 'Edit 1 → PrS controla quanto a pressão afeta o som. 0 = sem efeito. 100 = máximo.',
  },
];

export const architecture = {
  summary:
    'Cada programa é composto por dois motores em camadas: HEAD (pele central) e RIM (borda/aro). Cada motor combina um algoritmo DSP (síntese) com um instrumento PCM. Ambos passam por um mix com Reverb e Delay antes da saída de áudio.',
  diagram: [
    'HEAD (pele central)        RIM (borda/aro)',
    '┌─────────────────┐        ┌─────────────────┐',
    '│  Algoritmo DSP  │        │  Algoritmo DSP  │',
    '│         +       │        │         +       │',
    '│  Instrumento PCM│        │  Instrumento PCM│',
    '└────────┬────────┘        └────────┬────────┘',
    '         └────────────┬──────────────┘',
    '                      │',
    '                Mix + Effects',
    '              (Reverb / Delay)',
    '                      │',
    '                 Saída de Áudio',
  ].join('\n'),
  bullets: [
    'Single-size (algoritmos 01–26): head e rim são motores independentes.',
    'Double-size (algoritmos 27–36): o instrumento inteiro funciona como um único instrumento — toque no centro = grave, borda = slap/agudo. Exemplos: Conga (P.19), Djembe (P.15), Cajon (P.38).',
    'Sensor de pressão (embaixo da pele): aperte com a palma para alterar timbre/afinação em tempo real. Controlado pelo parâmetro PrS.',
  ],
};

export const navigationSteps = [
  { display: 'Selecionar', desc: 'Selecione o programa (botões 1–4 + BANK, ou gire VALUE).' },
  { display: 'BANK/MODE',  desc: 'Pressione BANK/MODE — o display mostra Ed1.' },
  { display: 'VALUE',      desc: 'Gire VALUE para navegar entre parâmetros.' },
  { display: 'PRESS VAL',  desc: 'Pressione VALUE para entrar no parâmetro e editar o valor.' },
  { display: 'EXIT',       desc: 'Pressione BANK/MODE novamente para sair.' },
];

export const editModes = [
  { display: 'Ed1', name: 'Edit 1',  desc: 'Parâmetros do algoritmo DSP (síntese).' },
  { display: 'Ed2', name: 'Edit 2',  desc: 'Seleção de PCM e configuração de sensor.' },
  { display: 'GLb', name: 'Global',  desc: 'Sensibilidade, mix AUX, altura do sensor.' },
];

export const liveModeInstructions = {
  intro: 'O Live Mode guarda 3 bancos × 4 botões = 12 sons com acesso instantâneo. Use sempre Live Mode em performance — a troca é instantânea (sem o delay de 1–3s do patch change normal).',
  steps: [
    'Selecione o programa desejado.',
    'Pressione BANK/MODE até entrar em Live Mode (LV).',
    'Segure o botão (1–4) que quer atribuir por 2 segundos.',
    'O display confirma a atribuição.',
  ],
};
