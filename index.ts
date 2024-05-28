/**
 * Convert alpha value into HEX value
 *
 * @param {number} alpha 0 < 1
 * @returns {string} #alpha
 */
export function alphaToHex(alpha: number): string {
  if (alpha < 0 || alpha > 1) {
    throw new Error('Alpha Value Must Be Between 0-1');
  }

  // Scale alpha to the range 0-255, and round to the nearest integer
  return Math.round(alpha * 255)
    .toString(16)
    .padStart(2, '0');
}

/**
 * This is a capturing group that matches:
 * starts with (`^`) and ends with (`$`) exactly two characters (`{2}`),
 * that are either digits (`0-9`), lowercase letters (`a-f`), or uppercase letters (`A-F`)
 */
const TWO_DIGIT_HEX_RE = /^([0-9a-fA-F]{2})$/;

/**
 * Extract RGB(A) values from HEX color
 *
 * @param {string} hex #color
 * @returns {number[]} RGB(A) values
 */
export function hexToRgb(hex: string): number[] {
  // Remove the hash (at the start)
  hex = hex.replace(/^#/, '');

  // Expand 3-digit HEX to 6-digit
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map(v => v + v)
      .join('');
  }

  const rStr = hex.substring(0, 2);
  const gStr = hex.substring(2, 4);
  const bStr = hex.substring(4, 6);

  // Ensure HEX values are valid two-character strings
  if (!TWO_DIGIT_HEX_RE.test(rStr) || !TWO_DIGIT_HEX_RE.test(gStr) || !TWO_DIGIT_HEX_RE.test(bStr)) {
    throw new Error('Incorrect HEX Color Format');
  }

  // Convert to RGB values
  const r = parseInt(rStr, 16);
  const g = parseInt(gStr, 16);
  const b = parseInt(bStr, 16);

  const aStr = hex.substring(6, 8);

  // Ensure the HEX value is a valid two-character string
  if (TWO_DIGIT_HEX_RE.test(aStr)) {
    const value = parseInt(aStr, 16);

    // Scale the value to the range 0-1, and round to the second decimal
    const a = Math.round((value / 255) * 100) / 100;

    return [r, g, b, a];
  }

  return [r, g, b];
}

/**
 * Convert HEX color into RGB color
 *
 * @param {string} hex #color
 * @returns {string} rbg(color)
 */
export function hexToRgbStr(hex: string): string {
  const [r, g, b, a] = hexToRgb(hex);
  const rgb = `${r}, ${g}, ${b}`;

  if (a) return `rgba(${rgb}, ${a})`;
  return `rgb(${rgb})`;
}

/**
 * Retrieve HEX color from RGB values
 *
 * @param {number} r red value
 * @param {number} g green value
 * @param {number} b blue value
 * @param {number} a alpha value
 * @returns {string} #color
 */
export function rgbToHex(r: number, g: number, b: number, a?: number): string {
  /**
   * Convert each value to a hexadecimal,
   * then ensure it's 2 chars long
   */
  const toHex = (value: number): string => value.toString(16).padStart(2, '0');

  let hex = `#${[r, g, b].map(toHex).join('')}`;
  if (a) hex += alphaToHex(a);
  return hex;
}

function rgbFromStr(rgbStr: string): number[] {
  // Extract the numbers from the RGB string
  const values = rgbStr.match(/\d+\.?\d+/g);

  if (!values || values.length < 3 || values.length > 4) {
    throw new Error('Invalid RGB(A) Color String');
  }

  // Convert each value to an integer
  return values.map(Number);
}

/**
 * Convert RGB color into HEX color
 *
 * @param {string} rgbStr rbg(color)
 * @returns {string} #color
 */
export function rgbStrToHex(rgbStr: string): string {
  const [r, g, b, a] = rgbFromStr(rgbStr);
  return rgbToHex(r, g, b, a);
}

/** Convert RGB values to relative luminance */
function getLuminance(r: number, g: number, b: number) {
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
}

/**
 * Check if the color is 'light' or 'dark' based on threshold
 *
 * @param {string} color HEX or RGB color
 * @returns {string} 'light' | 'dark'
 */
export function isLightOrDarkColor(color: string): string {
  if (!color.startsWith('#') && !color.startsWith('rgb')) {
    throw new Error('Unable To Get Luminance');
  }

  let luminance!: number;

  if (color.startsWith('#')) {
    const [r, g, b] = hexToRgb(color);
    luminance = getLuminance(r, g, b);
  }

  if (color.startsWith('rgb')) {
    const [r, g, b] = rgbFromStr(color);
    luminance = getLuminance(r, g, b);
  }

  return luminance > 0.5 ? 'light' : 'dark'; // luminance <= 0.5 === dark
}

/** Check if the color is 'light' based on threshold */
export function isLightColor(color: string): boolean {
  return isLightOrDarkColor(color) === 'light';
}

/** Check if the color is 'dark' based on threshold */
export function isDarkColor(color: string): boolean {
  return isLightOrDarkColor(color) === 'dark';
}
