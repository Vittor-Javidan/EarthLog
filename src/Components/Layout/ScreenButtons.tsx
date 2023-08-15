import React from 'react';
import { View, Dimensions } from 'react-native';

export default function ScreenButtons(props: {
  button_left?: JSX.Element
  button_middle?: JSX.Element
  button_right?: JSX.Element
  showSwipe?: boolean
  SwipeButton?: JSX.Element
}) {

  const { width: WIDTH} = Dimensions.get('window');
  const HORIZONTAL_PADDING = 10;

  return (props.showSwipe ? (
    <View
      style={{
        position: 'absolute',
        width: '100%',
        bottom: 10,
      }}
    >
      {props.SwipeButton}
    </View>
  ) : (<>
    <View
      style={{
        position: 'absolute',
        left: 10,
        bottom: 10,
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: HORIZONTAL_PADDING,
      }}
    >
      {props.button_left}
    </View>
    <View
      style={{
        position: 'absolute',
        left: (WIDTH / 2) - 40,
        bottom: 10,
      }}
    >
      {props.button_middle}
    </View>
    <View
      style={{
        position: 'absolute',
        right: 10,
        bottom: 10,
        paddingRight: HORIZONTAL_PADDING,
      }}
    >
      {props.button_right}
    </View>
  </>));
}
