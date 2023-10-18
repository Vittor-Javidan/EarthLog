import { Document, Packer } from 'docx';

import FileExportService from '@Services/FileExportService';
import DataProcessService from '@APIServices/DataProcessService';
import { document_Project } from './ProjectDocument';
import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';

export default class DOCX_Module {

  private static async shareFile(filename: string, document: Document ) {
    const fileData = await Packer.toBase64String(document);
    await FileExportService.shareFile(`${filename}.docx`, fileData);
  }

  static async buildAndShare_Project(id_project: string, fileName: string, feedback: (message: string) => void) {

    const RS = translations.FileExportModules.share[ConfigService.config.language];

    const projectDTO = await DataProcessService.buildProjectFromDatabase(id_project,
      (feedbackMessage) => feedback(feedbackMessage)
    );

    feedback(RS['Mounting document']);
    const document = new Document({
      sections: [{
        children: [ ...document_Project(projectDTO) ],
      }],
    });

    feedback(RS['Sharing document']);
    await this.shareFile(fileName, document);
  }
}
