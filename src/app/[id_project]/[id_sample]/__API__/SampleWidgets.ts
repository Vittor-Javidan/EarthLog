export default class SampleWidgets {

  private static SETTER_KEY = 'SampleScreen_Widgets';
  private static registeredSetters: Record<string, React.Dispatch<React.SetStateAction<boolean>>> = {};

  static setterRegister(setter: React.Dispatch<React.SetStateAction<boolean>>) {
    this.registeredSetters[this.SETTER_KEY] = setter;
  }

  static refresh() {
    this.registeredSetters[this.SETTER_KEY](prev => !prev);
  }
}
