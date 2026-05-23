// Guia de edição estruturado como dados (parseado manualmente do MD original).
// Renderizado em componentes — sem markdown renderer genérico.

// Convenção dos códigos do display (3 caracteres, 7-segmentos):
//
//   • LETRA MAIÚSCULA no final (H) → parâmetro do HEAD (pele central).
//   • letra minúscula  no final (r) → parâmetro do RIM (borda/aro).
//   • Letras antes indicam o parâmetro (Pt=Pitch, dc=Decay, Lv=Level…).
//   • No Edit 2, o display fica "X.NN":
//       – X  = onde aplica (H=head, r=rim)
//       – I  = quando aparece antes do número, indica INSTRUMENTO PCM
//              (sem o I, o número é o ALGORITMO DSP)
//       – NN = valor atual (qual algoritmo ou qual sample)
//     Exemplos: "H.10"  = head usando algoritmo 10
//               "H.I52" = head usando instrumento PCM 52
//               "r.34"  = rim usando algoritmo 34
//               "r.I7"  = rim usando instrumento PCM 7

export const displayConvention = {
  edit1: {
    title: 'Como ler os códigos do Edit 1',
    rules: [
      { code: 'H', meaning: 'maiúsculo no fim → parâmetro do HEAD (pele central)' },
      { code: 'r', meaning: 'minúsculo no fim → parâmetro do RIM (borda)' },
      { code: 'Pt', meaning: 'prefixo "Pt" = Pitch (afinação)' },
      { code: 'dc', meaning: 'prefixo "dc" = Decay (decaimento / sustain)' },
      { code: 'Lv', meaning: 'prefixo "Lv" = Level (volume)' },
    ],
    examples: [
      ['PtH', 'Pitch Head — afinação do centro'],
      ['Ptr', 'Pitch Rim — afinação da borda'],
      ['dcH', 'Decay Head — sustain do centro'],
      ['Lvr', 'Level Rim — volume da borda'],
    ],
  },
  edit2: {
    title: 'Como ler o display no Edit 2',
    rules: [
      { code: 'H.NN', meaning: 'HEAD usando algoritmo DSP NN' },
      { code: 'H.I.NN', meaning: 'HEAD usando INSTRUMENTO PCM NN (o "I" indica PCM)' },
      { code: 'r.NN', meaning: 'RIM usando algoritmo DSP NN' },
      { code: 'r.I.NN', meaning: 'RIM usando INSTRUMENTO PCM NN' },
    ],
    note: 'Quando o "I" aparece antes do número, você está editando o sample (PCM). Sem o "I", você está editando o algoritmo. O número que segue é o valor atual.',
  },
};

export const universalParameters = [
  {
    name: 'Algorithm',
    display: 'ALG',
    letters: 'ALG = Algorithm',
    range: '01–36',
    desc: 'Escolhe o motor de síntese DSP (qual instrumento o aparelho "simula"). É a configuração mais importante — muda o caráter inteiro do som.',
    tip: '01–26 são single-size (head e rim independentes). 27–36 são double-size (o instrumento inteiro funciona como uma peça única).',
  },
  {
    name: 'Pitch Head',
    display: 'PtH',
    letters: 'Pt = Pitch (afinação) · H = Head (pele central)',
    range: '-50 a +50',
    desc: 'Afina o som do CENTRO em semitons. Negativo grave, positivo agudo. 0 = afinação original do preset.',
    tip: '+12 sobe uma oitava inteira. Para afinar uma conga em Sol: ouça com referência e suba/desça em passos de 1 ou 2.',
  },
  {
    name: 'Pitch Rim',
    display: 'Ptr',
    letters: 'Pt = Pitch · r = Rim (borda)',
    range: '-50 a +50',
    desc: 'Afinação só da BORDA. Use pra desencontrar centro e borda — ex: centro em Sol grave, borda mais aguda imitando paila.',
  },
  {
    name: 'Decay Head',
    display: 'dcH',
    letters: 'dc = Decay (decaimento) · H = Head',
    range: '0–100',
    desc: 'Quanto tempo o som do CENTRO continua soando depois da batida.',
    tip: 'Baixe (10–30) pra som seco/curto (kick, slap). Suba (70–100) pra ressonância longa (gong, ambient).',
  },
  {
    name: 'Decay Rim',
    display: 'dcr',
    letters: 'dc = Decay · r = Rim',
    range: '0–100',
    desc: 'Sustain só da BORDA.',
  },
  {
    name: 'Level Head',
    display: 'LvH',
    letters: 'Lv = Level (volume) · H = Head',
    range: '0–100',
    desc: 'Volume do som do CENTRO no mix final.',
  },
  {
    name: 'Level Rim',
    display: 'Lvr',
    letters: 'Lv = Level · r = Rim',
    range: '0–100',
    desc: 'Volume da BORDA no mix.',
    tip: 'Reduzir Lvr pra ~30 deixa o head dominar; subir pra 100 destaca o rim (cowbell, paila, click).',
  },
  {
    name: 'Reverb',
    display: 'rEv',
    letters: 'rEv = Reverb (abreviação)',
    range: '0–100',
    desc: 'Quantidade de eco/ambiente que envolve o som — sensação de "sala".',
    tip: '0–10 pra som seco (kick, slap). 30–60 pra natural. 70+ pra ambient/dramático.',
  },
  {
    name: 'Delay',
    display: 'dLy',
    letters: 'dLy = Delay (abreviação)',
    range: '0–100',
    desc: 'Repetição rítmica do som (eco). O tempo do delay é FIXO — não sincroniza com BPM.',
    tip: 'Pra alinhar com a música, toque junto e ajuste dLy até bater no groove.',
  },
  {
    name: 'Pressure',
    display: 'PrS',
    letters: 'Pr = Pressure (pressão) · S',
    range: '0–100',
    desc: 'Quanto o sensor de pressão (palma na pele) afeta o som. 0 = sensor desligado.',
    tip: 'Em presets como Talk Drum (P.13) e Berimbau (P.47), valores 70+ liberam expressividade drástica — afinação muda só de você apertar.',
  },
  {
    name: 'Curve',
    display: 'CrV',
    letters: 'Cr = Curve (curva de resposta) · V',
    range: '0–100',
    desc: 'Como a força da batida vira volume. Curva "reta" (50) = linear/previsível. Mais baixa = comprimida. Mais alta = explosiva, dramática.',
  },
];

