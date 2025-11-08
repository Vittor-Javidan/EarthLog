import { LanguageTag } from "@V2/Types/AppTypes"
import { ZipImages } from "./Zip"
import { FileSystemService } from "@V2/Services_Core/FileSystemService"
import { ShareService } from "@V2/Services_Core/ShareService"
import { translations } from "@V2/Translations/index"
import { sleep } from "@V2/Globals/Sleep"

export class ZIP_IMAGES_Module {

  static async buildAndShare_ProjectImages(o: {
    id_project: string,
    fileName: string,
    imageQuality: 'no compress' | 'High' | 'Medium' | 'Low',
    language: LanguageTag,
    feedback: (message: string) => void
    onFinish: () => void
    onError: (message: string) => void
  }) {
    const { imageQuality, fileName } = o;
    const R = translations.FileExportModules.zipImages[o.language];
    try {

      FileSystemService.resetTempDirectory();
      ZipImages.setImageFilePath(o.id_project);
      ZipImages.listImageFiles();

      imageQuality === 'no compress'
      ? o.feedback(R['skipping image compression'])
      : o.feedback(R['compressing images']);
      await ZipImages.compressImages({ imageQuality });

      o.feedback(R['creating zip file']);
      if (imageQuality === 'no compress') { await sleep(100); }
      const directory = await ZipImages.createZipFile({
        fileName: fileName,
        imageQuality: imageQuality,
        language: o.language,
        feedback: (message: string) => o.feedback(message)
      })

      ZipImages.finish();

      o.feedback(R['Preparing to share file']);
      await ShareService.share({ directory })

      o.onFinish()

    } catch (error) {
      FileSystemService.resetTempDirectory();
      ZipImages.finish();
      let erroMessage = R['Try reducing export image quality. error: ']
      erroMessage += error instanceof Error ? error.message : JSON.stringify(error)
      o.onError(erroMessage); 
    }
  }
}