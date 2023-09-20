import React, { useMemo, useState } from 'react';
import { Pressable } from 'react-native';
import * as Vibration from 'expo-haptics';

import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';

import { Icon } from '@Icon/index';
import { Text } from '@Text/index';
import { GPSInputTheme } from '../ThemeType';

export default function ManualInputButton(props: {
  theme: GPSInputTheme
	onPress: () => void
}): JSX.Element {

	const { theme } = props;
  const { language } = useMemo(() => ConfigService.config, []);
  const R = useMemo(() => translations.Input.GPSInput[language], []);
	const [pressed, setPressed] = useState<boolean>(false);

  function onPressIn() {
    setPressed(true);
    Vibration.notificationAsync(Vibration.NotificationFeedbackType.Success);
  }

  function onPressOut() {
    setPressed(false);
    Vibration.notificationAsync(Vibration.NotificationFeedbackType.Success);
  }

	return (
		<Pressable
			onPressIn={() => onPressIn()}
			onPressOut={() => { onPressOut(); }}
			onPress={() => props.onPress()}
			style={{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 40,
        paddingVertical: 5,
				paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: theme.font,
        borderRadius: 10,
				backgroundColor: pressed ? theme.background : theme.font,
			}}
		>
      <Text.Root
				style={{
					fontSize: 200,
          color: pressed ? theme.font : theme.background,
				}}
			>
				{R['Manual']}
			</Text.Root>
      <Icon
        iconName="pencil-sharp"
        color={pressed ? theme.font : theme.background}
      />
		</Pressable>
  );
}
