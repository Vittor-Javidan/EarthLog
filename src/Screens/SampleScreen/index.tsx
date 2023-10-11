import React, { useMemo, ReactNode, useEffect, useState, memo } from 'react';
import { Dimensions } from 'react-native';
import Animated, { useSharedValue, withDelay, withTiming, useAnimatedStyle } from 'react-native-reanimated';

import { Loading } from '@Types/AppTypes';
import { GPS_DTO } from '@Types/ProjectTypes';

import { Layout } from '@Layout/index';
import { TC } from './__TC__';
import { LC } from './__LC__';

export const SampleDataScreens = memo((props: {
  sampleScopeState: Loading
  referenceGPS: GPS_DTO | undefined
}) => {

  const [_, refresh] = useState<boolean>(false);

  return (
    <Layout.Screen
      screenButtons={<TC.ScreenButtons
        onCreateWidget={() => refresh(prev => !prev)}
      />}
    >
      {props.sampleScopeState === 'Loading' ? (
        <Layout.Loading />
      ) : (
        <Animation>
          <Layout.ScrollView
            contentContainerStyle={{
              paddingHorizontal: 5,
              paddingTop: 55,
              gap: 10,
            }}
          >
            <LC.F_SampleWidgets
              referenceGPS={props.referenceGPS}
            />
          </Layout.ScrollView>
        </Animation>
      )}
    </Layout.Screen>
  );
});

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
