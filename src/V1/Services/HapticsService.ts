import * as Vibration from 'expo-haptics';
import ConfigService from './ConfigService';

type VibrationType = 'success' | 'warning'

export default class HapticsService {

  static vibrate(type: VibrationType): void {
    switch (type) {
      case 'success': {
        if (ConfigService.config.onlyWarningVibrations === false) {
          Vibration.notificationAsync(Vibration.NotificationFeedbackType.Success);
        }
        break;
      }
      case 'warning': Vibration.notificationAsync(Vibration.NotificationFeedbackType.Warning); break;
    }
  }
}
