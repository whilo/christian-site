// The glyphs of the fork diagrams, as SVG strings. Coordinates are in viewBox units;
// time runs left to right.

/** A wire from (x0, y0) that bends to lane y1 and runs on to x1. */
export const branch = (x0: number, y0: number, y1: number, x1: number, cls: string, bend = 34) =>
  `<path class="${cls}" d="M${x0} ${y0} C${x0 + bend * 0.6} ${y0} ${x0 + bend * 0.4} ${y1} ${x0 + bend} ${y1} L${x1} ${y1}" />`;

/** A wire on lane y0 from x0 that bends back into the wire at y1, ending at x1. */
export const merge = (x0: number, y0: number, y1: number, x1: number, cls: string) =>
  `<path class="${cls}" d="M${x0} ${y0} C${x0 + (x1 - x0) * 0.6} ${y0} ${x0 + (x1 - x0) * 0.4} ${y1} ${x1} ${y1}" />`;

export const line = (x0: number, y0: number, x1: number, y1: number, cls: string) =>
  `<line class="${cls}" x1="${x0}" y1="${y0}" x2="${x1}" y2="${y1}" />`;

/** The value wire: two thin parallel lines. */
export const values = (x0: number, x1: number, y: number, extra = '') =>
  `${line(x0, y - 2.5, x1, y - 2.5, `vl ${extra}`)}${line(x0, y + 2.5, x1, y + 2.5, `vl ${extra}`)}`;

/** Ground: the wire ends and is dropped. */
export const ground = (x: number, y: number, cls = '') =>
  `<g class="ground ${cls}">${line(x, y - 7, x, y + 7, '')}${line(x + 4, y - 4.5, x + 4, y + 4.5, '')}${line(x + 8, y - 2, x + 8, y + 2, '')}</g>`;

/** A check on a wire. */
export const gate = (x: number, y: number) => `<rect class="gate" x="${x - 3.5}" y="${y - 10}" width="7" height="20" rx="1" />`;

/** A check by people: a larger, open gate. */
export const council = (x: number, y: number) =>
  `<rect class="gate-o" x="${x - 9}" y="${y - 13}" width="18" height="26" rx="2" />` +
  [-6, 0, 6].map((d) => `<circle class="gate" cx="${x}" cy="${y + d}" r="2" />`).join('');

export const dot = (x: number, y: number, cls = '') => `<circle class="dot ${cls}" cx="${x}" cy="${y}" r="3.4" />`;

/** Retired: a cross on a wire. */
export const cross = (x: number, y: number) =>
  `${line(x - 5, y - 5, x + 5, y + 5, 'rt')}${line(x - 5, y + 5, x + 5, y - 5, 'rt')}`;

export const text = (x: number, y: number, s: string, cls = '', anchor: 'start' | 'middle' | 'end' = 'start') =>
  `<text class="${cls}" x="${x}" y="${y}" text-anchor="${anchor}">${s}</text>`;
