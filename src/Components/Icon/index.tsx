import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

export function Icon(props: {
  iconName: IconName
  color: string
}) {
  return (
    <Ionicons
      name={props.iconName}
      adjustsFontSizeToFit={true}
      maxFontSizeMultiplier={0}
      style={{
        color: props.color,
        fontSize: 200,
      }}
    />
  );
}

export type IconName = (
  'home'                        |
  'settings'                    |
  'language'                    |
  'color-palette'               |
  'md-menu-sharp'               |
  'map'                         |
  'pencil-sharp'                |
  'checkmark-done-sharp'        |
  'close'                       |
  'refresh-sharp'               |
  'clipboard'                   |
  'save'                        |
  'chevron-back-sharp'          |
  'chevron-up-circle-outline'   |
  'chevron-down-circle-outline' |
  'lock-closed-sharp'           |
  'arrow-back'                  |
  'add-sharp'                   |
  'apps'                        |
  'file-tray'                   |
  'arrow-forward-sharp'         |
  'copy'                        |
  'trash-outline'               |
  'apps'                        |
  'layers'                      |
  'list'                        |
  'folder'                      |
  'finger-print'                |
  'arrow-undo'                  |
  'location'                    |
  'play'                        |
  'stop'                        |
  'checkmark-sharp'             |
  'locate'                      |
  'add-circle-outline'          |
  'options-outline'             |
  'backspace-outline'
)
