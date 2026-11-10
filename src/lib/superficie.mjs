/**
 * Shared by the remark plugin (```clojure blocks in essays) and DualCode.astro.
 * Copied from simm.is (src/plugins/remark-superficie.mjs).
 *
 * Remark plugin that converts ```clojure code blocks into tabbed
 * Superficie / Clojure views.  Superficie is shown by default.
 *
 * Comments (;; …) are extracted before rendering and re-inserted
 * afterwards so they survive the Clojure reader (which discards them).
 *
 * Uses the superficie npm package (CLJS-compiled) — no JVM needed.
 *
 * A snippet is usually a fragment of a file without its ns form, so the
 * library macros it uses (raster's deftm, spindel's spin, ansatz's a/theorem)
 * cannot be resolved and would render as plain calls. A post can name the
 * requires its snippets assume in its frontmatter:
 *
 *   superficieContext: "(require '[raster.core :refer [deftm]] '[raster.par :as par])"
 *
 * and they are rendered as blocks (superficie >= 0.2.34).
 */
import { visit } from 'unist-util-visit';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { renderString } = require('superficie');

/* ------------------------------------------------------------------ */
/*  Comment-aware rendering                                            */
/* ------------------------------------------------------------------ */

/**
 * Split source into segments: { type: 'comment'|'code', text }
 * A "comment" segment is one or more consecutive lines starting with ;
 * (with optional leading whitespace).  Everything else is "code".
 */
function splitSegments(source) {
  const lines = source.split('\n');
  const segments = [];
  let buf = [];
  let kind = null;               // 'comment' | 'code'

  for (const line of lines) {
    const isComment = /^\s*;/.test(line);
    const isBlank = line.trim() === '';
    // blank lines adjacent to comments stay with comments
    const lineKind = isComment ? 'comment' : (isBlank && kind === 'comment' ? 'comment' : 'code');

    if (lineKind !== kind && buf.length > 0) {
      segments.push({ type: kind, text: buf.join('\n') });
      buf = [];
    }
    kind = lineKind;
    buf.push(line);
  }
  if (buf.length > 0) segments.push({ type: kind, text: buf.join('\n') });
  return segments;
}

/**
 * Render a Clojure source string to superficie, preserving comments.
 * `context` is the post's superficieContext (ns/require forms), or undefined.
 */
export function renderWithComments(clojure, context) {
  const segments = splitSegments(clojure);
  const rendered = [];

  for (const seg of segments) {
    if (seg.type === 'comment') {
      rendered.push(seg.text);
    } else {
      try {
        const out = context ? renderString(seg.text, { context }) : renderString(seg.text);
        let clean = out.replace(/\n{3,}/g, '\n\n').replace(/^\n+/, '');
        // Preserve trailing blank lines from the original segment
        const trailingMatch = seg.text.match(/(\n\s*)+$/);
        if (trailingMatch) clean += trailingMatch[0];
        rendered.push(clean);
      } catch {
        return null;          // bail – keep original
      }
    }
  }

  return rendered.join('\n').replace(/\n{3,}/g, '\n\n').trim();
}

/* ------------------------------------------------------------------ */
/*  HTML generation                                                    */
/* ------------------------------------------------------------------ */

function escapeHtml(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function makeTabbedHtml(clojureCode, superficieCode) {
  return `<div class="code-dual">
<div class="code-dual-tabs">
<button class="code-dual-tab active" data-lang="superficie">Superficie</button>
<button class="code-dual-tab" data-lang="clojure">Clojure</button>
<a class="code-dual-what" href="https://github.com/replikativ/superficie">What is this notation?</a>
</div>
<div class="code-dual-panel active" data-lang="superficie">
<pre><code class="language-superficie">${escapeHtml(superficieCode)}</code></pre>
</div>
<div class="code-dual-panel" data-lang="clojure">
<pre><code class="language-clojure">${escapeHtml(clojureCode)}</code></pre>
</div>
</div>`;
}

/* ------------------------------------------------------------------ */
/*  Remark plugin                                                      */
/* ------------------------------------------------------------------ */

export default function remarkSuperficie() {
  return (tree, file) => {
    const context = file?.data?.astro?.frontmatter?.superficieContext;
    visit(tree, 'code', (node, index, parent) => {
      if (node.lang !== 'clojure') return;

      const clojure = node.value;
      const superficie = renderWithComments(clojure, context);
      if (!superficie) return;             // render failed – leave as-is

      const html = makeTabbedHtml(clojure, superficie);

      // Replace the code node with raw HTML
      parent.children[index] = {
        type: 'html',
        value: html,
      };
    });
  };
}
