import React from 'react';
import Root from './Root';

export default function Project(props: {
  onPress: () => void
}): JSX.Element {
  return (
    <Root
      iconName="map"
      onPress={props.onPress}
    />
  );
}
