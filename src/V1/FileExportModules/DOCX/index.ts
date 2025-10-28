import { ConfigDTO } from '@V1/Types/AppTypes';

import { translations } from '@V1/Translations/index';
import { ShareService } from '@V1/Services_Core/ShareService';
import { FileSystemService } from '@V1/Services_Core/FileSystemService';
import { path } from '@V1/Globals/Path'
import { ProjectService } from '@V1/Services/ProjectService';

import { Docx } from './Docx';
import { ZipService } from './Zip';
import { document_Project } from './ProjectDocument';

export default class DOCX_Module {

  static async buildAndShare_Project(o: {
    id_project: string,
    fileName: string,
    imageQuality: 'High' | 'Medium' | 'Low',
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

      Docx.finish()
      
      o.feedback(R['Creating DOCX file']);
      await ZipService.zipPathContents({
        sourcePath: path.getDir().TEMP(),
        outputPath: path.getDir().TEMP(),
        filename: `${o.fileName}.docx`,
      })

      o.feedback(R['Preparing to share document']);
      await ShareService.share({
        directory: `${path.getDir().TEMP()}/${o.fileName}.docx`,
      })

      o.onFinish()

    } catch (error) {
      FileSystemService.resetTempDirectory();
      let erroMessage = R['Try reducing export image quality. error: ']
      erroMessage += error instanceof Error ? error.message : JSON.stringify(error)
      o.onError(erroMessage); 
    }
  }
}
