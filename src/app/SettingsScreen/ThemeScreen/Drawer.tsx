import React from 'react';

import { ExampleFigure } from './LocalComponents/ExampleFigure';

export default function Drawer(props: {
  state: 'Loaded' | 'Loading'
}) {
  return (<>
    {props.state === 'Loaded' && (
      <ExampleFigure />
    )}
  </>);
}
