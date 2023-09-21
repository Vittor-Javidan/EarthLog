// import { ThemeDTO } from '@Types/AppTypes';
// import ConfigService from '@Services/ConfigService';
// import ThemeService from '@Services/ThemeService';

// export default class ExampleFigureAPI {

//   private static SETTER_KEY = 'Example Figure';
//   private static registeredSetters: Record<string, React.Dispatch<React.SetStateAction<boolean>>> = {};

//   static temporaryConfig: ThemeDTO | null = null;

//   static setterRegister(setter: React.Dispatch<React.SetStateAction<boolean>>, theme: ThemeDTO) {
//     if (this.temporaryConfig === null) {
//       this.temporaryConfig = { ...theme };
//     }
//     this.registeredSetters[this.SETTER_KEY] = setter;
//   }

//   static update(key: keyof ThemeDTO, value: string) {
//     if (this.temporaryConfig !== null) {
//       this.temporaryConfig[key] = value;
//       this.registeredSetters[this.SETTER_KEY](prev => !prev);
//     }
//   }

//   static reset() {
//     if (this.temporaryConfig !== null) {
//       this.temporaryConfig = { ...ThemeService.default };
//       this.registeredSetters[this.SETTER_KEY](prev => !prev);
//     }
//   }

//   static discart() {
//     if (this.temporaryConfig !== null) {
//       this.temporaryConfig = { ...ConfigService.config.theme };
//       this.registeredSetters[this.SETTER_KEY](prev => !prev);
//     }
//   }

//   static async save() {
//     if (this.temporaryConfig !== null) {
//       ConfigService.config.theme = { ...this.temporaryConfig };
//       await ConfigService.saveConfig();
//     }
//   }
// }
