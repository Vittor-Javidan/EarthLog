import React from 'react';

import { ScopeState } from '@Types/index';

import { Layout } from '@Components/Layout';
import { TC } from './__TC__';
import { LC } from './__LC__';

export default function ProjectInfoScreen(props: {
  projectScopeState: ScopeState
  onProjectNameUpdate: (newName: string) => void
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
          <LC.ProjectSettingsWidget
            onProjectNameUpdate={(newName) => props.onProjectNameUpdate(newName)}
          />
          <LC.ProjectWidgets />
        </Layout.ScrollView>
      )}
    </Layout.Screen>
  );
}
