import React, { memo, useCallback, useMemo, useState } from 'react';
import { Pressable, View } from 'react-native';

import { navigate } from '@Globals/NavigationControler';
import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';
import CacheService from '@Services/CacheService';
import ThemeService from '@Services/ThemeService';
import HapticsService from '@Services/HapticsService';
import SyncService from '@Services/SyncService';

import { Text } from '@Text/index';
import { UploadStatus } from './UploadStatus';

export const LastProjectButton = memo(() => {

  const config          = useMemo(() => ConfigService.config, []);
  const theme           = useMemo(() => ThemeService.appThemes[config.appTheme].component, []);
  const R               = useMemo(() => translations.screen.homeScreen[config.language], []);
  const projectSettings = useMemo(() => CacheService.lastOpenProject, []);
  const projectSyncData = useMemo(() => SyncService.getSyncData(projectSettings.id_project), []);

  const [pressed, setPressed] = useState<boolean>(false);

  const lastProjectOpenExist = projectSettings.id_project !== '';
  const showStatus = projectSyncData.project !== 'new';

  const onPressIn = useCallback(() => {
    setPressed(true);
    HapticsService.vibrate('success');
  }, []);

  const onPress = useCallback(() => {
    navigate('PROJECT SCOPE', projectSettings.id_project);
    HapticsService.vibrate('success');
  }, [projectSettings.id_project]);

  return lastProjectOpenExist ? (
    <View
      style={{
        minHeight: 55,
        width: '100%',
      }}
    >
      <Pressable
        onPressIn={() => onPressIn()}
        onPressOut={() => setPressed(false)}
        onPress={() => onPress()}
        style={{
          flex: 1,
          justifyContent: 'space-between',
          borderRadius: 10,
          backgroundColor: pressed ? theme.background_active : theme.background_Button,
          paddingVertical: 5,
          paddingHorizontal: 10,
          elevation: 3,
        }}
      >
        <Text h2
          numberOfLine={1}
          style={{
            color: pressed ? theme.font_active : theme.font_Button,
            fontWeight: '900',
          }}
        >
          {projectSettings.name}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: showStatus ? 'space-between' : 'flex-end',
            alignItems: 'center',
          }}
        >
          <UploadStatus
            showStatus={showStatus}
            uploadStatus={projectSyncData.project}
            uploads={projectSettings.uploads}
            pressed={pressed}
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
      </Pressable>
    </View>
  ) : <></>;
});
