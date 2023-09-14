import React, { useMemo, ReactNode } from 'react';
import { Dimensions } from 'react-native';
import { MotiView } from 'moti';

import { ScopeState } from '@Types/index';
import { navigate } from '@Globals/NavigationControler';
import { useBackPress } from '@Hooks/index';

import { Layout } from '@Components/Layout';
import { TC } from './__TC__';
import { LC } from './__LC__';

export default function ProjectScreen(props: {
  projectScopeState: ScopeState
}) {

  useBackPress(() => navigate('HOME SCREEN'));

  return (
    <Layout.Screen
      screenButtons={<TC.ScreenButtons />}
    >
      {props.projectScopeState === 'Loading' ? (
        <Layout.Loading />
      ) : (
        <Animation>
          <LC.SampleButtons />
        </Animation>
      )}
    </Layout.Screen>
  );
}

function Animation(props: { children: ReactNode}) {

  const { width } = useMemo(() => Dimensions.get('window'), []);

  return (
    <MotiView
      from={{ left: -width }}
      transition={{
        type: 'timing',
        duration: 200,
        delay: 300,
      }}
      animate={{
        left: 0,
      }}
    >
      {props.children}
    </MotiView>
  );
}
