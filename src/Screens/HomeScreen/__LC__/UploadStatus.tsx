import React, { memo, useMemo } from 'react';
import { View } from 'react-native';

import { Status, UploadEntry } from '@Types/ProjectTypes';
import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';
import ThemeService from '@Services/ThemeService';

import { Icon } from '@Icon/index';
import { Text } from '@Text/index';

export const UploadStatus = memo((props: {
  pressed: boolean
  showStatus: boolean
  uploadStatus: Status
  uploads: UploadEntry[] | undefined
}) => {

  const config         = useMemo(() => ConfigService.config, []);
  const theme          = useMemo(() => ThemeService.appThemes[config.appTheme].component, []);
  const R              = useMemo(() => translations.screen.homeScreen[config.language], []);
  const lastUploadDate = useMemo(() => props.uploads?.[props.uploads.length - 1].date ?? undefined, []);

  const iconName   = props.uploadStatus === 'uploaded' ? 'cloud' : 'cloud-upload';
  const iconColor  = props.uploadStatus === 'uploaded' ? theme.confirm : theme.warning;

  return props.showStatus ? (
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
      {lastUploadDate && (
        <Text p
          style={{
            color: props.pressed ? theme.font_active : theme.font_Button,
            fontSize: 10,
            fontStyle: 'italic',
          }}
        >
          {props.uploadStatus === 'modified' ? R['New data'] : lastUploadDate}
        </Text>
      )}
    </View>
  ) : <></>;
});
