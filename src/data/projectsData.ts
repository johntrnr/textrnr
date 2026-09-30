import { Project } from '../types';

export const PROJECTS: Project[] = [
  {
    id: '01-compose',
    number: '01',
    title: 'compose',
    subtitle: 'the 80-statement chromatic matrix',
    year: '2025–2026',
    medium: 'autonomous smart contract & generative svg',
    editions: 'maximum 1,526 · minimum 1',
    dimensions: '8 × 10 matrix (80 units) / variable vector',
    status: 'Active',
    contractAddress: '0x71c...b4e9',
    description:
      'a systematic study in visual consensus and combinatorial scarcity. eighty individual chromatic glyphs inhabit an orthogonal grid, where each cell represents a discrete cryptographic state. as statements are burned or consolidated, the entropy of the grid recalibrates in real-time.',
    curatorialNote:
      'drawing direct lineage from sol lewitt rule-systems and modern on-chain edition mechanics, compose establishes a syntax where pixel density and optical vibration replace manual gesture. color is treated not as ornament, but as semantic proof.',
    tags: ['generative', 'consensus', 'on-chain', 'grid'],
    palette: ['#0ea5e9', '#e11d48', '#eab308', '#10b981', '#6366f1', '#18181b'],
    specs: [
      { label: 'grid configuration', value: '8 columns × 10 rows (80 cells)' },
      { label: 'color harmonics', value: 'discrete cmyk + rgb micro-spectral' },
      { label: 'entropy coefficient', value: '0.8427 uniform dispersion' },
      { label: 'execution environment', value: 'client-side svg / evm assembly' },
      { label: 'primary collection', value: 'foundation for digital art (geneva)' }
    ]
  },
  {
    id: '02-overprint',
    number: '02',
    title: 'overprint',
    subtitle: 'isometric risographic composite',
    year: '2025',
    medium: 'multi-pass pigment emulsion & algorithmic registration',
    editions: 'edition of 40 signed impressum sheets',
    dimensions: '70 × 100 cm (b1 format) / archival cotton rag',
    status: 'Minted',
    contractAddress: '0x94b...33a1',
    description:
      'optical overprinting deconstructed through axonometric space. three transparent chromatic planes—cyan frequency, magenta cadence, and yellow registration—stack into a singular dense composite print. misregistration tolerances are mathematically determined rather than accidental.',
    curatorialNote:
      'by projecting the flat print plate into three-dimensional isometric space, textrnr makes the invisible mechanics of physical printmaking tangible. the viewer inspects the intermediate sheets before they fuse into irreversible black pigment density.',
    tags: ['print', 'isometric', 'risograph', 'layers'],
    palette: ['#00a8e8', '#ff0055', '#ffcc00', '#0a0a0a'],
    specs: [
      { label: 'print layers', value: '3 autonomous separation films' },
      { label: 'paper stock', value: 'hahnemühle photo rag 308 gsm' },
      { label: 'registration offset', value: '0.35 mm intentional drift' },
      { label: 'compression', value: 'lossless vector path decomposition' },
      { label: 'exhibited at', value: 'tokyo media arts pavilion, 2025' }
    ]
  },
  {
    id: '03-metadata',
    number: '03',
    title: 'the running ledger',
    subtitle: 'cryptographic provenance & dynamic balance',
    year: '2025',
    medium: 'live on-chain data feed & monospace typography',
    editions: 'continuous autonomous ledger',
    dimensions: 'infinite variable feed / 1:1 scale',
    status: 'Active',
    contractAddress: '0x3f2...88d7',
    description:
      'an artwork whose visual form is inextricably bound to transaction throughput. every burn event reduces the global token supply while appending an encrypted cryptographic receipt to the central canvas. the balance sheet becomes the monument.',
    curatorialNote:
      'textrnr eliminates the boundary between art market infrastructure and the art object itself. the ledger does not document the art; the ledger is the aesthetic performance.',
    tags: ['ledger', 'cryptographic', 'data'],
    palette: ['#171717', '#737373', '#e5e5e5', '#2563eb'],
    specs: [
      { label: 'transaction engine', value: 'zero-knowledge micro-receipts' },
      { label: 'latency', value: 'block-confirmed state updates' },
      { label: 'typographic anchor', value: 'monospace tabular numerals' },
      { label: 'balance burn total', value: '1,446 statements consolidated' }
    ]
  },
  {
    id: '04-chromatics',
    number: '04',
    title: 'chromatic permutations',
    subtitle: '80-tone frequency variation',
    year: '2024–2025',
    medium: 'algorithmic color field & parametric geometry',
    editions: 'series of 8 unique instances',
    dimensions: '120 × 120 cm / diasec acrylic mount',
    status: 'Private Collection',
    contractAddress: '0x1c8...90ff',
    description:
      'an exhaustive exploration of chromatic saturation limits under strict square boundary conditions. each color coordinate is derived from solar radiation readings and algorithmic noise seeds, creating a micro-vibrational surface that alters with ambient gallery lighting.',
    curatorialNote:
      'echoing josef albers interaction of color rewritten for the computational age, this work demonstrates how adjacent micro-wavelengths destabilize retinal perception.',
    tags: ['generative', 'perception', 'color'],
    palette: ['#38bdf8', '#fb7185', '#facc15', '#4ade80', '#a855f7'],
    specs: [
      { label: 'spectral resolution', value: '16-bit float chroma channels' },
      { label: 'substrate', value: 'museum diasec ultra-white' },
      { label: 'seed archive', value: 'hash #8080-solar-09' }
    ]
  },
  {
    id: '05-binary',
    number: '05',
    title: '1-bit reduction',
    subtitle: 'high-density monochrome bitfield',
    year: '2024',
    medium: 'thermal transfer & 1-bit discrete logic',
    editions: 'edition of 100 folded leporellos',
    dimensions: '29.7 × 1200 cm (continuous scroll)',
    status: 'Archived',
    contractAddress: '0x5e4...77c2',
    description:
      'the complete elimination of chromatic noise. pure black ink on pure white japanese kozo paper. every mark is governed by binary presence (1) or absence (0), forming an illegible yet mathematically coherent macro-pattern.',
    curatorialNote:
      'a deliberate retreat into absolute reduction. when color is stripped, form and rhythm speak with crystalline clarity.',
    tags: ['monochrome', '1-bit', 'binary'],
    palette: ['#000000', '#ffffff', '#a3a3a3'],
    specs: [
      { label: 'density', value: '4,096 discrete bit decisions' },
      { label: 'paper type', value: 'awagami kozo 52 gsm' },
      { label: 'binding', value: 'uncut accordion concertina fold' }
    ]
  },
  {
    id: '06-topology',
    number: '06',
    title: 'vector tension',
    subtitle: 'axonometric distortion field',
    year: '2024',
    medium: 'parametric vector plotter drawing & archival ink',
    editions: 'edition of 25 unique algorithmic plots',
    dimensions: '59.4 × 84.1 cm (a1 sheet)',
    status: 'Archived',
    contractAddress: '0x88a...21e0',
    description:
      'mechanical pen plotters tracing mathematical tension fields. hundreds of parallel hairline lines deviate around invisible gravitational singularity points, creating the illusion of undulating fabric within a rigid planar boundary.',
    curatorialNote:
      'textrnr programmed custom g-code instructions that test the physical friction between japanese tungsten carbide pens and heavyweight cotton stock.',
    tags: ['print', 'vector', 'parametric'],
    palette: ['#171717', '#d4d4d4', '#2563eb'],
    specs: [
      { label: 'plotting tool', value: 'axidraw v3/a3 custom rig' },
      { label: 'pen nib', value: 'rotring isograph 0.18 mm' },
      { label: 'plot duration', value: '4 hours 18 minutes per sheet' }
    ]
  }
];

