// DRAFT research genealogy for the home-page figure (sketch A).
// Each node is an idea, project, paper, company or talk. `parents` are the
// nodes it grew out of, so the data forms a genealogy: branches fork, some
// end (dropped), some lie dormant and come back (revived).
// Papers and releases are the evidence marks; the surviving lineages end in
// today's stack.
//
// Sources: the previous site, the thesis bibliography, arXiv and the creation
// dates of github.com/whilo and github.com/replikativ repositories.
// Everything marked `todo` needs Christian's correction.

export type Kind = 'study' | 'project' | 'paper' | 'company' | 'talk';
export type Status = 'continued' | 'dropped' | 'revived' | 'current';

export type Lane = 'org' | 'inference' | 'learning' | 'languages' | 'memory';

export const lanes: { id: Lane; name: string }[] = [
  { id: 'org', name: 'Organisations and agents' },
  { id: 'inference', name: 'Inference and simulation' },
  { id: 'learning', name: 'Learning structure' },
  { id: 'languages', name: 'Languages, runtimes and proofs' },
  { id: 'memory', name: 'Memory' },
];

export type Node = {
  id: string;
  year: number; // fractional years place events within a year
  lane: Lane;
  label: string;
  kind: Kind;
  parents: string[];
  status: Status;
  url?: string;
  repo?: string; // replikativ repository, when the link points elsewhere (used for activity)
  todo?: string;
};

const gh = (path: string) => `https://github.com/${path}`;

