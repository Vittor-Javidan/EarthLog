import React, { memo, useCallback, useMemo, useState } from 'react';
import { Pressable, View } from 'react-native';

import { navigate } from '@V1/Globals/NavigationControler';
import { ProjectSettings, SyncData, UploadEntry } from '@V1/Types/ProjectTypes';
import { translations } from '@V1/Translations/index';
import HapticsService from '@V1/Services/HapticsService';
import ConfigService from '@V1/Services/ConfigService';
import ThemeService from '@V1/Services/ThemeService';
import SyncService from '@V1/Services/SyncService';

import { Text } from '@V1/Text/index';
import { Layout } from '@V1/Layout/index';
import { UploadStatus } from './UploadStatus';

export const ProjectButtons = memo((props: {
  projects: ProjectSettings[]
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].component, []);
  const R      = useMemo(() => translations.screen.home[config.language], []);

  const AllProjects = props.projects.map((settings) => (
    <ProjectButton
      key={settings.id_project}
      title={settings.name}
      syncData={SyncService.getSyncData(settings.id_project)}
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
        {AllProjects}
      </Layout.ScrollView>
    </View>
  );
});

const ProjectButton = memo((props: {
  title: string
  syncData: SyncData
  uploads: UploadEntry[] | undefined
  project_id: string
  onPress: () => void
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].component, []);
  const [pressed, setPressed] = useState<boolean>(false);

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
            flexWrap: 'wrap',
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
            showStatus={props.syncData.project !== 'new'}
            syncData={props.syncData}
            uploads={props.uploads}
            pressed={pressed}
          />
        </View>
    </Pressable>
  );
});
