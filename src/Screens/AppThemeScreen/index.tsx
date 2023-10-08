import React, { ReactNode, memo, useEffect, useMemo } from 'react';
import { Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Animated, { useSharedValue, withDelay, withTiming, useAnimatedStyle } from 'react-native-reanimated';

import { Layout } from '@Layout/index';
import { Loading } from '@Types/AppTypes';
import { LC } from './__LC__';
import { TC } from './__TC__';

export const AppThemeScreen = memo((props: {
  themeScopeState: Loading
  onAppThemeSelect: () => void
}) => {

  return (
    <Layout.Screen
      screenButtons={<TC.ScreenButtons />}
    >
      {props.themeScopeState === 'Loading' ? (
        <Layout.Loading />
      ) : (
        <Animation>
          <ScrollView
            contentContainerStyle={{
              paddingTop: 55,
              paddingBottom: 150,
              paddingHorizontal: 1,
              gap: 1,
            }}
          >
            <LC.ThemeButtons
              onAppThemeSelect={() => props.onAppThemeSelect()}
            />
          </ScrollView>
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
