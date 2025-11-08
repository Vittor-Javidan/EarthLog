import { Scope } from "@V2/Globals/NavigationControler";

/**
 * @Warning This API is meant to be used by components that do not share the same
 * layer.
 */
export class ControllerAPI {

  private static scopeSetter: React.Dispatch<React.SetStateAction<Scope>> | null = null;

  static registerScopeSetter(setter: React.Dispatch<React.SetStateAction<Scope>>) {
    this.scopeSetter = setter;
  }

  static changeScope(newScope: Scope) {
    if (this.scopeSetter !== null) {
      this.scopeSetter(newScope);
    }
  }
}