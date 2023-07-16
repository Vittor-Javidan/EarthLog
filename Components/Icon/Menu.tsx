import React from 'react';
import Root from './Root';

export default function Menu(props: {
  onPress: () => void
}): JSX.Element {
  return (
    <Root
      iconName="md-menu-sharp"
      onPress={props.onPress}
    />
  );
}
