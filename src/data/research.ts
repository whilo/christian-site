// Research agenda, publications, software and talks.
// Papers are grouped by the part of the agenda they serve, not by year.

export type Paper = {
  title: string;
  authors: string;
  venue: string;
  year?: number;
  url?: string;
  selected?: boolean;
  note?: string; // e.g. oral presentation, award
};

export type Software = { name: string; url: string; what: string };

export type Strand = {
  id: string;
  title: string;
  summary: string;
  papers: Paper[];
  software: Software[];
};

const gh = (name: string) => `https://github.com/replikativ/${name}`;

export const strands: Strand[] = [
  {
    id: 'structure',
    title: 'Learning structure',
    summary:
      'A model that matches the structure of its problem needs fewer parameters and less data. I work on extracting that structure from a problem description and building it into the network, for example as the attention mask of a transformer.',
    papers: [
      {
        title: 'Graphically Structured Diffusion Models',
        authors: 'C. Weilbach, W. Harvey, F. Wood',
        venue: 'ICML',
        year: 2023,
        note: 'oral, top 2.4%',
        url: 'https://arxiv.org/abs/2210.11633',
        selected: true,
      },
      {
        title: 'Structured Conditional Continuous Normalizing Flows for Efficient Amortized Inference in Graphical Models',
        authors: 'C. Weilbach, B. Beronov, F. Wood, W. Harvey',
        venue: 'AISTATS',
        year: 2020,
        url: 'https://proceedings.mlr.press/v108/weilbach20a.html',
      },
      {
        title: 'Flexible Diffusion Modeling of Long Videos',
        authors: 'W. Harvey, S. Naderiparizi, V. Masrani, C. Weilbach, F. Wood',
        venue: 'NeurIPS',
        year: 2022,
        url: 'https://arxiv.org/abs/2205.11495',
        selected: true,
      },
      {
        title: 'Trans-Dimensional Generative Modeling via Jump Diffusion Models',
        authors: 'A. Campbell, W. Harvey, C. Weilbach, V. De Bortoli, T. Rainforth, A. Doucet',
        venue: 'NeurIPS',
        year: 2023,
        url: 'https://arxiv.org/abs/2305.16261',
      },
      {
        title: 'Scaling Graphically Structured Diffusion Models',
        authors: 'C. Weilbach, W. Harvey, H. Shirzad, F. Wood',
        venue: 'ICML workshop on structured probabilistic inference and generative modeling',
        year: 2023,
      },
      {
        title: 'Inferring the Structure of Ordinary Differential Equations',
        authors: 'J. Weilbach, S. Gerwinn, C. Weilbach, M. Kandemir',
        venue: 'ICML time series workshop',
        year: 2021,
        url: 'https://arxiv.org/abs/2107.07345',
      },
      {
        title: 'PLAICraft: Large-Scale Time-Aligned Vision-Speech-Action Dataset for Embodied AI',
        authors: 'Y. He, C. Weilbach, M. E. Wojciechowska, Y. Zhang, F. Wood',
        venue: 'arXiv',
        year: 2025,
        url: 'https://arxiv.org/abs/2505.12707',
      },
    ],
    software: [
      { name: 'Raster', url: gh('raster'), what: 'numerical computing that lowers one algebra to each device' },
    ],
  },
  {
    id: 'simulation',
    title: 'Inference over forkable worlds',
    summary:
      'A simulation lets a system test a decision before making it. I work on inference methods that fork a running simulation at each random choice and weigh the forks against data, so that nothing is recomputed from the start.',
    papers: [
      {
        title: 'All-in-one Simulation-Based Inference',
        authors: 'M. Gloeckler, M. Deistler, C. Weilbach, F. Wood, J. H. Macke',
        venue: 'ICML',
        year: 2024,
        note: 'oral',
        url: 'https://arxiv.org/abs/2404.09636',
        selected: true,
      },
      {
        title: 'Daphne: Multi-Pass Compilation of Probabilistic Programs into Graphical Models and Neural Networks',
        authors: 'C. Weilbach, F. Wood',
        venue: 'TMLR',
        year: 2025,
        url: 'https://openreview.net/forum?id=OGCuDFab4b',
        selected: true,
      },
      {
        title: 'Sequential Core-Set Monte Carlo',
        authors: 'B. Beronov, C. Weilbach, F. Wood, T. Campbell',
        venue: 'UAI',
        year: 2021,
        url: 'https://proceedings.mlr.press/v161/beronov21a.html',
      },
      {
        title: 'Planning as Inference in Epidemiological Dynamics Models',
        authors: 'F. Wood, A. Warrington, S. Naderiparizi, C. Weilbach, V. Masrani, W. Harvey, et al.',
        venue: 'Frontiers in Artificial Intelligence',
        year: 2022,
        url: 'https://doi.org/10.3389/frai.2021.550603',
      },
      {
        title: 'Time-sensitive probabilistic inference for the edge',
        authors: 'C. Weilbach, A. Bieniusa',
        venue: 'technical report, arXiv',
        year: 2017,
        url: 'https://arxiv.org/abs/1710.11057',
      },
      {
        title: 'Prospective Messaging: Learning in Networks with Communication Delays',
        authors: 'R. Fayyazi, C. Weilbach, F. Wood',
        venue: 'arXiv',
        year: 2024,
        url: 'https://arxiv.org/abs/2407.05494',
      },
    ],
    software: [
      { name: 'Foerster', url: gh('foerster'), what: 'SMC, MCMC, variational inference and counterfactuals over forkable worlds' },
      { name: 'Spindel', url: gh('spindel'), what: 'a reactive runtime whose running computations can be forked' },
    ],
  },
  {
    id: 'self-improvement',
    title: 'Self-improvement under verification',
    summary:
      'A system that modifies itself needs a fork on which to try a change and a check it cannot alter. I build both. Every level of the stack can be forked, and programs in Klara adopt an optimisation only after a small kernel has checked it. Simmis applies the same rule to teams of people and agents. Most of this is research software, and the proofs cover a core calculus, not the whole implementation.',
    papers: [
      {
        title: 'Decoupling Conflict Resolution with CDVCS',
        authors: 'C. Weilbach, K. Kühne, A. Bieniusa',
        venue: 'PaPoC workshop at EuroSys',
        year: 2016,
        note: 'with the replikativ poster, best poster award at EuroSys 2016',
        url: 'https://arxiv.org/abs/1508.05545',
        selected: true,
      },
      {
        title: 'If the Sources Could Talk: Evaluating Large Language Models for Research Assistance in History',
        authors: 'G. Gonzalez Garcia, C. Weilbach',
        venue: 'Computational Humanities Research',
        year: 2023,
        url: 'https://arxiv.org/abs/2310.10808',
      },
    ],
    software: [
      { name: 'Klara', url: gh('klara'), what: 'a language whose running programs fork, rewrite and admit their own optimisations' },
      { name: 'Ansatz', url: gh('ansatz'), what: 'a dependently typed Clojure DSL with a Lean 4 compatible kernel' },
      { name: 'Dvergr', url: gh('dvergr'), what: 'rooms of agents that work in forks and leave receipts' },
      { name: 'Datahike', url: 'https://datahike.io', what: 'a versioned, branchable Datalog database' },
    ],
  },
];

