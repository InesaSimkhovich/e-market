export default class Formatter {
  static convertDollarToRuble(dollar, rubleRate) {
    return +(dollar * rubleRate).toFixed(2);
  }
}
