/**
 * This class is not suppose to be part of any block of code permanently.
 * Use its methods, but always remember to remove it after.
 */
export default class DevTools {

  static timesCalled: number = 1;


  /**
   * @WARNING NEVER commit with this set to true
   * Use this to enable tutorial mode, which adds small random offsets to GPS coordinates
   * for streaming and video recording purposes only.
   * 
   * If this is set to true, make sure to set it back to false before committing.
   */
  static TUTORIAL_MODE: boolean = false

  /**
   * Use this to count the amount of rerenders to a specífic scope.
   */
  static useLog(message: string) {
    console.log(`${this.timesCalled}: ${message}`);
    this.timesCalled += 1;
  }

  /**
   * Used for tutorials purposes only
   * Generates a small random number between -0.1 and 0.1, excluding zero
   */
  static gpsTutorialCoodinateMask(): number {
  const sign = Math.random() < 0.5 ? -1 : 1; // randomly choose negative or positive
  const value = Math.random() * (0.1 - 0.01) + 0.01; // random between 0.01 and 0.1
  return sign * value;
}
}