export const thesis = {
  url: 'https://open.library.ubc.ca/soa/cIRcle/collections/ubctheses/24/items/1.0449997',
  institution: 'University of British Columbia',
  advisor: { name: 'Frank Wood', url: 'https://www.cs.ubc.ca/~fwood/' },
  group: { name: 'PLAI', url: 'https://plai.cs.ubc.ca/' },
};

export type Talk = { title: string; where: string; date?: string; url?: string };

export const talks: Talk[] = [
  { title: 'Rationalizing a Society of Learners', where: 'Max Planck Institute for Intelligent Systems, Tübingen', date: 'October 2026', url: 'https://simm.is/talks/2026-10-mpi-tuebingen/' },
  { title: 'Programming as and for inference', where: 'London Clojurians', date: 'May 2026', url: 'https://www.youtube.com/watch?v=f5uXy4MgnZk' },
  { title: 'Partially evaluating higher-order probabilistic programs without stochastic recursion to graphical models', where: 'LAFI workshop at POPL', date: '2025' },
  { title: 'Flexible diffusion models for videos, molecules, and inference in structured simulators', where: 'Google DeepMind, London', date: '2024' },
  { title: 'Video and graphically structured diffusion models', where: 'OpenAI, San Francisco', date: '2023' },
  { title: 'Graphically structured diffusion models', where: 'Mila, Montréal', date: '2023' },
  { title: 'Anglican: Turing-complete functional probabilistic programming as a domain-specific language', where: 'Trends in Functional Programming', date: '2019' },
  { title: 'Datalog as a distributed systems language', where: 'Clojure Meetup Vancouver', date: '2019', url: 'https://www.youtube.com/watch?v=A2CZwOHOb6U' },
  { title: "Let's replicate state together", where: 'clojureD, Berlin', date: '2017', url: 'https://www.youtube.com/watch?v=u8gUH8wT7Cg' },
  { title: 'Machine learning workshop', where: 'CubaConf, Havana', date: '2017' },
];

