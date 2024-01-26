import React, { memo, useMemo } from 'react';
import { View } from 'react-native';

import { SyncData, UploadEntry } from '@V2/Types/ProjectTypes';
import { translations } from '@V2/Translations/index';
import ConfigService from '@V2/Services/ConfigService';
import ThemeService from '@V2/Services/ThemeService';

import { Icon, IconName } from '@V2/Icon/index';
import { Text } from '@V2/Text/index';

export const UploadStatus = memo((props: {
  pressed: boolean
  showStatus: boolean
  syncData: SyncData
  uploads: UploadEntry[] | undefined
}) => {

  const config         = useMemo(() => ConfigService.config, []);
  const theme          = useMemo(() => ThemeService.appThemes[config.appTheme].component, []);
  const R              = useMemo(() => translations.screen.home[config.language], []);
  const lastUploadDate = useMemo(() => props.uploads?.[props.uploads.length - 1].date ?? undefined, []);

  let iconName: IconName;
  let iconColor: string;
  let statusMessage: string;

  switch (props.syncData.project) {
    case 'uploaded': {
      const isMissingMedia = Object.values(props.syncData.pictures).includes('new');
      iconName      = isMissingMedia ? 'cloud-offline'      : 'cloud';
      iconColor     = isMissingMedia ? theme.wrong          : theme.confirm;
      statusMessage = isMissingMedia ? 'Media not uploaded' : (lastUploadDate ?? '');
      break;
    }
    case 'modified': {
      iconName = 'cloud-upload';
      iconColor = theme.warning;
      statusMessage = R['New data'];
      break;
    }
    case 'new': return <></>;
  }

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
      {(
        <Text p
          style={{
            color: props.pressed ? theme.font_active : theme.font_Button,
            fontSize: 9,
          }}
        >
          {statusMessage}
        </Text>
      )}
    </View>
  ) : <></>;
});
