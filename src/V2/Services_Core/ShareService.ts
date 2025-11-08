import * as Sharing from 'expo-sharing';

/**
 * This class is not suppose to be used directly on UI
 */
export class ShareService {

  static async share(o: {
    directory: string
  }): Promise<void> {
    const { directory } = o;
    await Sharing.shareAsync(directory);
  }
}
