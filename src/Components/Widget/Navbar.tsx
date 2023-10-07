import React, { memo } from 'react';
import { View } from 'react-native';

import { SaveFeedback } from './SaveFeedback';
import { WidgetThemeDTO } from '@Types/ProjectTypes';

// TODO: Import the iconbuttons to this file.

export const Navbar = memo((props: {
  saved: boolean
  iconButtons: JSX.Element
  theme: WidgetThemeDTO
}) => {
  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        paddingLeft: 10,
        height: 40,
      }}
    >
      <SaveFeedback
        saved={props.saved}
        theme={props.theme}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'flex-start',
        }}
      >
        {props.iconButtons}
      </View>
    </View>
  );
});
