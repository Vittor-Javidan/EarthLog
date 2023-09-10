import React, { useMemo } from 'react';
import { View } from 'react-native';

import { GPSFeaturesDTO } from '@Types/index';
import ConfigService from '@Services/ConfigService';

import { Button } from '@Components/Layout/Button';

export default function IconButtons(props: {
  hideDeleteButton?: boolean
  features: GPSFeaturesDTO
  onPress_TrashButton: () => void
  onPress_EditButton: () => void
  onPress_PlayButton: () => void
  onPress_StopButton: () => void
}) {

  const { theme } = useMemo(() => ConfigService.config, []);
  const { editMode, gpsON } = props.features;

  const showPlayButton = gpsON === false;
  const showStopButton = gpsON === true;
  const showTrashButton = !props.hideDeleteButton && editMode === true && gpsON === false;

  return (
    <View
      style={{ flexDirection: 'row' }}
    >
      {showTrashButton && (
        <Button.Icon
          iconName="trash-outline"
          color={theme.wrong}
          onPress={() => props.onPress_TrashButton()}
          style={{
            paddingHorizontal: 5,
            paddingVertical: 0,
            borderRadius: 10,
          }}
        />
      )}
      <Button.Icon
        iconName={'options-outline'}
        color={props.features.editMode ? theme.modified : theme.onBackground}
        onPress={() => props.onPress_EditButton()}
        style={{
          paddingHorizontal: 5,
          paddingVertical: 0,
          borderRadius: 10,
        }}
      />
      {showPlayButton && (
        <Button.Icon
          iconName="play"
          color={theme.confirm}
          onPress={() => props.onPress_PlayButton()}
          style={{
            paddingHorizontal: 5,
            paddingVertical: 0,
            borderRadius: 10,
          }}
        />
      )}
      {showStopButton && (
        <Button.Icon
          iconName="stop"
          color={theme.wrong}
          onPress={() => props.onPress_StopButton()}
          style={{
            paddingHorizontal: 5,
            paddingVertical: 0,
            borderRadius: 10,
          }}
        />
      )}
    </View>
  );
}
