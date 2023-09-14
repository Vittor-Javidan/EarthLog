
import React, { useState, useEffect, useMemo, ReactNode } from 'react';

import { Layout } from '@Layout/index';
import { API } from './__API__';
import { LC } from './__LC__';
import { TC } from './__TC__';
import { Dimensions } from 'react-native';
import { MotiView } from 'moti';

export default function ThemeScreen(): JSX.Element {

  const [state, setState] = useState<'Loaded' | 'Loading'>('Loading');

  useEffect(() => { setState('Loaded'); }, []);
  useEffect(() => {
    return () => { API.ExampleFigure.discart(); };
  }, []);

  return (
    <Layout.Screen
      screenButtons={<TC.ScreenButtons />}
    >
      {state === 'Loading' ? (
        <Layout.Loading />
      ) : (
        <Animation>
          <Layout.ScrollView
            contenContainerStyle={{
              paddingTop: 55,
            }}
          >
            <LC.AllInputs />
          </Layout.ScrollView>
        </Animation>
      )}
    </Layout.Screen>
  );
}

export function ThemePreviewScreen() {

  const [state, setState] = useState<'Loaded' | 'Loading'>('Loading');

  useEffect(() => { setState('Loaded'); }, []);

  return (
    <Layout.Screen
      screenButtons={<></>}
      style={{
        paddingTop: 55,
      }}
    >
      {state === 'Loading' ? (
        <Layout.Loading />
      ) : (
        <LC.ExampleFigure />
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
