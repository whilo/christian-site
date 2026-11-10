import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Essays are long arguments; notes are short, dated results or observations.
// Drafts build (so their link can be shared) but stay out of listings and the feed.
const writing = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    kind: z.enum(['essay', 'note']).default('essay'),
    draft: z.boolean().default(false),
  }),
});

export const collections = { writing };
