import React, { useMemo, ReactNode } from 'react';
import { Dimensions } from 'react-native';
import { MotiView } from 'moti';

import { ScopeState } from '@Types/index';

import { Layout } from '@Components/Layout';
import { TC } from './__TC__';
import { LC } from './__LC__';

export default function SampleDataScreens(props: {
  sampleScopeState: ScopeState
}) {
  return (
    <Layout.Screen
      screenButtons={<TC.ScreenButtons />}
    >
      {props.sampleScopeState === 'Loading' ? (
        <Layout.Loading />
      ) : (
        <Animation>
          <Layout.ScrollView
            contenContainerStyle={{
              paddingHorizontal: 5,
              paddingTop: 55,
              gap: 10,
            }}
          >
            <LC.SampleWidgets />
          </Layout.ScrollView>
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
