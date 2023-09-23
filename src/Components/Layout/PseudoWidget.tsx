import React, { ReactNode } from 'react';
import { View } from 'react-native';

import { Text } from '@Text/index';

type WidgetTheme = {
  font: string
  background: string
  confirm: string
  modified: string
}

export function PseudoWidget(props: {
  saved: boolean
  children: ReactNode
  theme: WidgetTheme
}) {
  return (
    <View
      style={{
        backgroundColor: props.theme.background,
        borderRadius: 10,
      }}
    >
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
      </View>
      <View
        style={{
          paddingTop: 10,
          paddingBottom: 5,
          gap: 10,
        }}
      >
        {props.children}
      </View>
    </View>
  );
}

function SaveFeedback(props: {
  saved: boolean
  theme: WidgetTheme
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 5,
      }}
    >
      <View
        style={{
          height: 12,
          width: 12,
          backgroundColor: props.saved ? props.theme.confirm : props.theme.modified,
          borderRadius: 6,
        }}
      />
      <Text.P
        style={{
          color: props.theme.font,
        }}
      >
        {props.saved ? 'Saved' : 'Saving...'}
      </Text.P>
    </View>
  );
}
