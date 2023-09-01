import { Alert } from 'react-native';
import * as Vibration from 'expo-haptics';

export async function useCheckBoxAlert(
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
      ? 'If you procceed you gonna erase current coordinate saved data. Are you sure?'
      : 'If you procceed you gonna erase current altitude saved data. Are you sure?',
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

export async function useEraseAlert(onErase: () => void) {
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

export async function useOvewritteDataAlert(onOverwritte: () => void) {
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
