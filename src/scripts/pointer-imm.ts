// A model of the reader's pointer: four hypotheses about its motion (still, straight, turning,
// slowing down), each a Kalman filter over position and velocity, weighted by how well each
// predicted the last observation (an interacting-multiple-model filter, simplified).
//
// It runs on every sample the mouse reports, often hundreds per second, so it works in place
// on fixed buffers and allocates nothing per step: 4x4 matrices are Float64Array(16), row-major.

export const N = 4;
const ACCEL = [40, 500, 500, 500]; // px/s^2 of unmodelled acceleration per hypothesis
const R = 4;                        // measurement variance, px^2

/** Writes into F the transition of the state [x, y, vx, vy] over dt for hypothesis i. */
export function fillF(i: number, dt: number, w: number, F: Float64Array) {
  F.fill(0);
  F[0] = 1; F[5] = 1;
  if (i === 0) {                                   // still: velocity dies
    const e = Math.exp(-dt / 0.02); F[10] = e; F[15] = e;
  } else if (i === 1) {                            // straight
    F[2] = dt; F[7] = dt; F[10] = 1; F[15] = 1;
  } else if (i === 2) {                            // turning at rate w
    const c = Math.cos(w * dt), s = Math.sin(w * dt);
    const a = Math.abs(w) > 1e-3 ? s / w : dt, b = Math.abs(w) > 1e-3 ? (1 - c) / w : 0;
    F[2] = a; F[3] = -b; F[6] = b; F[7] = a; F[10] = c; F[11] = -s; F[14] = s; F[15] = c;
  } else {                                         // slowing down to a stop
    const T = 0.12, e = Math.exp(-dt / T), a = T * (1 - e);
    F[2] = a; F[7] = a; F[10] = e; F[15] = e;
  }
}

/** out = F P F^T + Q(dt), where Q is the noise of an unmodelled acceleration sa; tmp is scratch. */
function propagate(F: Float64Array, P: Float64Array, dt: number, sa: number, out: Float64Array, tmp: Float64Array) {
  for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) {
    tmp[r * 4 + c] = F[r * 4] * P[c] + F[r * 4 + 1] * P[4 + c] + F[r * 4 + 2] * P[8 + c] + F[r * 4 + 3] * P[12 + c];
  }
  for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) {
    out[r * 4 + c] = tmp[r * 4] * F[c * 4] + tmp[r * 4 + 1] * F[c * 4 + 1] + tmp[r * 4 + 2] * F[c * 4 + 2] + tmp[r * 4 + 3] * F[c * 4 + 3];
  }
  const a = sa * sa, q4 = (a * dt ** 4) / 4, q3 = (a * dt ** 3) / 2, q2 = a * dt * dt;
  out[0] += q4; out[5] += q4; out[2] += q3; out[7] += q3; out[8] += q3; out[13] += q3; out[10] += q2; out[15] += q2;
}

export class PointerIMM {
  /** belief in each hypothesis */
  readonly w = new Float64Array(N).fill(1 / N);
  /** each hypothesis's state [x, y, vx, vy] and its covariance */
  readonly s = Array.from({ length: N }, () => new Float64Array(4));
  readonly P = Array.from({ length: N }, () => new Float64Array(16));
  ready = false;
  omega = 0;
  /** results of predict(): the expected position and its spread (px) */
  px = 0; py = 0; sigma = 0;

  private F = new Float64Array(16); private T = new Float64Array(16); private Pp = new Float64Array(16);
  private sp = new Float64Array(4); private K = new Float64Array(8); private ll = new Float64Array(N);
  private mx = new Float64Array(N); private my = new Float64Array(N); private tr = new Float64Array(N);
  private prevX = 0; private prevY = 0; private hasPrev = false; private prevDir = 0; private hasDir = false;

