import React from 'react';
import Root from './Root';

export default function Home(props: {
  onPress: () => void
}): JSX.Element {
  return (
    <Root
      iconName="home"
      onPress={props.onPress}
    />
  );
}
