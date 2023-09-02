import React, { useMemo } from 'react';
import { View } from 'react-native';

import { GPS_DTO } from '@Types/index';
import ConfigService from '@Services/ConfigService';

import IconButton from '@Components/Layout/Button/IconButton';

export default function IconButtons(props: {
  gpsData: GPS_DTO
  erasedData: GPS_DTO | null
  gpsON: boolean
  editMode: boolean
  onPress_UndoButton: () => void
  onPress_TrashButton: () => void
  onPress_PlayButton: () => void
  onPress_StopButton: () => void
  onPress_EditButton: () => void
  onPress_CloseButton: () => void
}) {

  const { theme } = useMemo(() => ConfigService.config, []);

  const dataAvailable = Object.keys(props.gpsData).length > 0;
  const showUndoButton = props.editMode === true && props.erasedData !== null && props.gpsON === false;
  const showTrashButton = props.editMode === true && dataAvailable === true && props.gpsON === false;
  const showPlayButton = props.editMode === true && props.gpsON === false;
  const showStopButton = props.gpsON === true;
  const showEditButton = props.editMode === false;
  const showCloseButton = props.editMode === true && props.gpsON === false;

  return (
    <View
      style={{ flexDirection: 'row' }}
    >
      {showUndoButton && (
        <IconButton
          iconName="arrow-undo"
          color={theme.onBackground}
          onPress={() => props.onPress_UndoButton()}
          style={{
            paddingHorizontal: 5,
            paddingVertical: 0,
            borderRadius: 10,
          }}
        />
      )}
      {showTrashButton && (
        <IconButton
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
      {showPlayButton && (
        <IconButton
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
        <IconButton
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
      {showEditButton && (
        <IconButton
          iconName="pencil-sharp"
          color={theme.onBackground}
          onPress={() => props.onPress_EditButton()}
          style={{
            paddingHorizontal: 5,
            paddingVertical: 0,
            borderRadius: 10,
          }}
        />
      )}
      {showCloseButton && (
        <IconButton
          iconName="checkmark-sharp"
          color={theme.confirm}
          onPress={() => props.onPress_CloseButton()}
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
