import React, { memo, useState } from 'react';

import { Loading } from '@Types/AppTypes';

import { Layout } from '@Layout/index';
import { TC } from './__TC__';
import { LC } from './__LC__';

export const ProjectInfoScreen = memo((props: {
  projectScopeState: Loading
  onProjectNameUpdate: (newName: string) => void
  onSampleAliasChange: (newAliasName: string) => void
}) => {

  const [_, refresh] = useState<boolean>(false);

  return (
    <Layout.Screen
      screenButtons={
        <TC.ScreenButtons
          onWidgetCreation={() => refresh(prev => !prev)}
        />
      }
    >
      {props.projectScopeState === 'Loading' ? (
        <Layout.Loading />
      ) : (
        <Layout.ScrollView
          contentContainerStyle={{
            paddingTop: 55,
            padding: 5,
            gap: 10,
          }}
        >
          <LC.ProjectSettingsWidget
            onProjectNameUpdate={(newName) => props.onProjectNameUpdate(newName)}
            onSampleAliasChange_Plural={(newSampleAlias) => props.onSampleAliasChange(newSampleAlias)}
          />
          <LC.F_ProjectWidgets />
        </Layout.ScrollView>
      )}
    </Layout.Screen>
  );
});
