import { ConfigDTO, ImageQuality } from '@V2/Types/AppTypes';

import { translations } from '@V2/Translations/index';
import { ShareService } from '@V2/Services_Core/ShareService';
import { FileSystemService } from '@V2/Services_Core/FileSystemService';
import { ProjectService } from '@V2/Services/ProjectService';

import { Docx } from './Docx';
import { document_Project } from './ProjectDocument';

export default class DOCX_Module {

  static async buildAndShare_Project(o: {
    id_project: string,
    fileName: string,
    imageQuality: Exclude<ImageQuality, 'no compress'>,
    config: ConfigDTO,
    feedback: (message: string) => void
    onFinish: () => void
    onError: (message: string) => void
  }) {

    const R = translations.FileExportModules.docx[o.config.language];

    try {
      /*
        This is low level coding logics. All steps must be followed in order.
      */

      o.feedback(R['Quality selected: '] + o.imageQuality);
      o.feedback(R['Resetting temporary directory']);
      FileSystemService.resetTempDirectory();
      Docx.setImageFilePath(o.id_project);
      Docx.listImageFiles();

      o.feedback(R['Creating Word folder']);
      Docx.createWordFolder();

      o.feedback(R['Creating content types file']);
      Docx.createContentTypesFile();

      o.feedback(R['Creating relationship folder']);
      Docx.createRelationshipFolder();

      o.feedback('Creating web settings file');
      Docx.createwebSettingsFile();

      o.feedback(R['Creating relationship file']);
      Docx.createRelationshipFile();

      o.feedback(R['Copying image files']);
      await Docx.copyImageFilesToMediaFolder({
        imageQuality: o.imageQuality
      })

      o.feedback(R['Creating document content']);
      Docx.createDocumentFile(
        await document_Project({
          config: o.config,
          projectDTO: await ProjectService.buildProjectDTO(o),
        })
      );

      o.feedback(R['Creating DOCX file']);
      const directory = await Docx.createDocxFile({
        fileName: o.fileName
      });

      Docx.finish()

      o.feedback(R['Preparing to share document']);
      await ShareService.share({ directory })

      o.onFinish()

    } catch (error) {
      FileSystemService.resetTempDirectory();
      Docx.finish()
      let erroMessage = R['Try reducing export image quality. error: ']
      erroMessage += error instanceof Error ? error.message : JSON.stringify(error)
      o.onError(erroMessage); 
    }
  }
}
