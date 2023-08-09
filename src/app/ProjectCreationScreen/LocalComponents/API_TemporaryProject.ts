import ProjectService from '@Services/ProjectService';
import { ProjectDTO } from '@Types/index';

export default class API_TemporaryProject {

  static project: ProjectDTO = ProjectService.getDefaultProjectTemplate();

  static reset() {
    this.project = ProjectService.getDefaultProjectTemplate();
  }
}
