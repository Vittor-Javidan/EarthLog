/**
 * This class is not suppose to be part of any block of code permanently.
 * Use its methods, but always remember to remove it after.
 */
export default class DevTools {

  static timesCalled: number = 1;

  /**
   * Use this to count the amount of rerenders to a specífic scope.
   */
  static useLog(message: string) {
    console.log(`${this.timesCalled}: ${message}`);
    this.timesCalled += 1;
  }
}
