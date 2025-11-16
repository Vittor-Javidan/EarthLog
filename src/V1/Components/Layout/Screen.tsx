import React, { ReactNode, useMemo, memo } from 'react';
import { Dimensions, StyleProp, View, ViewStyle } from 'react-native';

export const Screen = memo((props: {
  screenButtons: React.JSX.Element
  children: ReactNode
  style?: StyleProp<ViewStyle>
}) => {

  const { width: SCREEN_WIDTH } = useMemo(() => Dimensions.get('screen'), []);

  return (<>
    <View
      style={[{
        height: '100%',
        width: SCREEN_WIDTH,
       }, props.style]}
    >
      {props.children}
      {props.screenButtons}
    </View>
  </>);
});
