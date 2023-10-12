import React, { memo, useCallback, useMemo, useState } from 'react';
import { Pressable, View } from 'react-native';

import { navigate } from '@Globals/NavigationControler';
import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';
import CacheService from '@Services/CacheService';
import ThemeService from '@Services/ThemeService';
import HapticsService from '@Services/HapticsService';

import { Icon } from '@Icon/index';
import { Text } from '@Text/index';

export const LastProjectButton = memo(() => {

  const config          = useMemo(() => ConfigService.config, []);
  const theme           = useMemo(() => ThemeService.appThemes[config.appTheme].component, []);
  const R               = useMemo(() => translations.screen.homeScreen[config.language], []);
  const projectSettings = useMemo(() => CacheService.lastOpenProject, []);

  const [pressed, setPressed] = useState<boolean>(false);

  const lastProjectOpenExist = projectSettings.id_project !== '';
  const lastUploadDate = projectSettings.uploads?.[projectSettings.uploads.length - 1].date ?? undefined;

  const iconColor = (
    projectSettings.status === 'uploaded' || projectSettings.status === 'first upload'
  ) ? theme.confirm : theme.warning;

  const iconName = (
    projectSettings.status === 'uploaded' || projectSettings.status === 'first upload'
  ) ? 'cloud' : 'cloud-upload';

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
        minHeight: 45,
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
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {projectSettings.status !== undefined && lastUploadDate && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 5,
              }}
            >
              <View
                style={{ height: 10 }}
              >
                <Icon
                  iconName={iconName}
                  color={iconColor}
                />
              </View>
              <Text p
                style={{
                  color: pressed ? theme.font_active : theme.font_Button,
                  fontSize: 10,
                  fontStyle: 'italic',
                }}
              >
                {projectSettings.status === 'modified' ? R['New data'] : lastUploadDate}
              </Text>
            </View>
          )}
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
