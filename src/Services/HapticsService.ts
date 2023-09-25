import * as Vibration from 'expo-haptics';

type VibrationType = 'success' | 'warning'

export default class HapticsService {

  static vibrate(type: VibrationType) {
    switch (type) {
      case 'success': Vibration.notificationAsync(Vibration.NotificationFeedbackType.Success); break;
      case 'warning': Vibration.notificationAsync(Vibration.NotificationFeedbackType.Warning); break;
    }
  }
}
