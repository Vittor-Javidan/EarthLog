import React, { useMemo } from 'react';
import { View } from 'react-native';

import { GPSFeaturesDTO} from '@Types/index';
import ConfigService from '@Services/ConfigService';

import { Button } from '@Components/Layout/Button';

export default function __FooterButtons__(props: {
  features: GPSFeaturesDTO
  onPress_Cancel: () => void
  onPress_Save: () => void
}) {

  const { theme } = useMemo(() => ConfigService.config, []);
  const { editMode, gpsON } = props.features;

  const showButtons = editMode === true && gpsON === false;

  return (<>
    {showButtons && (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}
      >
        <Button.Icon
          iconName="close"
          color_background={theme.wrong}
          onPress={() => props.onPress_Cancel()}
          style={{
            width: '30%',
            height: 35,
            justifyContent: 'center',
            paddingVertical: 0,
            borderRadius: 10,
          }}
        />
        <Button.Icon
          iconName="save"
          color_background={theme.confirm}
          onPress={() => props.onPress_Save()}
          style={{
            width: '30%',
            height: 35,
            justifyContent: 'center',
            paddingVertical: 5,
            borderRadius: 10,
          }}
        />
      </View>
    )}
  </>);
}
