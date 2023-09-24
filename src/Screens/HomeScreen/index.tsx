import React, { useMemo, ReactNode, useEffect, useState } from 'react';
import { Dimensions, View } from 'react-native';
import Animated, { withDelay, useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated';

import { Loading } from '@Types/AppTypes';

import { Layout } from '@Layout/index';
import { LC } from './__LC__';
import { TC } from './__TC__';

export default function HomeScreen(props: {
  homeScopeState: Loading
}) {

  const [buttonsRefresher, setButtonsRefresher] = useState<boolean>(false);

  return (
    <Layout.Screen
      screenButtons={
        <TC.ScreenButtons
          onProjectCreation={() => setButtonsRefresher(prev => !prev)}
        />
      }
    >
      {props.homeScopeState === 'Loading' ? (
        <Layout.Loading />
      ) : (<>
        <Animation>
          <View
            style={{
              flex: 1,
              paddingTop: 10,
              padding: 5,
              gap: 10,
              paddingBottom: 80,
            }}
          >
            <LC.SocialMediaButtons />
            <LC.LastProjectButton />
            <LC.ProjectButtons
              key={'refresher:' + buttonsRefresher}
            />
          </View>
        </Animation>
      </>)}
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
        {
          flex: 1,
          left: -width,
        },
        useAnimatedStyle(() => ({
          transform: [{ translateX: leftOffset.value }],
        })),
      ]}
    >
      {props.children}
    </Animated.View>
  );
}
