import React, { useMemo, ReactNode, memo,useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import Animated, { withDelay, useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated';

import { Loading } from '@Types/AppTypes';

import { Layout } from '@Layout/index';
import { TC } from './__TC__';
import { LC } from './__LC__';

const LC_SampleButtons = memo(() => <LC.SampleButtons />);

export function ProjectScreen(props: {
  projectScopeState: Loading
}) {

  const [buttonsRefresher, setButtonsRefresher] = useState<boolean>(false);

  return (
    <Layout.Screen
      screenButtons={
        <TC.ScreenButtons
          onSampleCreation={() => setButtonsRefresher(prev => !prev)}
        />
      }
    >
      {props.projectScopeState === 'Loading' ? (
        <Layout.Loading />
      ) : (
        <Animation>
          <LC_SampleButtons
            key={'refresher:' + buttonsRefresher}
          />
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
