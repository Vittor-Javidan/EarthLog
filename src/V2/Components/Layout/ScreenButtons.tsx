import React, { memo } from 'react';
import { View } from 'react-native';

export const ScreenButtons = memo((props: {
  buttons: React.JSX.Element
  showSwipe?: boolean
  SwipeButton?: React.JSX.Element
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
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10,
        bottom: BOTTOM,
        width: '100%',
      }}
    >
      {props.buttons}
    </View>
  </>));
});
