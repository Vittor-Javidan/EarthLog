import ConfigService from '@Services/ConfigService';
import ThemeService from '@Services/ThemeService';
import { ThemeDTO } from '@Types/index';

export default class API_ExampleFigure {

  private static SETTER_KEY = 'Example Figure';
  private static registeredSetters: Record<string, React.Dispatch<React.SetStateAction<boolean>>> = {};

  static temporaryConfig: ThemeDTO | null = null;
  static unsavedChanges: boolean = false;

  static setterRegister(setter: React.Dispatch<React.SetStateAction<boolean>>, theme: ThemeDTO) {
    if (this.temporaryConfig === null) {
      this.temporaryConfig = { ...theme };
    }
    this.registeredSetters[this.SETTER_KEY] = setter;
  }

  static update(key: keyof ThemeDTO, value: string) {
    if (this.temporaryConfig !== null) {
      this.temporaryConfig[key] = value;
      this.registeredSetters[this.SETTER_KEY](prev => !prev);
      this.unsavedChanges = true;
    }
  }

  static reset() {
    if (this.temporaryConfig !== null) {
      this.temporaryConfig = { ...ThemeService.default };
      this.registeredSetters[this.SETTER_KEY](prev => !prev);
      this.unsavedChanges = true;
    }
  }

  static discart() {
    if (this.temporaryConfig !== null) {
      this.temporaryConfig = { ...ConfigService.config.theme };
      this.unsavedChanges = false;
    }
  }

  static async save() {
    if (this.temporaryConfig !== null) {
      ConfigService.config.theme = { ...this.temporaryConfig };
      await ConfigService.saveConfig();
      this.unsavedChanges = false;
    }
  }
}