// The levels of the stack. Each level runs the same loop: fork, ground, join, translate, rewrite.
// `purpose` is the reflective question that returns at that level (draft wording).
export type Level = { name: string; what: string; purpose: string; projects: Software[] };

export const levels: Level[] = [
  {
    name: 'Organisation',
    purpose: 'What should we become, and who decides?',
    what: 'People and agents share one memory, work in branches and adopt results by review.',
    projects: [
      { name: 'Simmis', url: 'https://simm.is', what: 'workspace, branches and review' },
      { name: 'Kontor', url: gh('kontor'), what: 'double-entry accounts' },
    ],
  },
  {
    name: 'Agents',
    purpose: 'On whose behalf does this work happen?',
    what: 'Agents attempt a task on separate forks, and each attempt returns a record of what it did and cost.',
    projects: [{ name: 'Dvergr', url: gh('dvergr'), what: 'rooms, attempts in forks, review' }],
  },
  {
    name: 'Models and inference',
    purpose: 'What is worth knowing?',
    what: 'A question is answered by forking a simulation and weighing the forks against data.',
    projects: [
      { name: 'Foerster', url: gh('foerster'), what: 'probabilistic inference in forkable worlds' },
      { name: 'A forkable Stuttgart', url: 'https://simm.is/blog/stuttgart-in-a-posterior', what: '936,597 simulated people' },
    ],
  },
  {
    name: 'Compilers and proofs',
    purpose: 'What counts as the same?',
    what: 'A faster version of a program is adopted only after a kernel has checked it.',
    projects: [
      { name: 'Klara', url: gh('klara'), what: 'versioned worlds, staging, checked admission' },
      { name: 'Ansatz', url: gh('ansatz'), what: 'Lean 4 compatible kernel' },
      { name: 'Wandler', url: gh('wandler'), what: 'checked rewrites' },
      { name: 'Raster', url: gh('raster'), what: 'numerics to devices' },
    ],
  },
  {
    name: 'Execution',
    purpose: 'What may run, and at whose cost?',
    what: 'A running computation can be paused, copied and resumed from the same point more than once.',
    projects: [
      { name: 'Spindel', url: gh('spindel'), what: 'reactive runtime with forkable state' },
      { name: 'partial-cps', url: gh('partial-cps'), what: 'continuations only where needed' },
    ],
  },
  {
    name: 'Memory',
    purpose: 'What must not be forgotten?',
    what: 'Values are never overwritten. A fork shares everything that has not changed, and earlier states stay readable.',
    projects: [
      { name: 'Datahike', url: 'https://datahike.io', what: 'versioned Datalog' },
      { name: 'Konserve', url: gh('konserve'), what: 'one storage interface for files, S3, JDBC' },
      { name: 'Yggdrasil', url: gh('yggdrasil'), what: 'one fork and merge protocol across systems' },
      { name: 'Geschichte', url: gh('geschichte'), what: 'queryable, git-compatible history' },
    ],
  },
];
