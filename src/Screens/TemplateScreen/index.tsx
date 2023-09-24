import React, { useState } from 'react';

import { Loading } from '@Types/AppTypes';

import { Layout } from '@Layout/index';
import { TC } from './__TC__';
import { LC } from './__LC__';

export function TemplateScreen(props: {
  projectScopeState: Loading
}) {

  const [_, refresher] = useState<boolean>(false);

  return (
    <Layout.Screen
      screenButtons={<TC.ScreenButtons
        onWidgetCreation={() => refresher(prev => !prev)}
      />}
    >
      {props.projectScopeState === 'Loading' ? (
        <Layout.Loading />
      ) : (
        <Layout.ScrollView
          contenContainerStyle={{
            paddingTop: 55,
            padding: 5,
            gap: 10,
          }}
        >
          <LC.TemplateWidgets />
        </Layout.ScrollView>
      )}
    </Layout.Screen>
  );
}
