/**
 * Clamps a number
 *
 * @param {Number} value
 * @param {Number} max
 * @param {Number} min
 */
export default function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

