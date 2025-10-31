import React, { memo, useMemo } from 'react';
import { View } from 'react-native';

import { ImageQuality } from '@V1/Types/AppTypes';
import { ThemeService } from '@V1/Services_Core/ThemeService';
import { ConfigService } from '@V1/Services/ConfigService';

import { Text } from '@V1/Text/index';
import { Button } from '@V1/Button/index';

export const QualityButtons = memo((props: {
  selectedQuality: Exclude<ImageQuality, 'no compress'>
  showButtons: boolean
  onSelectQuality: (quality: Exclude<ImageQuality, 'no compress'>) => void
}) => {
  return props.showButtons ? (<>
    <View
      style={{
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingLeft: 20,
      }}
    >
      <Text
        style={{
          paddingBottom: 10,
        }}
      >
        Quality:
      </Text>
      <QualityButton
        label="High"
        value={props.selectedQuality === 'High' ? true : false}
        onChange={() => props.onSelectQuality('High')}
      />
      <QualityButton
        label="Medium"
        value={props.selectedQuality === 'Medium' ? true : false}
        onChange={() => props.onSelectQuality('Medium')}
      />
      <QualityButton
        label="Low"
        value={props.selectedQuality === 'Low' ? true : false}
        onChange={() => props.onSelectQuality('Low')}
      />
    </View>
  </>) : <></>;
});

const QualityButton = memo((props: {
  label: string
  value: boolean
  onChange: () => void
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].layout.modalPopUp, []);

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        paddingVertical: 5,
      }}
    >
      <Button.Bullet
        value={props.value}
        onChange={props.onChange}
        theme={{
          background: theme.background_Button,
          confirm: theme.confirm,
          font: theme.font,
        }}
      />
      <Text>{props.label}</Text>
    </View>
  );
});
