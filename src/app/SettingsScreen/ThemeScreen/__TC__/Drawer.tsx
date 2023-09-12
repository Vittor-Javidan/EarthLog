import React from 'react';

import { LC } from '../__LC__';

export default function Drawer(props: {
  state: 'Loaded' | 'Loading'
}) {
  return (<>
    {props.state === 'Loaded' && (
      <LC.ExampleFigure />
    )}
  </>);
}
