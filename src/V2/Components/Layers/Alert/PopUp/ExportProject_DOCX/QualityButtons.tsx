import React, { memo, useMemo } from 'react';
import { View } from 'react-native';

import ConfigService from '@V2/Services/ConfigService';
import ThemeService from '@V2/Services/ThemeService';

import { Text } from '@V2/Text/index';
import { Button } from '@V2/Button/index';

export const QualityButtons = memo((props: {
  selectedQuality: 'High' | 'Medium' | 'Low'
  showButtons: boolean
  onSelectQuality: (quality: 'High' | 'Medium' | 'Low') => void
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
