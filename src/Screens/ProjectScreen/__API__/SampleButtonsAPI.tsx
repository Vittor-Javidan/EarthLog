export default class SampleButtonsAPI {

  private static refreshSetter: React.Dispatch<React.SetStateAction<boolean>> | null = null;

  static registerRefreshSetter(setter: React.Dispatch<React.SetStateAction<boolean>>) {
    this.refreshSetter = setter;
  }

  static refresh() {
    if (this.refreshSetter !== null) {
      this.refreshSetter(prev => !prev);
    }
  }
}
