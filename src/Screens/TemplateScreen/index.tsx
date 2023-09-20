import React from 'react';

import { Loading } from '@Types/AppTypes';

import { Layout } from '@Layout/index';
import { TC } from './__TC__';
import { LC } from './__LC__';

export function TemplateScreen(props: {
  projectScopeState: Loading
}) {
  return (
    <Layout.Screen
      screenButtons={<TC.ScreenButtons />}
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
