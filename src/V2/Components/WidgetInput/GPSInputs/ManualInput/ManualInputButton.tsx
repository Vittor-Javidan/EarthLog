import React, { useMemo, useState, memo, useCallback } from 'react';
import { Pressable } from 'react-native';

import { WidgetTheme } from '@V2/Types/ProjectTypes';
import { translations } from '@V2/Translations/index';
import { HapticsService } from '@V2/Services/HapticsService';
import { ConfigService } from '@V2/Services/ConfigService';

import { Icon } from '@V2/Icon/index';
import { Text } from '@V2/Text/index';

export const ManualInputButton = memo((props: {
  theme: WidgetTheme
	onPress: () => void
}) => {

  const config                = useMemo(() => ConfigService.config, []);
  const R                     = useMemo(() => translations.widgetInput.gps[config.language], []);
	const [pressed, setPressed] = useState<boolean>(false);

  const onPress = useCallback(() => {
    props.onPress();
    HapticsService.vibrate('success');
  }, [props.onPress]);

  const onPressIn = useCallback(() => {
    setPressed(true);
    HapticsService.vibrate('success');
  }, []);

	return (
		<Pressable
			onPressIn={() => onPressIn()}
			onPressOut={() => setPressed(false)}
			onPress={() => onPress()}
			style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
				paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: props.theme.font,
        borderRadius: 10,
				backgroundColor: pressed ? props.theme.background : props.theme.font,
			}}
		>
      <Text
				style={{
          fontSize: 18,
          color: pressed ? props.theme.font : props.theme.background,
				}}
			>
				{R['Manual']}
			</Text>
      <Icon
        fontSize={18}
        iconName="pencil-sharp"
        color={pressed ? props.theme.font : props.theme.background}
      />
		</Pressable>
  );
});
