import React from 'react';
import { View } from 'react-native';

export default function ScreenButtons(props: {
  button_left?: JSX.Element
  button_middle?: JSX.Element
  button_right?: JSX.Element
  showSwipe?: boolean
  SwipeButton?: JSX.Element
}) {

  const HORIZONTAL_PADDING = 10;

  return (<>
    <View
      style={{
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        bottom: 0,
        paddingTop: 10,
        paddingBottom: 10,
        zIndex: 10,
      }}
    >
      {props.showSwipe ? (<>
        {props.SwipeButton}
      </>) : (<>
        <View
          style={{
            width: '33%',
            justifyContent: 'center',
            alignItems: 'flex-start',
            paddingLeft: HORIZONTAL_PADDING,
          }}
        >
          {props.button_left}
        </View>
        <View
          style={{
            width: '33%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {props.button_middle}
        </View>
        <View
          style={{
            width: '33%',
            justifyContent: 'center',
            alignItems: 'flex-end',
            paddingRight: HORIZONTAL_PADDING,
          }}
        >
          {props.button_right}
        </View>
      </>)}
    </View>
  </>);
}