  step(zx: number, zy: number, dt: number) {
    const { F, T, Pp, sp, K, ll, w } = this;
    if (!this.ready) {
      for (let i = 0; i < N; i++) {
        const s = this.s[i], P = this.P[i];
        s[0] = zx; s[1] = zy; s[2] = 0; s[3] = 0;
        P.fill(0); P[0] = P[5] = P[10] = P[15] = 400;
      }
      this.ready = true;
    }
    // turn rate from the change of direction of the measured displacement
    if (this.hasPrev) {
      const dx = zx - this.prevX, dy = zy - this.prevY, speed = Math.hypot(dx, dy) / dt;
      if (speed > 60) {
        const dir = Math.atan2(dy, dx);
        if (this.hasDir) {
          let da = dir - this.prevDir; da = Math.atan2(Math.sin(da), Math.cos(da));
          this.omega += 0.2 * (Math.max(-12, Math.min(12, da / dt)) - this.omega);
        }
        this.prevDir = dir; this.hasDir = true;
      } else { this.hasDir = false; this.omega *= 0.9; }
    }
    this.prevX = zx; this.prevY = zy; this.hasPrev = true;

    for (let i = 0; i < N; i++) {
      const s = this.s[i], P = this.P[i];
      fillF(i, dt, this.omega, F);
      for (let r = 0; r < 4; r++) sp[r] = F[r * 4] * s[0] + F[r * 4 + 1] * s[1] + F[r * 4 + 2] * s[2] + F[r * 4 + 3] * s[3];
      propagate(F, P, dt, ACCEL[i], Pp, T);
      const nx = zx - sp[0], ny = zy - sp[1];
      const a = Pp[0] + R, b = Pp[1], c = Pp[4], d = Pp[5] + R, det = a * d - b * c;
      const i00 = d / det, i01 = -b / det, i10 = -c / det, i11 = a / det;
      for (let r = 0; r < 4; r++) {
        K[r * 2] = Pp[r * 4] * i00 + Pp[r * 4 + 1] * i10;
        K[r * 2 + 1] = Pp[r * 4] * i01 + Pp[r * 4 + 1] * i11;
      }
      for (let r = 0; r < 4; r++) {
        s[r] = sp[r] + K[r * 2] * nx + K[r * 2 + 1] * ny;
        for (let q = 0; q < 4; q++) P[r * 4 + q] = Pp[r * 4 + q] - (K[r * 2] * Pp[q] + K[r * 2 + 1] * Pp[4 + q]);
      }
      ll[i] = -0.5 * (nx * (i00 * nx + i01 * ny) + ny * (i10 * nx + i11 * ny)) - 0.5 * Math.log(det) - Math.log(2 * Math.PI);
    }
    ll[2] -= 0.06; // the simpler hypothesis wins when both predict equally well
    let top = -Infinity;
    for (let i = 0; i < N; i++) top = Math.max(top, ll[i]);
    // hypotheses tend to persist; then weigh by how well each predicted this observation
    let sum = 0;
    for (let i = 0; i < N; i++) { w[i] = (0.94 * w[i] + (0.06 / (N - 1)) * (1 - w[i])) * Math.exp(ll[i] - top); sum += w[i]; }
    let best = 0;
    for (let i = 0; i < N; i++) { w[i] /= sum; if (w[i] > w[best]) best = i; }
    // a hypothesis that has lost all weight restarts from the best one
    for (let i = 0; i < N; i++) if (w[i] < 0.01) { this.s[i].set(this.s[best]); this.P[i].set(this.P[best]); }
  }

  /** Where the pointer is expected in tau seconds (px, py) and how uncertain that is (sigma). */
  predict(tau: number) {
    const { F, T, Pp, mx, my, tr, w } = this;
    let px = 0, py = 0;
    for (let i = 0; i < N; i++) {
      const s = this.s[i];
      fillF(i, tau, this.omega, F);
      mx[i] = F[0] * s[0] + F[1] * s[1] + F[2] * s[2] + F[3] * s[3];
      my[i] = F[4] * s[0] + F[5] * s[1] + F[6] * s[2] + F[7] * s[3];
      propagate(F, this.P[i], tau, ACCEL[i], Pp, T);
      tr[i] = (Pp[0] + Pp[5]) / 2;
      px += w[i] * mx[i]; py += w[i] * my[i];
    }
    // each filter's own uncertainty, plus the disagreement between hypotheses
    let variance = 0;
    for (let i = 0; i < N; i++) variance += w[i] * (tr[i] + ((mx[i] - px) ** 2 + (my[i] - py) ** 2) / 2);
    this.px = px; this.py = py; this.sigma = Math.sqrt(variance);
  }
}
