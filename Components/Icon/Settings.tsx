import React from 'react';
import Root from './Root';

export default function Settings(props: {
  onPress: () => void
}): JSX.Element {
  return (
    <Root
      iconName="settings"
      onPress={props.onPress}
    />
  );
}
