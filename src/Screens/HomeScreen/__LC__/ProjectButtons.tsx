import React, { memo, useCallback, useMemo, useState } from 'react';
import { Pressable, View } from 'react-native';

import { ProjectStatus } from '@Types/ProjectTypes';
import { navigate } from '@Globals/NavigationControler';
import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';
import CacheService from '@Services/CacheService';
import HapticsService from '@Services/HapticsService';
import ThemeService from '@Services/ThemeService';

import { Icon } from '@Icon/index';
import { Text } from '@Text/index';
import { Layout } from '@Layout/index';

export function F_ProjectButtons() {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].component, []);
  const R      = useMemo(() => translations.screen.homeScreen[config.language], []);

  const allProjectButtons = CacheService.allProjects.map((settings) => (
    <ProjectButton
      key={settings.id_project}
      title={settings.name}
      status = {settings.status}
      onPress={() => navigate('PROJECT SCOPE', settings.id_project)}
    />
  ));

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.background,
        paddingBottom: 5,
        borderRadius: 10,
        elevation: 3,
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

const ProjectButton = memo((props: {
  title: string
  status?: ProjectStatus
  onPress: () => void
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].component, []);

  const [pressed, setPressed] = useState<boolean>(false);

  const iconColor = (
    props.status === 'uploaded' || props.status === 'first upload'
  ) ? theme.confirm : theme.warning;

  const iconName = (
    props.status === 'uploaded' || props.status === 'first upload'
  ) ? 'cloud' : 'cloud-upload';

  const onPressIn = useCallback(() => {
    setPressed(true);
    HapticsService.vibrate('success');
  }, []);

  const onPress = useCallback(() => {
    props.onPress();
    HapticsService.vibrate('success');
  }, [props.onPress]);

  return (
    <Pressable
      onPressIn={() => onPressIn()}
      onPressOut={() => setPressed(false)}
      onPress={() => onPress()}
      style={{
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 20,
        gap: 5,
        backgroundColor: pressed ? theme.background_active : theme.background_Button,
      }}
    >
      {props.status !== undefined && (
        <View
          style={{
            height: 20,
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
          color: pressed ? theme.font_active : theme.font_Button,
        }}
      >
        {props.title}
      </Text>
    </Pressable>
  );
});
