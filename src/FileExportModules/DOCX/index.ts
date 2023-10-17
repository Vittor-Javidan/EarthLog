import { Document, Packer } from 'docx';

import FileExportService from '@Services/FileExportService';
import DataProcessService from '@APIServices/DataProcessService';
import { document_Project } from './ProjectDocument';

export default class DOCX_Module {

  private static async saveAndShare(filename: string, document: Document ) {
    const fileData = await Packer.toBase64String(document);
    await FileExportService.saveAndShare(`${filename}.docx`, fileData);
  }

  static async buildAndShare_Project(id_project: string, feedback: (message: string) => void) {

    const projectDTO = await DataProcessService.buildProjectFromDatabase(id_project,
      (feedbackMessage) => feedback(feedbackMessage)
    );

    feedback('Mounting document');
    const document = new Document({
      sections: [{
        children: [ ...document_Project(projectDTO) ],
      }],
    });

    feedback('Sharing document');
    await this.saveAndShare('HelloWorld', document);
  }
}
