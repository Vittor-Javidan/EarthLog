import React, { useMemo, useState } from 'react';
import { Pressable } from 'react-native';

import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';
import ApticsService from '@Services/ApticsService';

import { Icon } from '@Icon/index';
import { Text } from '@Text/index';
import { GPSInputTheme } from '../ThemeType';

export default function ManualInputButton(props: {
  theme: GPSInputTheme
	onPress: () => void
}): JSX.Element {

  const config = useMemo(() => ConfigService.config, []);
  const R      = useMemo(() => translations.Input.GPSInput[config.language], []);
	const [pressed, setPressed] = useState<boolean>(false);

  function onPressIn() {
    setPressed(true);
    ApticsService.vibrate('success');
  }

  function onPressOut() {
    setPressed(false);
    ApticsService.vibrate('success');
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
        borderColor: props.theme.font,
        borderRadius: 10,
				backgroundColor: pressed ? props.theme.background : props.theme.font,
			}}
		>
      <Text.Root
				style={{
					fontSize: 200,
          color: pressed ? props.theme.font : props.theme.background,
				}}
			>
				{R['Manual']}
			</Text.Root>
      <Icon
        iconName="pencil-sharp"
        color={pressed ? props.theme.font : props.theme.background}
      />
		</Pressable>
  );
}