export const ARTIST_INFO = {
  name: 'textrnr',
  alias: 'textrnr',
  role: 'systematic & computational artist',
  location: 'london · berlin · on-chain',
  email: 'textrnr@gmail.com',
  socials: [
    { name: 'x / twitter', handle: '@textrnr', url: 'https://twitter.com' },
    { name: 'on-chain archive', handle: 'textrnr.eth', url: 'https://etherscan.io' },
    { name: 'github', handle: 'textrnr-systems', url: 'https://github.com' }
  ],
  bio: `textrnr is a pseudonymous computational artist and designer working at the confluence of swiss typographic discipline, generative algorithms, and decentralized consensus systems.

through strict constraint-based frameworks, textrnr interrogates how digital scarcity, combinatorial mathematics, and mechanical print friction can generate profound aesthetic consensus. by stripping away ornamental noise in favor of stark white negative space, hairline grid matrices, and optical micro-spectral colorways, the work transforms conceptual data structures into tactile, contemplative artifacts.`,
  manifesto: [
    {
      rule: '01',
      title: 'the grid is absolute',
      description: 'the grid is not a cage; it is the prerequisite for coherence. every mark exists in strict relational harmony with its coordinate.'
    },
    {
      rule: '02',
      title: 'reduction over ornament',
      description: 'subtract every decorative element until only the irreducible structural essence remains. if a line does not serve the system, delete it.'
    },
    {
      rule: '03',
      title: 'color as semantic proof',
      description: 'color is not mood or decoration; it is frequency, state, and identity. we use discrete cmyk and chromatic wavelengths as information carriers.'
    },
    {
      rule: '04',
      title: 'the ledger is the provenance',
      description: 'the record of transaction, creation, and burning is inseparable from the aesthetic body. provenance is inscribed directly into the artwork structure.'
    }
  ],
  exhibitions: [
    {
      year: '2025',
      title: 'systematic consensus & the on-chain grid',
      venue: 'digital art pavilion',
      city: 'basel, switzerland',
      type: 'solo'
    },
    {
      year: '2025',
      title: 'overprint: friction of digital pigment',
      venue: 'ginza graphic gallery annex',
      city: 'tokyo, japan',
      type: 'group'
    },
    {
      year: '2024',
      title: '1-bit logic: the binary aesthetics of code',
      venue: 'whitechapel gallery experimental space',
      city: 'london, uk',
      type: 'group'
    },
    {
      year: '2024',
      title: 'algorithmic autonomy & the sol lewitt continuum',
      venue: 'neue moderne kunst',
      city: 'berlin, germany',
      type: 'solo'
    }
  ],
  collections: [
    'centre pompidou digital archive (acquisition study)',
    'museum of applied design, zürich (permanent print collection)',
    'the on-chain provenance trust (consensus collection)',
    'private collections in london, new york, tokyo, zürich, and singapore'
  ]
};
