import React, { memo } from 'react';
import { View } from 'react-native';

export const ScreenButtons = memo((props: {
  buttons: JSX.Element
  showSwipe?: boolean
  SwipeButton?: JSX.Element
}) => {

  const BOTTOM = 10;

  return (props.showSwipe ? (
    <View
      style={{
        position: 'absolute',
        width: '100%',
        bottom: BOTTOM,
      }}
    >
      {props.SwipeButton}
    </View>
  ) : (<>
    <View
      style={{
        position: 'absolute',
        bottom: BOTTOM,
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        gap: 10,
      }}
    >
      {props.buttons}
    </View>
  </>));
});
