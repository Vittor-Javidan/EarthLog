import { Alert } from 'react-native';
import * as Vibration from 'expo-haptics';

export async function alert_CheckBoxUncheck(
  checked: boolean,
  type: 'Coordinate' | 'Altitude',
  onCheckedTrue: () => void,
  onCheckedFalse: () => void
) {
  if (checked === false) {
    await Vibration.notificationAsync(Vibration.NotificationFeedbackType.Warning);
    Alert.alert(
      'Hold on!',
      type === 'Coordinate'
      ? 'This will delete current coordinates. Are you sure?'
      : 'This will delete current altitude. Are you sure?',
      [
        {
          text: 'No',
          onPress: async () => {
            await Vibration.notificationAsync(Vibration.NotificationFeedbackType.Success);
            return null;
          },
        },
        {
          text: 'Yes',
          onPress: async () => {
            await Vibration.notificationAsync(Vibration.NotificationFeedbackType.Warning);
            onCheckedFalse();
          },
        },
      ]
    );
    return;
  }
  onCheckedTrue();
}

export async function alert_EraseData(onErase: () => void) {
  await Vibration.notificationAsync(Vibration.NotificationFeedbackType.Warning);
  Alert.alert(
    'Hold on!',
    'Are you sure you want to delete all gps data?',
    [
      {
        text: 'No',
        onPress: async () => {
          await Vibration.notificationAsync(Vibration.NotificationFeedbackType.Success);
        },
      },
      {
        text: 'Yes',
        onPress: async () => {
          await Vibration.notificationAsync(Vibration.NotificationFeedbackType.Warning);
          onErase();
        },
      },
    ]
  );
}

export async function alert_OverwritteData(onOverwritte: () => void) {
  await Vibration.notificationAsync(Vibration.NotificationFeedbackType.Warning);
  Alert.alert(
    'Hold on!',
    'Are you sure you want to override current gps data?',
    [
      {
        text: 'No',
        onPress: async () => {
          await Vibration.notificationAsync(Vibration.NotificationFeedbackType.Success);
        },
      },
      {
        text: 'Yes',
        onPress: async () => {
          await Vibration.notificationAsync(Vibration.NotificationFeedbackType.Warning);
          onOverwritte();
        },
      },
    ]
  );
}
