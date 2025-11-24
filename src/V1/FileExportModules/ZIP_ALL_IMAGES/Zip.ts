import { ImageManipulator, SaveFormat } from 'expo-image-manipulator'

import {
  LanguageTag
} from '@V1/Types';

import { path } from "@V1/Globals/Path";
import { FileSystemService } from "@V1/Services_Core/FileSystemService";
import { ZipService } from '../Core/Zip';

export class ZipImages {

  static tempDirectory =  path.getDir().TEMP();
  static exportDirectory =  path.getDir().EXPORTED_FILES();
  static allImagesFilePath: string = "";
  static imageFiles: string[] = [];

  static setImageFilePath(id_project: string) {
    this.allImagesFilePath = path.getDir().PROJECTS.PROJECT.MEDIA.PICTURES(id_project);
  }


  /**
   * @WARNING Requires `setImageFilePath` to be called first
   */
  static listImageFiles() {
    this.imageFiles = Zip_Utils.listImageFiles(this.allImagesFilePath);
  }

  static async compressImages(o: {
    imageQuality: 'no compress' | 'High' | 'Medium' | 'Low'
  }) {
    const { imageQuality } = o;
    if (imageQuality === 'no compress') {
      return;
    }

    for (const fileName of this.imageFiles) {
      const originalFilePath = `${this.allImagesFilePath}/${fileName}`;
      const context = ImageManipulator.manipulate(originalFilePath)

      switch (imageQuality) {
        case 'High': context.resize({ width: 1920 }); break;
        case 'Medium': context.resize({ width: 800 }); break;
        case 'Low': context.resize({ width: 400 }); break;
      }

      const ref = (await context.renderAsync()).saveAsync({
        base64: true,
        compress: 0.8,
        format: SaveFormat.JPEG,
      })

      const data = FileSystemService.readFile({
        directory: (await ref).uri,
        encoding: 'base64'
      });

      if (!data) {
        throw new Error(`Failed to read manipulated image file: ${(await ref).uri}`);
      }

      FileSystemService.writeFile({
        directory: `${this.tempDirectory}/${fileName}`,
        encoding: 'base64',
        data: data,
      })
    }
  }

  static async createZipFile(o: {
    fileName: string
    imageQuality: 'no compress' | 'High' | 'Medium' | 'Low'
    language?: LanguageTag
    feedback?: (message: string) => void
  }): Promise<string> {

    const { fileName, imageQuality, language, feedback } = o
    const extension = 'zip';
    const newFileName = FileSystemService.handleDuplicatedFileNames({
      fileName, extension,
      directory: this.exportDirectory,
    });

    const noCompress = imageQuality === 'no compress';

    noCompress
    ? await ZipService.zipPathContents({
      language, feedback,
      sourcePath: this.allImagesFilePath,
      outputPath: this.exportDirectory,
      fileName: `${newFileName}.${extension}`,
      enableFeedback: noCompress,
    })
    : await ZipService.zipPathContents({
      sourcePath: this.tempDirectory,
      outputPath: this.exportDirectory,
      fileName: `${newFileName}.${extension}`,
    })

    return `${this.exportDirectory}/${newFileName}.${extension}`;
  }

  static finish() {
    this.allImagesFilePath = "";
    this.imageFiles = [];
  }
}

class Zip_Utils {
  static listImageFiles(imagesFilePath: string): string[] {
    const imageFiles = FileSystemService.readDirectory({ directory: imagesFilePath });
    if (!imageFiles) {
      throw new Error(`Images directory not found: ${imagesFilePath}`);
    }
    return imageFiles;
  }
}