import React, { useMemo, useState } from 'react';
import { Pressable, View } from 'react-native';

import { navigate } from '@Globals/NavigationControler';
import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';
import CacheService from '@Services/CacheService';

import { Text } from '@Text/index';
import ThemeService from '@Services/ThemeService';
import { Layout } from '@Layout/index';
import ApticsService from '@Services/ApticsService';

export default function ProjectButtons() {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].component, []);
  const R      = useMemo(() => translations.Screens.HomeScreen[config.language], []);

  const allProjectButtons = CacheService.allProjects.map((settings) => {
    return (
      <ProjectButton
        key={settings.id_project}
        title={settings.name}
        onPress={() => navigate('PROJECT SCOPE', settings.id_project)}
        theme={theme}
      />
    );
  });

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.background,
        paddingBottom: 5,
        borderRadius: 10,
      }}
    >
      <Text h2
        style={{
          alignSelf: 'center',
          color: theme.font,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          paddingVertical: 5,
        }}
      >
        {R['Projects']}
      </Text>
      <Layout.ScrollView
        contenContainerStyle={{
          gap: 5,
          paddingBottom: 0,
          paddingHorizontal: 5,
        }}
      >
        {allProjectButtons}
      </Layout.ScrollView>
    </View>
  );
}

function ProjectButton(props: {
  title: string
  theme: {
    font_Button: string;
    background: string;
    background_Button: string;
  }
  onPress: () => void
}) {

  const [pressed, setPressed] = useState<boolean>(false);

  function onPressIn() {
    setPressed(true);
    ApticsService.vibrate('success');
  }

  function onPress() {
    props.onPress();
    ApticsService.vibrate('success');
  }

  return (
    <Pressable
      onPressIn={() => onPressIn()}
      onPressOut={() => setPressed(false)}
      onPress={() => onPress()}
      style={{
        maxHeight: 60,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 10,
        backgroundColor: pressed ? props.theme.background : props.theme.background_Button,
      }}
    >
      <Text h1
        style={{
          color: props.theme.font_Button,
        }}
      >
        {props.title}
      </Text>
    </Pressable>
  );
}
