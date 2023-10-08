import { ModalConfig } from '@Types/AppTypes';

export default class AlertService {

  private static showModalSetter: React.Dispatch<React.SetStateAction<boolean>> | null = null;
  private static alertModalConfigSetter: React.Dispatch<React.SetStateAction<ModalConfig>> | null = null;
  private static onAcceptCallback: (() => void) | (() => Promise<void>) | null = null;

  private static setShowModal(boolean: boolean) {
    if (this.showModalSetter !== null) {
      this.showModalSetter(boolean);
    }
  }

  private static setConfig(question: ModalConfig) {
    if (this.alertModalConfigSetter !== null) {
      this.alertModalConfigSetter(question);
    }
  }

  static registterAlertShowSetter(
    setter: React.Dispatch<React.SetStateAction<boolean>>
  ) {
    this.showModalSetter = setter;
  }

  static registterAlertModalConfigSetter(
    setter: React.Dispatch<React.SetStateAction<ModalConfig>>
  ) {
    this.alertModalConfigSetter = setter;
  }

  static async handleAlert(trigger: boolean, question: ModalConfig,  onAcceptCallback: (() => void) | (() => Promise<void>)) {

    if (!trigger) {
      await onAcceptCallback();
      return;
    }

    this.onAcceptCallback = onAcceptCallback;
    this.setConfig(question);
    this.setShowModal(true);
  }

  static async runAcceptCallback() {
    if (this.onAcceptCallback !== null) {
      await this.onAcceptCallback();
      this.onAcceptCallback = null;
    }
  }
}
