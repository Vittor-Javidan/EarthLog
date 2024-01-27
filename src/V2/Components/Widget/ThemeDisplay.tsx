import React, { memo, useCallback, useMemo, useState } from 'react';
import { LayoutChangeEvent, Pressable, View } from 'react-native';

import { WidgetTheme } from '@V2/Types/ProjectTypes';

import { ThemeNames_Widgets } from '@V2/Types/AppTypes';
import { translations } from '@V2/Translations/index';
import HapticsService from '@V2/Services/HapticsService';
import ConfigService from '@V2/Services/ConfigService';
import ThemeService from '@V2/Services/ThemeService';

import { Text } from '@V2/Text/index';
import { Animation } from '@V2/Animation/index';

export const ThemeDisplay = memo((props: {
  theme: WidgetTheme
  onThemeSelected: (themeName: ThemeNames_Widgets) => void
}) => {

  const config                               = useMemo(() => ConfigService.config, []);
  const R                                    = useMemo(() => translations.widget.Root[config.language], []);
  const [startAnimation , setStartAnimation] = useState<boolean>(false);

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    if (event.nativeEvent.layout.height > 0) {
      setStartAnimation(true);
    }
  }, []);

  return (
    <Animation.FadeOut
      start={startAnimation}
      duration={300}
      onLayout={event => onLayout(event)}
    >
      <Text h3
        style={{
          color: props.theme.font,
          paddingHorizontal: 10,
          alignSelf: 'center',
        }}
      >
        {R['Select a theme:']}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 5,
          paddingTop: 10,
          paddingHorizontal: 10,
        }}
      >
        <ThemeButtons
          onPress={(themeName) => props.onThemeSelected(themeName)}
        />
      </View>
    </Animation.FadeOut>
  );
});


const ThemeButtons = memo((props: {
  onPress: (themeName: ThemeNames_Widgets) => void
}) => {

  const themes = useMemo(() => ThemeService.widgetThemes, []);
  const config = useMemo(() => ConfigService.config, []);
  const R      = useMemo(() => translations.themes.widget[config.language], []);

  const AllThemeButtons = ThemeService.themeNamesArray.Widget.map(themeName => (
    <ThemeButton
      key={themeName}
      title={R[themeName]}
      theme={themes[themeName]}
      onPress={() => props.onPress(themeName)}
    />
  ));

  return <>{AllThemeButtons}</>;
});

const ThemeButton = memo((props: {
  title: string
  theme: {
    font: string
    background: string
    confirm: string
  }
  onPress: () => void
}) => {

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
				paddingHorizontal: 10,
        paddingVertical: 2,
				backgroundColor: pressed ? props.theme.confirm : props.theme.background,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: '#000',
			}}
		>
      <Text p
				style={{
          color: props.theme.font,
				}}
			>
				{props.title}
			</Text>
		</Pressable>
  );
});
