import React, { useState } from 'react';

import { Layout } from '@Layout/index';

import { TC } from './__TC__';
import { LC } from './__LC__';
import { Loading } from '@Types/AppTypes';

export function ProjectInfoScreen(props: {
  projectScopeState: Loading
  onProjectNameUpdate: (newName: string) => void
  onSampleAliasChange: (newAliasName: string) => void
}) {

  const [_, refresher] = useState<boolean>(false);

  return (
    <Layout.Screen
      screenButtons={
        <TC.ScreenButtons
          onWidgetCreation={() => refresher(prev => !prev)}
        />
      }
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
            onSampleAliasChange={(newSampleAlias) => props.onSampleAliasChange(newSampleAlias)}
          />
          <LC.ProjectWidgets />
        </Layout.ScrollView>
      )}
    </Layout.Screen>
  );
}
