/**
 * Extract RGB values from HEX color
 *
 * @param {string} hex #color
 * @returns {number[]} RGB values
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

  // Convert to RGB values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return [r, g, b];
}

/**
 * Convert HEX color into RGB color
 *
 * @param {string} hex #color
 * @returns {string} rbg(color)
 */
export function hexToRgbStr(hex: string): string {
  const [r, g, b] = hexToRgb(hex);
  return `rgb(${r}, ${g}, ${b})`;
}

/**
 * Retrieve HEX color from RGB values
 *
 * @param {number} r red value
 * @param {number} g green value
 * @param {number} b blue value
 * @returns {string} #color
 */
export function rgbToHex(r: number, g: number, b: number): string {
  /**
   * Convert each value to a hexadecimal,
   * then ensure it's 2 chars long
   */
  const toHex = (value: number): string => value.toString(16).padStart(2, '0');

  return `#${[r, g, b].map(toHex).join('')}`;
}

function rgbFromStr(rgbStr: string): number[] {
  // Extract the numbers from the RGB string
  const values = rgbStr.match(/\d+/g);

  if (!values || values.length !== 3) {
    throw new Error('Invalid RGB Color String');
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
  const [r, g, b] = rgbFromStr(rgbStr);
  return rgbToHex(r, g, b);
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

export function isLightColor(color: string): boolean {
  return isLightOrDarkColor(color) === 'light';
}

export function isDarkColor(color: string): boolean {
  return isLightOrDarkColor(color) === 'dark';
}
