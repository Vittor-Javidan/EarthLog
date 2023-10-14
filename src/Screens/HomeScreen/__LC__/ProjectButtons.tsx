import React, { memo, useCallback, useMemo, useState } from 'react';
import { Pressable, View } from 'react-native';

import { Status, UploadEntry } from '@Types/ProjectTypes';
import { navigate } from '@Globals/NavigationControler';
import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';
import CacheService from '@Services/CacheService';
import HapticsService from '@Services/HapticsService';
import ThemeService from '@Services/ThemeService';
import SyncService from '@Services/SyncService';

import { Text } from '@Text/index';
import { Layout } from '@Layout/index';
import { UploadStatus } from './UploadStatus';

export function F_ProjectButtons() {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].component, []);
  const R      = useMemo(() => translations.screen.homeScreen[config.language], []);

  const allProjectButtons = CacheService.allProjects.map((settings) => (
    <ProjectButton
      key={settings.id_project}
      title={settings.name}
      status={SyncService.getSyncData(settings.id_project).project}
      uploads={settings.uploads}
      project_id={settings.id_project}
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
  status: Status
  uploads: UploadEntry[] | undefined
  project_id: string
  onPress: () => void
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].component, []);
  const [pressed, setPressed] = useState<boolean>(false);

  const showStatus = props.status !== 'new';

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
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 10,
        gap: 5,
        backgroundColor: pressed ? theme.background_active : theme.background_Button,
      }}
    >
      <Text h3
        style={{
          color: pressed ? theme.font_active : theme.font_Button,
        }}
      >
        {props.title}
      </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text p
            style={{
              color: pressed ? theme.font_active : theme.font_Button,
              fontSize: 10,
              fontStyle: 'italic',
            }}
          >
            {props.project_id}
          </Text>
          <UploadStatus
            showStatus={showStatus}
            uploadStatus={props.status}
            uploads={props.uploads}
            pressed={pressed}
          />
        </View>
    </Pressable>
  );
});
