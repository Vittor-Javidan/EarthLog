/**
 * Used for tutorials purposes only
 * Generates a small random number between -0.1 and 0.1, excluding zero
 */
export function gpsTutorialCoodinateMask(): number {
  const sign = Math.random() < 0.5 ? -1 : 1; // randomly choose negative or positive
  const value = Math.random() * (0.1 - 0.01) + 0.01; // random between 0.01 and 0.1
  return sign * value;
}