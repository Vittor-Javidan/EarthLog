import { Document, Packer } from 'docx';

import { ConfigDTO } from '@Types/AppTypes';
import ProjectService from '@Services/ProjectService';
import ExportService from '@Services/ExportService';

import { document_Project } from './ProjectDocument';

export default class DOCX_Module {

  static async buildAndShare_Project(o: {
    id_project: string,
    fileName: string,
    config: ConfigDTO,
    feedback: (message: string) => void
  }) {

    const projectDTO = await ProjectService.buildProjectDTO(o);

    o.feedback('Mounting document');
    const document = new Document({
      sections: [{
        children: [
          ...await document_Project({
            config: o.config,
            projectDTO: projectDTO,
            feedback: (message) => o.feedback(message),
          }),
        ],
      }],
    });

    o.feedback('Sharing document');
    const fileData = await Packer.toBase64String(document);
    await ExportService.shareFile(`${o.fileName}.docx`, fileData, 'base64');
  }
}
