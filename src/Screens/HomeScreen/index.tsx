import React, { useMemo, ReactNode, useEffect, memo } from 'react';
import { Dimensions } from 'react-native';
import Animated, { withDelay, useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated';

import { Loading } from '@Types/AppTypes';

import { Layout } from '@Layout/index';
import { LC } from './__LC__';
import { TC } from './__TC__';

const LC_LastProjectButton = memo(() => <LC.LastProjectButton />);
const LC_ProjectButtons    = memo(() => <LC.ProjectButtons />   );

export default function HomeScreen(props: {
  homeScopeState: Loading
}) {
  return (
    <Layout.Screen
      screenButtons={<TC.ScreenButtons />}
    >
      {props.homeScopeState === 'Loading' ? (
        <Layout.Loading />
      ) : (
        <Animation>
          <Layout.ScrollView
            contenContainerStyle={{
              paddingTop: 10,
              padding: 5,
              gap: 10,
            }}
          >
            <LC_LastProjectButton />
            <LC_ProjectButtons />
          </Layout.ScrollView>
        </Animation>
      )}
    </Layout.Screen>
  );
}

function Animation(props: { children: ReactNode}) {

  const { width } = useMemo(() => Dimensions.get('window'), []);
  const leftOffset = useSharedValue(0);

  useEffect(() => {
    const animationFrameId = requestAnimationFrame(() => {
      leftOffset.value = withDelay(300, withTiming(width, {
        duration: 200,
      }));
    });
    return () => { cancelAnimationFrame(animationFrameId); };
  }, []);

  return (
    <Animated.View
      style={[
        { left: -width },
        useAnimatedStyle(() => ({
          transform: [{ translateX: leftOffset.value }],
        })),
      ]}
    >
      {props.children}
    </Animated.View>
  );
}
