import React from 'react';
import { View } from 'react-native';

import SaveFeedback from './SaveFeedback';
import { WidgetThemeData } from '@Types/ProjectTypes';

export function Navbar(props: {
  saved: boolean
  iconButtons: JSX.Element
  theme: WidgetThemeData
}) {
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
}
