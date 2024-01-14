import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DEFAULT_VERSION  = 'V1'; // Version to start when version is not define on local storage.
type AvailableVersions = 'V1' | 'V2';

export default class VersionManager {

  private static SELECTED_VERSION_LOCAL_STORAGE_KEY = 'AppSelectedVersion';

  static async selectLTSVersion() {
    try {
      const ltsVersion = await AsyncStorage.getItem(this.SELECTED_VERSION_LOCAL_STORAGE_KEY);
      const navController = useRouter();
      try {
        navController.push(`/${ltsVersion ?? DEFAULT_VERSION}`);
      } catch (error) {
        alert(`Was not possible to start the version ${ltsVersion}`);
      }
    } catch (error) {
      alert('Was not possible to start the app');
    }
  }

  static async switchVersion(version: AvailableVersions) {
    try {
      const navController = useRouter();
      navController.push(`/${version}`);
      await AsyncStorage.setItem(this.SELECTED_VERSION_LOCAL_STORAGE_KEY, version);
    } catch (error) {
      alert(`Was not possible to switch to version ${version}`);
    }
  }
}

/* HOW TO CREATE A NEW LTS VERSION?

  1: Add the new version into 'AvailableVersions' type present in this file.
  2: Copy and paste the last V folders inside app and src folders, but with the new version name.
  3: Define the Version on {LTS_VERSION_NAME}/Globals/Version.ts file present inside the copied V folders.
  4: Copy and paste the new alias for absolute imports for the new LTS version, and fix all imports of the copied V folders to the new LTS Version.
  5: Add a button on VersionChangeScreen of the new version for each pre-existed version to allow anyone on any version to switch between the versions without getting stuck.
*/
