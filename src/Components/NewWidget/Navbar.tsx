import React from 'react';
import { View } from 'react-native';

import SaveFeedback from './SaveFeedback';
import { WidgetThemeData } from '@Types/ProjectTypes';

export function Navbar(props: {
  label: string
  saved: boolean
  iconButtons: JSX.Element
  theme: WidgetThemeData
}) {

  const { theme } = props;

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
        theme={theme}
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
