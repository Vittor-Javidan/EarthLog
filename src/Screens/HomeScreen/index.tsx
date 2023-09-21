import React, { useMemo, ReactNode, useEffect, memo, useState } from 'react';
import { Dimensions } from 'react-native';
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
            <LC_ProjectButtons
              key={'refresher:' + buttonsRefresher}
            />
          </Layout.ScrollView>
        </Animation>
      )}
    </Layout.Screen>
  );
}

const LC_LastProjectButton = memo(() => <LC.LastProjectButton />);
const LC_ProjectButtons    = memo(() => (
  <LC.ProjectButtons />
));

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
