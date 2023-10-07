import React, { useMemo, useState } from 'react';
import { Pressable, View } from 'react-native';

import { navigate } from '@Globals/NavigationControler';
import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';
import CacheService from '@Services/CacheService';
import HapticsService from '@Services/HapticsService';
import ThemeService from '@Services/ThemeService';

import { Text } from '@Text/index';
import { Layout } from '@Layout/index';
import { Icon } from '@Icon/index';
import { ProjectStatus } from '@Types/ProjectTypes';

export default function ProjectButtons() {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].component, []);
  const R      = useMemo(() => translations.screen.homeScreen[config.language], []);

  const allProjectButtons = CacheService.allProjects.map((settings) => {
    return (
      <ProjectButton
        key={settings.id_project}
        title={settings.name}
        status = {settings.status}
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
      <Text h1
        style={{
          alignSelf: 'center',
          color: theme.font,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          paddingTop: 5,
          paddingBottom: 15,
        }}
      >
        {R['Projects']}
      </Text>
      <Layout.ScrollView
        contentContainerStyle={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
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
  status?: ProjectStatus
  theme: {
    font_Button: string;
    background: string;
    background_Button: string;
    confirm: string;
    warning: string
  }
  onPress: () => void
}) {

  const [pressed, setPressed] = useState<boolean>(false);

  function onPressIn() {
    setPressed(true);
    HapticsService.vibrate('success');
  }

  function onPress() {
    props.onPress();
    HapticsService.vibrate('success');
  }

  const iconColor = (
    props.status === 'uploaded' || props.status === 'first upload'
  ) ? props.theme.confirm : props.theme.warning;

  const iconName = (
    props.status === 'uploaded' || props.status === 'first upload'
  ) ? 'cloud' : 'cloud-upload';

  return (
    <Pressable
      onPressIn={() => onPressIn()}
      onPressOut={() => setPressed(false)}
      onPress={() => onPress()}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 20,
        gap: 5,
        backgroundColor: pressed ? props.theme.background : props.theme.background_Button,
      }}
    >
      {props.status !== undefined && (
        <View
          style={{
            height: 15,
          }}
        >
          <Icon
            iconName={iconName}
            color={iconColor}
          />
        </View>
      )}
      <Text h3
        style={{
          color: props.theme.font_Button,
        }}
      >
        {props.title}
      </Text>
    </Pressable>
  );
}
