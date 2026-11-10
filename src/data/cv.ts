// CV entries that are not already part of the research data (research.ts).
// Source: ~/Documents/CV/cv.tex (versioned there). The public CV leaves out the postal
// address and date of birth.

export type Row = { years: string; text: string; url?: string };

export const position = 'Founder and CEO, Simmis';

export const education: Row[] = [
  { years: '2018–2025', text: 'PhD in Computer Science, University of British Columbia. Structured amortized variational inference, with Frank Wood.' },
  { years: '2015–2018', text: "Master's in Computer Science, Heidelberg University. Dictionary learning with Bayesian GANs for few-shot classification." },
  { years: '2011–2015', text: "Bachelor's in Computer Science, Heidelberg University. An online learning algorithm for LIF-based Boltzmann machines." },
  { years: '2006–2011', text: 'Philosophy and cultural anthropology, Heidelberg University.' },
  { years: '2005–2006', text: 'Mathematics and computer science, Heidelberg University.' },
];

export const awards: Row[] = [
  { years: '2024', text: 'Oral presentation at ICML: All-in-one simulation-based inference.' },
  { years: '2023', text: 'Oral presentation at ICML (top 2.4%): Graphically structured diffusion models.' },
  { years: '2023', text: 'Google research grant of over 80,000 USD for graphically structured diffusion models, with Frank Wood.' },
  { years: '2016', text: 'Best poster award, EuroSys, London (replikativ: open P2P replication with CRDTs).' },
];

// Publications that are on the CV but not on the research page.
export const extraPublications: Row[] = [
  { years: '2019', text: 'C. Weilbach, B. Beronov, W. Harvey, F. Wood. Efficient inference amortization in graphical models using structured continuous conditional normalizing flows. Symposium on Advances in Approximate Bayesian Inference.' },
  { years: '2016', text: 'C. Weilbach, K. Kühne, A. Bieniusa. replikativ: open P2P replication with CRDTs. Poster, EuroSys, London.' },
];

export const projects: Row[] = [
  { years: '2025–', text: 'Simmis: a workspace in which people and AI agents share one memory (chat, wiki, knowledge bases, double-entry accounts, code), with work done in branches and adopted by review.', url: 'https://simm.is' },
  { years: '2026', text: 'Klara: a language for recursive self-improvement. Running programs keep versioned worlds, specialise themselves with staged, untrusted optimisers, and admit changes through a small kernel with proofs checked in Ansatz.', url: 'https://github.com/replikativ/klara' },
  { years: '2026', text: 'Ansatz, a dependently typed Clojure DSL with a Lean 4 compatible kernel; Wandler, verified transducer optimisation.', url: 'https://github.com/replikativ/ansatz' },
  { years: '2026', text: 'Foerster: probabilistic inference in forkable worlds (SMC, particle MCMC, HMC, variational inference, counterfactuals), and a data-grounded simulation of Stuttgart with 936,597 agents and Bayesian inference over its parameters.', url: 'https://github.com/replikativ/foerster' },
  { years: '2026', text: 'Raster: functional numerical computing that compiles one algebra to each device, with ports of UMAP, EVoC and pretrained Hugging Face models to the JVM.', url: 'https://github.com/replikativ/raster' },
  { years: '2026', text: 'Spindel, a reactive runtime with forkable state; partial-cps; Dvergr, an agent framework with forkable memory and measured workflows.', url: 'https://github.com/replikativ/spindel' },
  { years: '2026', text: 'Datahike ecosystem: Yggdrasil, Proximum, Stratum, Scriptum, Geschichte and pg-datahike.', url: 'https://datahike.io' },
  { years: '2026', text: 'Kontor, an accounting kernel; Superficie, a readable surface syntax for Clojure; contributions to PyMC-Marketing.' },
  { years: '2026', text: 'Open migration databases with Dr. Giselle González García: the Cuba–Ireland Immigration Database and Redes Isleñas, built on Datahike and Spindel.', url: 'https://gisellegonzalezgarcia.github.io/ciid/' },
  { years: '2023–', text: 'PLAICraft: large-scale multimodal data collection of multi-agent Minecraft play. Led 11 volunteers and several students on architecture and code.', url: 'https://plaicraft.ai' },
  { years: '2019–2022', text: 'Daphne: a compiler from first-order probabilistic programs to graphical models and structured normalizing flows; adapted for teaching a graduate course in probabilistic programming at UBC.', url: 'https://gitlab.com/plai-group/daphne' },
  { years: '2018', text: 'Datahike: design and development of a Datalog database on persistent data structures.', url: 'https://github.com/replikativ/datahike' },
  { years: '2017', text: 'A reverse-mode autograd for Clojure.', url: 'https://github.com/whilo/clj-autograd' },
  { years: '2016', text: 'Bayesian dropout for recursive neural networks in sentiment analysis; dropout as a Gaussian process approximation; complex knowledge-base embeddings.' },
  { years: '2015', text: 'Research assistant in the Human Brain Project, extending my Bachelor thesis; a Boltzmann machine library for contrastive divergence with STDP.', url: 'https://github.com/whilo/boltzmann' },
  { years: '2013–', text: 'replikativ: distributed state management with CRDTs.', url: 'https://github.com/replikativ' },
];

export const commercial: Row[] = [
  { years: '2025–', text: 'Founder and CEO of Simmis.' },
  { years: '2025', text: 'Python port and modernisation of the PCA implementation of pol.is.', url: 'https://pol.is' },
  { years: '2019–', text: 'Consulting for the deployment of Datahike at the Swedish Public Employment Service.' },
  { years: '2018–', text: 'Founder of LambdaForge UG.' },
  { years: '2018', text: 'Improvements to the probabilistic programming system Anglican.' },
  { years: '2016–2017', text: 'Design and implementation of a backend and apps for feebame UG.' },
  { years: '2016', text: 'Reachability analysis and callee prediction with Bayesian deep learning for Keatec GmbH, Frankfurt.' },
  { years: '2014–2015', text: 'Statistical analysis of medical data for BMI Heidelberg.' },
];

export const community: Row[] = [
  { years: '2020', text: 'Organiser, Vancouver Julia Meetup.' },
  { years: '2017–2018', text: "Teaching assistant, Master's lecture “Fundamentals of Machine Learning”, Heidelberg University." },
  { years: '2017', text: 'Cornell, Maryland, Max Planck Pre-doctoral Research School, Saarbrücken.' },
  { years: '2015–2018', text: 'Co-organiser, Clojure Meetup Mannheim-Heidelberg; organiser, Machine Learning Meetup Rhein-Neckar.' },
];

export const languages = 'German (native), English (fluent), French (basic).';
