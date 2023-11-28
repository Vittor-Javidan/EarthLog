import * as Sharing from 'expo-sharing';

/**
 * This class is not suppose to be used directly on UI
 */
export default class ShareService {

  static async share(filePath: string): Promise<void> {
    await Sharing.shareAsync(filePath);
  }
}
