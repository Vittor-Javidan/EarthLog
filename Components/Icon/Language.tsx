import React from 'react';
import Root from './Root';

export default function Language(props: {
  onPress: () => void
}): JSX.Element {
  return (
    <Root
      iconName="language"
      onPress={props.onPress}
    />
  );
}
