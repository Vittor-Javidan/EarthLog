export class CompassAPI {

  private static showCompassSetter:  React.Dispatch<React.SetStateAction<boolean>> | null = null;

  static registerShowCompassSetter(setter: React.Dispatch<React.SetStateAction<boolean>>) {
    this.showCompassSetter = setter;
  }

  static toggleCompass() {
    if (this.showCompassSetter !== null) {
      this.showCompassSetter((prev) => !prev);
    }
  }
}