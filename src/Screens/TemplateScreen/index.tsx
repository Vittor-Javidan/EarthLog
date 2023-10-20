import React, { memo, useState } from 'react';

import { Loading } from '@Types/AppTypes';

import { Layout } from '@Layout/index';
import { TC } from './__TC__';
import { LC } from './__LC__';

export const TemplateScreen = memo((props: {
  projectScopeState: Loading
}) => {

  const [_, refresh] = useState<boolean>(false);

  return (
    <Layout.Screen
      screenButtons={<TC.ScreenButtons
        onWidgetCreation={() => refresh(prev => !prev)}
      />}
    >
      {props.projectScopeState === 'Loading' ? (
        <Layout.Loading />
      ) : (
        <LC.F_TemplateWidgets />
      )}
    </Layout.Screen>
  );
});
