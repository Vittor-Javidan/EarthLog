import React from 'react';
import { StyleProp, ViewStyle} from 'react-native';
import Root from './Root';

export default function Reset(props: {
  color?: string
  style?: StyleProp<ViewStyle>
  onPress?: () => void
}): JSX.Element {
  return (
    <Root
      iconName="refresh-sharp"
      color={props.color}
      onPress={props.onPress}
      style={props.style}
    />
  );
}
