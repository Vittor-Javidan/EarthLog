import React from 'react';
import { StyleProp, ViewStyle} from 'react-native';
import Root from './Root';

export default function Menu(props: {
  color?: string
  style?: StyleProp<ViewStyle>
  onPress: () => void
}): JSX.Element {
  return (
    <Root
      iconName="md-menu-sharp"
      color={props.color}
      onPress={props.onPress}
      style={props.style}
    />
  );
}