export const algorithmSpecificExamples = [
  {
    name: 'Conga (Algoritmo 27 — Double-size)',
    params: [
      { display: 'tnH', letters: 'tn = Tension · H = Head', desc: 'Simula apertar/afrouxar a pele (afinação por tensão física). Mais sutil e natural que PtH.' },
      { display: 'mtH', letters: 'mt = Material · H = Head', desc: 'Material da pele simulada — skin (natural), metal, wood, etc.' },
      { display: 'dmH', letters: 'dm = Damping · H = Head', desc: 'Quanto a pele é abafada (muffling). Pano em cima = mais alto.' },
    ],
  },
  {
    name: 'Tabla (Algoritmo 14)',
    params: [
      { display: 'tnH', letters: 'tn = Tension · H = Head', desc: 'Afinação por tensão da tabla.' },
      { display: 'syH', letters: 'sy = Syahi · H = Head', desc: 'Quantidade da pasta preta central (syahi) — característica do timbre da tabla. Mais syahi = som mais "metálico" e ressonante.' },
    ],
  },
  {
    name: 'Talk Drum (Algoritmo 17)',
    params: [
      { display: 'PrS', letters: 'Pr = Pressure', desc: 'CRÍTICO neste algoritmo: define o range de variação da afinação por pressão. Suba pra 70+ pra ter o efeito "talking drum" forte.' },
    ],
  },
];

export const edit2Parameters = [
  {
    name: 'Head Algorithm (motor DSP do head)',
    display: 'H.NN',
    letters: 'H = Head · .NN = algoritmo atual (01–36)',
    desc: 'Quando o display mostra "H." seguido de um número (sem "I"), você está editando QUAL ALGORITMO DSP o head usa. Gire VALUE pra mudar.',
  },
  {
    name: 'Head PCM Instrument (sample do head)',
    display: 'H.I.NN',
    letters: 'H = Head · I = Instrumento PCM · NN = qual sample',
    desc: 'Quando aparece o "I" antes do número (ex: H.I4, H.I52), você escolhe qual sample PCM o head dispara. São ~100 samples.',
    tip: 'A combinação algoritmo + PCM é o que dá o "instrumento" final. Trocar só o PCM mantém o caráter do algoritmo mas muda o material/origem do som.',
  },
  {
    name: 'Rim Algorithm (motor DSP do rim)',
    display: 'r.NN',
    letters: 'r = Rim · .NN = algoritmo atual',
    desc: 'Mesma coisa que H.NN mas para o RIM. Letra minúscula sempre = rim.',
  },
  {
    name: 'Rim PCM Instrument (sample do rim)',
    display: 'r.I.NN',
    letters: 'r = Rim · I = Instrumento PCM · NN = qual sample',
    desc: 'Sample PCM da BORDA. Trocar aqui muda o "estalo" sem mexer no algoritmo.',
  },
  {
    name: 'Play Mode',
    display: 'PLY',
    letters: 'PLY = Play Mode',
    desc: 'Como você está tocando (mão, baqueta, notch). Muda completamente a resposta de EQ e dinâmica. Veja a tabela abaixo.',
    tip: 'Se um som parece "errado" ou sem punch, mude o Play Mode antes de qualquer outra coisa.',
  },
  {
    name: 'Input Sensitivity',
    display: 'Sns',
    letters: 'Sns = Sensitivity (sensibilidade)',
    desc: 'Sensibilidade geral de entrada do preset atual (novo no Global Edition). Útil pra presets que disparam sozinhos ou que precisam de toque mais leve.',
  },
];

export const playModes = [
  { code: 'H-H', desc: 'Tocar com a mão em head e rim (percussão de mão tradicional).' },
  { code: 'H-S', desc: 'Head com mão, rim com baqueta (setup misto).' },
  { code: 'S-H', desc: 'Head com baqueta, rim com mão.' },
  { code: 'S-S', desc: 'Baqueta nos dois (bateria, taiko com baqueta).' },
  { code: 'S-n', desc: 'Baqueta no head, notch no rim (cajon com esfregamento).' },
];

export const globalParameters = [
  { name: 'Sensitivity',    display: 'Sns', letters: 'Sns = Sensitivity', desc: 'Sensibilidade global de TODOS os sensores (aplica a todos os presets, não só o atual).' },
  { name: 'AUX Mix',        display: 'AuX', letters: 'AuX = AUX (entrada auxiliar)', desc: 'Volume da entrada AUX IN — som externo plugado no aparelho.' },
  { name: 'Sensor Height',  display: 'SHt', letters: 'S = Sensor · Ht = Height', desc: 'Calibra a altura/zero do sensor de pressão. Use se a pele foi trocada ou se o sensor está "fantasiando" (disparando sozinho).' },
  { name: 'Auto Power Off', display: 'APo', letters: 'A = Auto · Po = Power Off', desc: 'Desligamento automático após inatividade. Liga/desliga essa função.' },
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
