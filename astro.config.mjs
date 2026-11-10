import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkSuperficie from './src/lib/superficie.mjs';
import { readdirSync, readFileSync } from 'node:fs';

// Drafts build so their link can be shared, but stay out of the sitemap, the index and the feed.
const dir = new URL('./src/content/writing/', import.meta.url);
const drafts = readdirSync(dir)
  .filter((f) => /\.mdx?$/.test(f) && /^draft:\s*true\s*$/m.test(readFileSync(new URL(f, dir), 'utf8')))
  .map((f) => `/writing/${f.replace(/\.mdx?$/, '')}/`);

export default defineConfig({
  site: 'https://christian.weilbach.name',
  output: 'static',
  markdown: { syntaxHighlight: false, remarkPlugins: [remarkMath, remarkSuperficie], rehypePlugins: [rehypeKatex] },
  integrations: [mdx(), sitemap({ filter: (page) => !drafts.includes(new URL(page).pathname) })],
});
