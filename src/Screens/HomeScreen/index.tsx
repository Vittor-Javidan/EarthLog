import React, { useMemo, ReactNode } from 'react';
import { Dimensions } from 'react-native';
import { MotiView } from 'moti';

import { ScopeState } from '@Types/index';

import { Layout } from '@Layout/index';
import { LC } from './__LC__';
import { TC } from './__TC__';

export default function HomeScreen(props: {
  homeScopeState: ScopeState
}) {
  return (
    <Layout.Screen
      screenButtons={<TC.ScreenButtons />}
    >
      {props.homeScopeState === 'Loading' ? (
        <Layout.Loading />
      ) : (
        <Layout.ScrollView>
          <Animation>
            <LC.LastProjectButton />
            <LC.ProjectButtons />
          </Animation>
        </Layout.ScrollView>
      )}
    </Layout.Screen>
  );
}

function Animation(props: { children: ReactNode}) {

  const { height } = useMemo(() => Dimensions.get('window'), []);

  return (
    <MotiView
      style={{
        paddingTop: 10,
        padding: 5,
        gap: 10,
      }}
      from={{ top: 2 * height }}
      transition={{
        type: 'spring',
        duration: 500,
      }}
      animate={{
        top: 0,
      }}
    >
      {props.children}
    </MotiView>
  );
}
