import { Directory, File } from 'expo-file-system';
import { Zip, ZipDeflate } from 'fflate';

/**
 * I created this class after a lot debugging with ChatGPT.
 * I needed to zip in the harded way for a single reason:
 * You can't create [Content_Types].xml with the file system,
 * since the brackets are not allowed in file names.
 */
export class ZipService {

  /**
   * Create a zip file from all contents inside a folder.
   * The output zip file will be created inside the `outputPath` folder.
   * @Warning files that has `[` or `]` must be mapped manually inside `private ZipService.addFilesRecursive`
   */
  static async zipPathContents(o: {
    sourcePath: string;
    outputPath: string;
    filename: string;
  }) {
    const { sourcePath, outputPath } = o;

    const outputFile = new File(`${outputPath}/${o.filename}`);
    const writable = outputFile.writableStream();
    const writer = writable.getWriter();

    const zip = new Zip(async (err, data, final) => {
      if (err) throw err;
      if (data && data.length > 0) {
        await writer.write(data);
      }
      if (final) {
        await writer.close();
      }
    });

    await this.addFilesRecursive({
      zip,
      currentPath: sourcePath,
      basePath: sourcePath,
      fileName: o.filename,
    });

    zip.end(); // signals completion
  }

  /**
   * Read all files recursively in the folder
   */
  private static async addFilesRecursive(o: {
    zip: Zip;
    currentPath: string;
    basePath: string;
    fileName: string;
  }) {
    const { zip, currentPath, basePath, fileName } = o;
    const dir = new Directory(currentPath);
    const items = dir.list();
    const CHUNK_SIZE = 2 * 1024 * 1024; // 2 MB

    for (const item of items) {
      const itemPath = `${currentPath}/${item.name}`;

      // Skip the output ZIP file itself
      if (item.name === fileName || itemPath.endsWith(`/${fileName}`)) {
        continue;
      }

      if (item instanceof File) {
        let relative = itemPath.replace(basePath + '/', '');
        if (relative === 'Content_Types.xml') relative = '[Content_Types].xml';

        const file = new File(itemPath);
        const stream = file.readableStream();
        const reader = stream.getReader();

        const deflater = new ZipDeflate(relative);
        zip.add(deflater);

        let leftover = new Uint8Array(0);

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          // Combine leftover + current chunk
          const tmp = new Uint8Array(leftover.length + value.length);
          tmp.set(leftover, 0);
          tmp.set(value, leftover.length);

          let offset = 0;
          while (tmp.length - offset >= CHUNK_SIZE) {
            const chunk = tmp.slice(offset, offset + CHUNK_SIZE);
            deflater.push(chunk, false);
            offset += CHUNK_SIZE;
          }

          leftover = tmp.slice(offset);
        }

        // push remaining bytes and mark final
        deflater.push(leftover, true);
      } else if (item instanceof Directory) {
        await this.addFilesRecursive({ ...o, currentPath: itemPath });
      }
    }
  }
}
