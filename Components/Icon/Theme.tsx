import React from 'react';
import Root from './Root';

export default function Theme(props: {
  onPress: () => void
}): JSX.Element {
  return (
    <Root
      iconName="color-palette"
      onPress={props.onPress}
    />
  );
}
