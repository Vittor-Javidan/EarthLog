import React, { ReactNode, useMemo } from 'react';
import { Dimensions, StyleProp, View, ViewStyle } from 'react-native';

export default function Screen(props: {
  screenButtons: JSX.Element
  children: ReactNode
  style?: StyleProp<ViewStyle>
}) {

  const { width: SCREEN_WIDTH } = useMemo(() => Dimensions.get('window'), []);

  return (<>
    <View
      style={[{
        flex: 1,
        width: SCREEN_WIDTH,
       }, props.style]}
    >
      {props.children}
      {props.screenButtons}
    </View>
  </>);
}
