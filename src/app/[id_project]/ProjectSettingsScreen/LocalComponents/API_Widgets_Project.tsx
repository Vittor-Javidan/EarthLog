export default class API_Widgets_Project {

  private static SETTER_KEY = 'ProjectSettingsScreen_Widgets';
  private static registeredSetters: Record<string, React.Dispatch<React.SetStateAction<boolean>>> = {};

  static setterRegister(setter: React.Dispatch<React.SetStateAction<boolean>>) {
    this.registeredSetters[this.SETTER_KEY] = setter;
  }

  static refresh() {
    this.registeredSetters[this.SETTER_KEY](prev => !prev);
  }
}