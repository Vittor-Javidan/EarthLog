import { ModalConfig } from '@V2/Types/AppTypes';

export class PopUpAPI {

  private static showModalSetter: React.Dispatch<React.SetStateAction<boolean>> | null = null;
  private static alertModalConfigSetter: React.Dispatch<React.SetStateAction<ModalConfig>> | null = null;
  private static onAcceptCallback: (() => void) | null = null;

  private static setShowModal(boolean: boolean) {
    if (this.showModalSetter !== null) {
      this.showModalSetter(boolean);
    }
  }

  private static setConfig(modalConfig: ModalConfig) {
    if (this.alertModalConfigSetter !== null) {
      this.alertModalConfigSetter(modalConfig);
    }
  }

  static registerAlertShowSetter(
    setter: React.Dispatch<React.SetStateAction<boolean>>
  ) {
    this.showModalSetter = setter;
  }

  static registerAlertModalConfigSetter(
    setter: React.Dispatch<React.SetStateAction<ModalConfig>>
  ) {
    this.alertModalConfigSetter = setter;
  }

  static async handleAlert(
    trigger: boolean,
    modalConfig: ModalConfig,
    onAcceptCallback: () => void
  ) {

    if (!trigger) {
      onAcceptCallback();
      return;
    }

    this.onAcceptCallback = onAcceptCallback;
    this.setConfig(modalConfig);
    this.setShowModal(true);
  }

  static runAcceptCallback() {
    if (this.onAcceptCallback !== null) {
      this.onAcceptCallback();
      this.onAcceptCallback = null;
    }
  }
}
