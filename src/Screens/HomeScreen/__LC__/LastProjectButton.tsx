import React, { memo, useCallback, useMemo, useState } from 'react';
import { Pressable, View } from 'react-native';

import { ProjectSettings } from '@Types/ProjectTypes';
import { navigate } from '@Globals/NavigationControler';
import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';
import ThemeService from '@Services/ThemeService';
import HapticsService from '@Services/HapticsService';
import SyncService from '@Services/SyncService';

import { Text } from '@Text/index';
import { UploadStatus } from './UploadStatus';

export const LastProjectButton = memo((props: {
  projectSettings: ProjectSettings
}) => {

  const config          = useMemo(() => ConfigService.config, []);
  const theme           = useMemo(() => ThemeService.appThemes[config.appTheme].component, []);
  const R               = useMemo(() => translations.screen.home[config.language], []);
  const projectSyncData = useMemo(() => SyncService.getSyncData(props.projectSettings.id_project), []);

  const [pressed, setPressed] = useState<boolean>(false);

  const lastProjectOpenExist = props.projectSettings.id_project !== '';
  const showStatus           = projectSyncData.project          !== 'new';

  const onPressIn = useCallback(() => {
    setPressed(true);
    HapticsService.vibrate('success');
  }, []);

  const onPress = useCallback(() => {
    navigate('PROJECT SCOPE', props.projectSettings.id_project);
    HapticsService.vibrate('success');
  }, [props.projectSettings.id_project]);

  return lastProjectOpenExist ? (
    <Pressable
      onPressIn={() => onPressIn()}
      onPressOut={() => setPressed(false)}
      onPress={() => onPress()}
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 10,
        backgroundColor: pressed ? theme.background_active : theme.background_Button,
        paddingVertical: 5,
        paddingHorizontal: 10,
        elevation: 3,
      }}
    >
      <View
        style={{
          width: '100%',
          gap: 5,
        }}
      >
        <Text h2
          numberOfLine={1}
          style={{
            color: pressed ? theme.font_active : theme.font_Button,
            fontWeight: '900',
          }}
        >
          {props.projectSettings.name}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: showStatus ? 'space-between' : 'flex-end',
          }}
        >
          <UploadStatus
            pressed={pressed}
            showStatus={showStatus}
            syncData={projectSyncData}
            uploads={props.projectSettings.uploads}
          />
          <Text
            style={{
              color: pressed ? theme.font_active : theme.font_Button,
              alignSelf: 'flex-end',
              paddingBottom: 4,
              paddingHorizontal: 4,
              fontSize: 10,
              fontStyle: 'italic',
            }}
          >
            {R['Recently Open']}
          </Text>
        </View>
      </View>
    </Pressable>
  ) : <></>;
});
