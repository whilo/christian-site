// Posts published on simm.is and datahike.io, mapped to the projects they explain
// (ids in history.ts) and the parts of the research agenda (ids in research.ts).
//
// `status` is Christian's decision whether a post is linked from this personal site:
// 'approved' posts appear everywhere; 'pending' posts wait for edits on their own site and
// appear only in development, marked "pending review"; 'excluded' posts are never linked here
// (primers, release notes, product marketing). The canonical copy stays where it was published.
// Decided 2026-11-09 after an audit of all published posts.

export type Post = {
  site: 'simm.is' | 'datahike.io';
  title: string;
  url: string;
  date: string;
  projects: string[];
  strands: string[];
  status: 'approved' | 'pending' | 'excluded';
};

const simmis = (slug: string) => `https://simm.is/blog/${slug}/`;
const datahike = (slug: string) => `https://datahike.io/notes/${slug}/`;

export const posts: Post[] = [
  // simm.is
  { site: 'simm.is', title: 'Measuring agent workflows on public benchmarks', url: simmis('measuring-agent-workflows'), date: '2026-10-11', projects: ['dvergr'], strands: ['self-improvement'], status: 'approved' },
  { site: 'simm.is', title: 'Superficie: Clojure you can read without learning Lisp', url: simmis('superficie-clojure-you-can-read'), date: '2026-09-28', projects: ['superficie'], strands: [], status: 'approved' },
  { site: 'simm.is', title: 'Stuttgart in a posterior: a city simulation you can question', url: simmis('stuttgart-in-a-posterior'), date: '2026-09-26', projects: ['stuttgart'], strands: ['simulation'], status: 'approved' },
  { site: 'simm.is', title: 'A KV cache you can fork', url: simmis('a-kv-cache-you-can-fork'), date: '2026-09-21', projects: ['raster-ml', 'spindel'], strands: ['simulation'], status: 'excluded' },
  { site: 'simm.is', title: 'A REPL you can fork', url: simmis('a-repl-you-can-fork'), date: '2026-09-12', projects: ['spindel'], strands: ['self-improvement'], status: 'approved' },
  { site: 'simm.is', title: 'Agents can act. Who keeps the company coherent?', url: simmis('agents-can-act-who-keeps-the-company-coherent'), date: '2026-07-31', projects: ['simmis'], strands: ['self-improvement'], status: 'excluded' },
  { site: 'simm.is', title: 'Shared context for AI agents: five architectures compared', url: simmis('five-architectures-for-shared-human-agent-work'), date: '2026-07-24', projects: ['simmis', 'dvergr'], strands: ['self-improvement'], status: 'excluded' },
  { site: 'simm.is', title: 'What Bayesian inference does, in pictures', url: simmis('bayesian-inference-in-pictures'), date: '2026-06-08', projects: ['foerster'], strands: ['simulation'], status: 'excluded' },
  { site: 'simm.is', title: 'Copy-on-write branching: why isolated attempts can stay cheap', url: simmis('copy-on-write-branching'), date: '2026-05-08', projects: ['datahike', 'simmis'], strands: ['self-improvement'], status: 'excluded' },
  { site: 'simm.is', title: 'Reading a causal graph: what your model knows', url: simmis('reading-a-causal-graph'), date: '2026-04-08', projects: ['foerster'], strands: ['simulation'], status: 'excluded' },

  // datahike.io
  { site: 'datahike.io', title: 'What comes after InstantDB?', url: datahike('what-comes-after-instantdb'), date: '2026-09-15', projects: ['datahike'], strands: [], status: 'excluded' },
  { site: 'datahike.io', title: 'Serialization considered boring', url: datahike('serialization-considered-boring'), date: '2026-08-21', projects: ['boring'], strands: [], status: 'approved' },
  { site: 'datahike.io', title: 'Data governance in versioned systems', url: datahike('data-governance-in-versioned-systems'), date: '2026-05-28', projects: ['datahike'], strands: [], status: 'excluded' },
  { site: 'datahike.io', title: 'Branches as values, merges as queries', url: datahike('branches-across-every-binding'), date: '2026-05-14', projects: ['yggdrasil'], strands: ['self-improvement'], status: 'excluded' },
  { site: 'datahike.io', title: 'Datahike speaks PostgreSQL', url: datahike('datahike-speaks-postgres'), date: '2026-05-07', projects: ['pg-datahike'], strands: [], status: 'excluded' },
  { site: 'datahike.io', title: 'Anomaly detection inside the database', url: datahike('anomaly-detection-in-your-database'), date: '2026-04-13', projects: ['datahike', 'stratum'], strands: [], status: 'excluded' },
  { site: 'datahike.io', title: 'Versioned analytics for regulated industries', url: datahike('versioned-analytics-regulated-industries'), date: '2026-04-06', projects: ['stratum'], strands: [], status: 'excluded' },
  { site: 'datahike.io', title: 'Memory that collaborates', url: datahike('collaborate-without-infrastructure'), date: '2026-03-25', projects: ['datahike'], strands: [], status: 'excluded' },
  { site: 'datahike.io', title: 'Stratum: SQL that branches', url: datahike('stratum-analytics-engine'), date: '2026-02-26', projects: ['stratum'], strands: [], status: 'excluded' },
  { site: 'datahike.io', title: 'Why we built Datahike', url: datahike('why-we-built-datahike'), date: '2026-02-14', projects: ['datahike'], strands: [], status: 'approved' },
  { site: 'datahike.io', title: 'Yggdrasil: branching protocols', url: datahike('yggdrasil-unified-cow-protocols'), date: '2026-01-24', projects: ['yggdrasil'], strands: ['self-improvement'], status: 'excluded' },
  { site: 'datahike.io', title: 'The Git model for databases', url: datahike('the-git-model-for-databases'), date: '2026-01-06', projects: ['datahike', 'yggdrasil'], strands: ['self-improvement'], status: 'excluded' },
  { site: 'datahike.io', title: 'Why search needs versioning', url: datahike('why-search-needs-versioning'), date: '2026-01-05', projects: ['proximum', 'scriptum'], strands: [], status: 'excluded' },
];

/** Posts to show: approved ones, plus everything (marked) during development. */
export const visiblePosts = (): (Post & { pending: boolean })[] =>
  posts
    .filter((p) => p.status === 'approved' || (p.status === 'pending' && import.meta.env.DEV))
    .map((p) => ({ ...p, pending: p.status === 'pending' }));
