// Build geometry once. Runtime rotation, lighting and projection run on the GPU.
const TAU = Math.PI * 2;
const add = (a, b) => a.map((v, i) => v + b[i]);
const subtract = (a, b) => a.map((v, i) => v - b[i]);
const multiply = (v, k) => v.map(n => n * k);
const dot = (a, b) => a.reduce((sum, n, i) => sum + n * b[i], 0);
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const normalize = v => multiply(v, 1 / (Math.hypot(...v) || 1));
const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

function center(t) {
  return [.55 * (2 + Math.cos(3 * t)) * Math.cos(2 * t), .55 * (2 + Math.cos(3 * t)) * Math.sin(2 * t), .55 * Math.sin(3 * t)];
}

export function buildKnotGeometry(segments = 112, sides = 14) {
  if (!Number.isInteger(segments) || !Number.isInteger(sides) || segments < 12 || sides < 4) throw new Error('Invalid mesh dimensions');
  const vertices = [];
  const normals = [];
  const faces = [];
  for (let i = 0; i < segments; i++) {
    const t = (i / segments) * TAU;
    const c = center(t);
    const previous = center(t - .001);
    const next = center(t + .001);
    const tangent = normalize(subtract(next, previous));
    const second = add(subtract(next, multiply(c, 2)), previous);
    const normal = normalize(subtract(second, multiply(tangent, dot(second, tangent))));
    const binormal = normalize(cross(tangent, normal));
    for (let j = 0; j < sides; j++) {
      const a = j / sides * TAU;
      const outward = add(multiply(normal, Math.cos(a)), multiply(binormal, Math.sin(a)));
      vertices.push(add(c, multiply(outward, .32)));
      normals.push(outward);
    }
  }
  for (let i = 0; i < segments; i++) {
    for (let j = 0; j < sides; j++) {
      const a = i * sides + j;
      const b = ((i + 1) % segments) * sides + j;
      const c = ((i + 1) % segments) * sides + ((j + 1) % sides);
      const d = i * sides + ((j + 1) % sides);
      const ids = [a, b, c, d];
      faces.push({ ids, normal: normalize(ids.reduce((n, id) => add(n, normals[id]), [0, 0, 0])) });
    }
  }
  return { vertices, normals, faces };
}

export function rotatePoint([x, y, z], ax, ay, az) {
  const ca = Math.cos(ax), sa = Math.sin(ax), cb = Math.cos(ay), sb = Math.sin(ay), cc = Math.cos(az), sc = Math.sin(az);
  const y1 = y * ca - z * sa, z1 = y * sa + z * ca;
  const x2 = x * cb + z1 * sb, z2 = -x * sb + z1 * cb;
  return [x2 * cc - y1 * sc, x2 * sc + y1 * cc, z2];
}

export function projectPoint([x, y, z], width, height) {
  const size = Math.min(width, height);
  const scale = size * 1.35 / Math.max(.25, 6 - z);
  return [width * .52 + x * scale, height * .50 - y * scale];
}

