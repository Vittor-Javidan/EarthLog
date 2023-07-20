import React from 'react';
import { StyleProp, ViewStyle} from 'react-native';
import Root from './Root';

export default function Language(props: {
  color?: string
  style?: StyleProp<ViewStyle>
  onPress: () => void
}): JSX.Element {
  return (
    <Root
      iconName="language"
      color={props.color}
      onPress={props.onPress}
      style={props.style}
    />
  );
}