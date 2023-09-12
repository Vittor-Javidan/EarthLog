export default class AlertService {

  private static showModalSetter: React.Dispatch<React.SetStateAction<boolean>> | null = null;
  private static questionModalSetter: React.Dispatch<React.SetStateAction<string>> | null = null;

  private static onAcceptCallback: (() => void) | (() => Promise<void>) | null = null;

  private static setShowModal(boolean: boolean) {
    if (this.showModalSetter !== null) {
      this.showModalSetter(boolean);
    }
  }

  private static setQuestion(question: string) {
    if (this.questionModalSetter !== null) {
      this.questionModalSetter(question);
    }
  }

  static registterAlertShowSetter(
    setter: React.Dispatch<React.SetStateAction<boolean>>
  ) {
    this.showModalSetter = setter;
  }

  static registterQuestionSetter(
    setter: React.Dispatch<React.SetStateAction<string>>
  ) {
    this.questionModalSetter = setter;
  }

  static async handleAlert(trigger: boolean, question: string,  onAcceptCallback: (() => void) | (() => Promise<void>)) {

    if (!trigger) {
      await onAcceptCallback();
      return;
    }

    this.onAcceptCallback = onAcceptCallback;
    this.setQuestion(question);
    this.setShowModal(true);
  }


  static async runAcceptCallback() {
    if (this.onAcceptCallback !== null) {
      await this.onAcceptCallback();
    }
  }
}