export const history: Node[] = [
  // Roots
  { id: 'philosophy', year: 2006, label: 'Philosophy and cultural anthropology, Heidelberg', lane: 'org', kind: 'study', parents: [], status: 'continued' },
  { id: 'votorola', year: 2009, label: 'Votorola: liquid democracy software, with Michael Allan', kind: 'project', parents: ['philosophy'], status: 'continued', lane: 'org', url: 'http://reluk.ca/project/Votorola/home-2013.html' },
  { id: 'spiking', year: 2014.9, label: 'Online learning for spiking Boltzmann machines (BSc, Heidelberg)', lane: 'learning', kind: 'study', parents: ['philosophy'], status: 'continued' },

  // Memory and replication
  { id: 'replikativ', year: 2013.8, label: 'replikativ: replicated data types, peer to peer', lane: 'memory', kind: 'project', parents: ['votorola'], status: 'continued', url: gh('replikativ/replikativ') },
  { id: 'konserve', year: 2014.2, label: 'konserve and hasch', lane: 'memory', kind: 'project', parents: ['replikativ'], status: 'continued', url: gh('replikativ/konserve') },
  { id: 'cnc', year: 2015.0, label: 'Cluster simulations with versioned data', lane: 'memory', kind: 'project', parents: ['replikativ'], status: 'dropped', url: gh('whilo/cnc') },
  { id: 'cdvcs', year: 2015.6, label: 'CDVCS paper', lane: 'memory', kind: 'paper', parents: ['replikativ'], status: 'continued', url: 'https://arxiv.org/abs/1508.05545' },
  { id: 'ecdts', year: 2016.3, label: 'Eventually consistent datatypes', lane: 'memory', kind: 'project', parents: ['cdvcs'], status: 'dropped', url: gh('whilo/ecdts') },
  { id: 'datahike', year: 2018.0, label: 'Datahike', lane: 'memory', kind: 'project', parents: ['konserve', 'cdvcs'], status: 'continued', url: 'https://datahike.io', repo: 'datahike' },
  { id: 'yggdrasil', year: 2026.06, lane: 'memory', label: 'Yggdrasil: one fork and merge protocol across systems', kind: 'project', parents: ['datahike', 'cdvcs'], status: 'current', url: gh('replikativ/yggdrasil') },

  // Learning
  { id: 'boltzmann', year: 2014.7, label: 'Boltzmann machines in Clojure', lane: 'learning', kind: 'project', parents: ['spiking'], status: 'continued', url: gh('whilo/boltzmann') },
  { id: 'bdropout', year: 2016.0, label: 'Bayesian dropout', lane: 'learning', kind: 'project', parents: ['boltzmann'], status: 'dropped', url: gh('whilo/bdropout') },
  { id: 'autograd', year: 2017.75, label: 'Autograd and numerics on the JVM', lane: 'learning', kind: 'project', parents: ['boltzmann'], status: 'revived', url: gh('whilo/denisovan') },
  { id: 'msc', year: 2018.0, label: 'Dictionary learning with Bayesian GANs (MSc, Heidelberg)', lane: 'learning', kind: 'study', parents: ['boltzmann'], status: 'continued' },
  { id: 'sghmc', year: 2017.9, label: 'A live-coded simulator for SGHMC dynamics', lane: 'learning', kind: 'project', parents: ['msc'], status: 'dropped', url: gh('whilo/sghmc-game') },
  { id: 'phd', year: 2018.7, label: 'PhD at UBC with Frank Wood', lane: 'learning', kind: 'study', parents: ['msc'], status: 'continued' },
  { id: 'sccnf', year: 2020.2, label: 'Structured conditional flows (AISTATS)', lane: 'learning', kind: 'paper', parents: ['phd'], status: 'continued', url: 'https://proceedings.mlr.press/v108/weilbach20a.html' },
  { id: 'structflow', year: 2021.6, label: 'Structure from flow geometry', lane: 'learning', kind: 'project', parents: ['sccnf'], status: 'dropped' },
  { id: 'fdm', year: 2022.4, label: 'Long video diffusion (NeurIPS)', lane: 'learning', kind: 'paper', parents: ['phd'], status: 'continued', url: 'https://arxiv.org/abs/2205.11495' },
  { id: 'gsdm', year: 2023.5, label: 'Graphically structured diffusion (ICML)', lane: 'learning', kind: 'paper', parents: ['sccnf', 'fdm'], status: 'continued', url: 'https://arxiv.org/abs/2210.11633' },
  { id: 'jump', year: 2023.4, label: 'Jump diffusion (NeurIPS)', lane: 'learning', kind: 'paper', parents: ['fdm'], status: 'continued', url: 'https://arxiv.org/abs/2305.16261' },
  { id: 'thesis', year: 2025.2, label: 'Doctoral thesis', lane: 'learning', kind: 'paper', parents: ['gsdm'], status: 'continued', url: 'https://open.library.ubc.ca/soa/cIRcle/collections/ubctheses/24/items/1.0449997' },
  { id: 'plaicraft', year: 2025.37, label: 'PLAICraft dataset', lane: 'learning', kind: 'paper', parents: ['phd'], status: 'continued', url: 'https://arxiv.org/abs/2505.12707' },

  // Inference and simulation
  { id: 'probprog', year: 2019.3, label: 'Probabilistic programming: Anglican and Daphne', lane: 'inference', kind: 'project', parents: ['phd'], status: 'continued' },
  { id: 'epi', year: 2020.25, label: 'Planning as inference for epidemics', lane: 'inference', kind: 'paper', parents: ['probprog'], status: 'continued', url: 'https://doi.org/10.3389/frai.2021.550603' },
  { id: 'scmc', year: 2021.5, label: 'Sequential core-set Monte Carlo (UAI)', lane: 'inference', kind: 'paper', parents: ['probprog'], status: 'continued', url: 'https://proceedings.mlr.press/v161/beronov21a.html' },
  { id: 'auction', year: 2021.05, label: 'Auction design by probabilistic programming', lane: 'inference', kind: 'project', parents: ['probprog'], status: 'dropped' },
  { id: 'firms', year: 2021.95, label: 'Agent-based simulation of firms', lane: 'inference', kind: 'project', parents: ['probprog'], status: 'revived', url: gh('whilo/Firms.jl') },
  { id: 'sbi', year: 2024.3, label: 'All-in-one simulation-based inference (ICML)', lane: 'inference', kind: 'paper', parents: ['probprog', 'gsdm'], status: 'continued', url: 'https://arxiv.org/abs/2404.09636' },
  { id: 'foerster', year: 2026.74, label: 'Foerster: inference in forkable worlds', lane: 'inference', kind: 'project', parents: ['probprog', 'spindel', 'scmc'], status: 'current', url: gh('replikativ/foerster') },
  { id: 'stuttgart', year: 2026.76, label: 'A forkable Stuttgart, 936,597 people', lane: 'inference', kind: 'project', parents: ['firms', 'foerster', 'raster'], status: 'current', url: 'https://simm.is/blog/stuttgart-in-a-posterior', repo: 'city-rstr' },

  // Languages and verification
  { id: 'beichte-2017', year: 2017.8, label: 'Static purity analysis', lane: 'languages', kind: 'project', parents: ['replikativ'], status: 'revived', url: gh('whilo/beichte') },
  { id: 'partialeval', year: 2019.9, label: 'Partial evaluation', lane: 'languages', kind: 'project', parents: ['probprog'], status: 'continued' },
  { id: 'cur', year: 2025.3, label: 'Dependent types: a port of Cur', lane: 'languages', kind: 'project', parents: ['partialeval'], status: 'continued', url: gh('whilo/cur') },
  { id: 'raster', year: 2026.19, label: 'Raster: numerics to devices', lane: 'languages', kind: 'project', parents: ['autograd'], status: 'current', url: gh('replikativ/raster') },
  { id: 'ansatz', year: 2026.25, label: 'Ansatz: a Lean 4 compatible kernel', lane: 'languages', kind: 'project', parents: ['cur'], status: 'current', url: gh('replikativ/ansatz') },
  { id: 'spindel', year: 2026.33, label: 'Spindel: forkable reactive runtime', lane: 'languages', kind: 'project', parents: ['datahike', 'partialeval', 'partial-cps'], status: 'current', url: gh('replikativ/spindel') },
  { id: 'klara', year: 2026.82, label: 'Klara: programs that admit their own optimisations', lane: 'languages', kind: 'project', parents: ['ansatz', 'spindel', 'beichte', 'raster', 'wandler'], status: 'current', url: gh('replikativ/klara') },

  // Organisations and agents
  { id: 'lambda', year: 2018.06, label: 'Democratic self-management with budgets', lane: 'org', kind: 'project', parents: ['votorola'], status: 'revived', url: gh('whilo/lambda.demos') },
  { id: 'polis', year: 2025.6, label: 'Modernising PCA for pol.is', lane: 'org', kind: 'project', parents: ['lambda'], status: 'continued', url: 'https://pol.is' },
  { id: 'kleio', year: 2023.75, label: 'Language models for historical research', lane: 'org', kind: 'paper', parents: ['phd'], status: 'continued', url: 'https://arxiv.org/abs/2310.10808' },
  { id: 'simmis-early', year: 2024.47, label: 'An early conversational system for organisations', lane: 'org', kind: 'project', parents: ['lambda', 'kleio'], status: 'continued' },
  { id: 'dvergr', year: 2026.34, label: 'Dvergr: rooms of agents in forks', lane: 'org', kind: 'project', parents: ['spindel', 'simmis-early'], status: 'current', url: gh('replikativ/dvergr') },
  { id: 'simmis', year: 2026.64, label: 'Simmis', lane: 'org', kind: 'company', parents: ['dvergr', 'datahike', 'simmis-early', 'kontor', 'geschichte'], status: 'current', url: 'https://simm.is', repo: 'simmis' },


  { id: 'lambdaforge', year: 2018.3, label: 'LambdaForge: Datahike development and consulting', kind: 'company', parents: ['datahike'], status: 'continued', lane: 'org' },
  { id: 'daphne', year: 2025.1, label: 'Daphne: compiling probabilistic programs (TMLR)', kind: 'paper', parents: ['probprog', 'partialeval'], status: 'continued', lane: 'inference', url: 'https://openreview.net/forum?id=OGCuDFab4b' },
  // The last year: the stack, level by level
  { id: 'partial-cps', year: 2025.65, lane: 'languages', label: 'partial-cps: continuations only where needed', kind: 'project', parents: ['probprog'], status: 'current', url: gh('replikativ/partial-cps') },
  { id: 'konserve-backends', year: 2026.0, lane: 'memory', label: 'konserve on LMDB, GCS, Azure, with sync', kind: 'project', parents: ['konserve'], status: 'current', url: gh('replikativ/konserve-lmdb') },
  { id: 'proximum', year: 2026.04, lane: 'memory', label: 'Proximum: versioned vector search', kind: 'project', parents: ['datahike'], status: 'current', url: gh('replikativ/proximum') },
  { id: 'scriptum', year: 2026.07, lane: 'memory', label: 'Scriptum: Lucene with branches', kind: 'project', parents: ['datahike'], status: 'current', url: gh('replikativ/scriptum') },
  { id: 'stratum', year: 2026.11, lane: 'memory', label: 'Stratum: columnar SQL with branches', kind: 'project', parents: ['datahike'], status: 'current', url: gh('replikativ/stratum') },
  { id: 'pg-datahike', year: 2026.31, lane: 'memory', label: 'Postgres compatibility for Datahike', kind: 'project', parents: ['datahike'], status: 'current', url: gh('replikativ/pg-datahike') },
  { id: 'geschichte', year: 2026.54, lane: 'memory', label: 'Geschichte: queryable, git-compatible history', kind: 'project', parents: ['yggdrasil', 'datahike'], status: 'current', url: gh('replikativ/geschichte') },
  { id: 'boring', year: 2026.58, lane: 'memory', label: 'boring: portable CBOR', kind: 'project', parents: ['konserve'], status: 'current', url: gh('replikativ/boring') },
  { id: 'serverless', year: 2026.62, lane: 'memory', label: 'Datahike on serverless compute', kind: 'project', parents: ['datahike', 'konserve-backends'], status: 'current', url: gh('replikativ/datahike-serverless') },
  { id: 'superficie', year: 2026.18, lane: 'languages', label: 'Superficie: Clojure you can read', kind: 'project', parents: ['phd'], status: 'current', url: gh('replikativ/superficie') },
  { id: 'beichte', year: 2026.19, lane: 'languages', label: 'Beichte: purity and effect analysis', kind: 'project', parents: ['beichte-2017'], status: 'current', url: gh('replikativ/beichte') },
  { id: 'katzen', year: 2026.42, lane: 'languages', label: 'Katzen: categorical programming', kind: 'project', parents: ['cur'], status: 'current', url: gh('replikativ/katzen') },
  { id: 'wandler', year: 2026.45, lane: 'languages', label: 'Wandler: verified transducer optimisation', kind: 'project', parents: ['ansatz', 'raster'], status: 'current', url: gh('replikativ/wandler') },
  { id: 'carpaccio', year: 2026.65, lane: 'languages', label: 'Carpaccio: affine native code via Meta-Carp', kind: 'project', parents: ['raster'], status: 'current', url: gh('replikativ/carpaccio') },
  { id: 'raster-ml', year: 2026.5, lane: 'learning', label: 'UMAP, EVoC and pretrained models on Raster', kind: 'project', parents: ['raster', 'gsdm'], status: 'current', url: gh('replikativ/pretrained-rstr') },
  { id: 'pymc-marketing', year: 2026.8, lane: 'inference', label: 'Contributions to PyMC-Marketing', kind: 'project', parents: ['probprog'], status: 'current', url: 'https://github.com/pymc-labs/pymc-marketing/pulls?q=is%3Apr+author%3Awhilo' },
  { id: 'marketing', year: 2026.84, lane: 'inference', label: 'Bayesian marketing mix models on Foerster', kind: 'project', parents: ['foerster', 'pymc-marketing'], status: 'current', url: gh('replikativ/foerster-marketing') },
  { id: 'beleg', year: 2026.04, lane: 'org', label: 'Beleg and Briefkasten: invoices and mail on Datahike', kind: 'project', parents: ['lambda', 'scriptum'], status: 'continued', url: gh('replikativ/beleg') },
  { id: 'rechentafel', year: 2026.34, lane: 'org', label: 'Rechentafel: a spreadsheet evaluator', kind: 'project', parents: ['beleg'], status: 'current', url: gh('replikativ/rechentafel') },
  { id: 'kontor', year: 2026.36, lane: 'org', label: 'Kontor: an accounting kernel', kind: 'project', parents: ['beleg', 'rechentafel'], status: 'current', url: gh('replikativ/kontor') },
  { id: 'muschel', year: 2026.39, lane: 'org', label: 'Muschel: a shell with forkable memory', kind: 'project', parents: ['dvergr', 'spindel'], status: 'current', url: gh('replikativ/muschel') },
  // Talks
  { id: 'talks-labs', year: 2023.6, label: 'Talks at OpenAI, Mila (2023) and Google DeepMind (2024)', lane: 'learning', kind: 'talk', parents: ['phd'], status: 'continued' },
  { id: 'mpi', year: 2026.79, label: 'Rationalizing a Society of Learners, MPI-IS', lane: 'org', kind: 'talk', parents: ['foerster', 'klara', 'simmis'], status: 'current', url: 'https://simm.is/talks/2026-10-mpi-tuebingen/' },
];
