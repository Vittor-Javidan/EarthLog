import ProjectService from '@Services/ProjectService';
import { ProjectDTO } from '@Types/index';

export default class TemporaryProjectAPI {

  static project: ProjectDTO = ProjectService.getDefaultProjectTemplate();

  static reset() {
    this.project = ProjectService.getDefaultProjectTemplate();
  }
}
