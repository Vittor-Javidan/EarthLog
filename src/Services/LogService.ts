export default class LogService {

  static timesCalled: number = 1;

  static useLog(message: string) {
    console.log(`${this.timesCalled}: ${message}`);
    this.timesCalled += 1;
  }
}
