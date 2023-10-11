import React, { ReactNode, memo, useEffect, useMemo, useState } from 'react';
import { Dimensions } from 'react-native';
import Animated, { useSharedValue, withDelay, withTiming, useAnimatedStyle } from 'react-native-reanimated';

import { Loading } from '@Types/AppTypes';

import { Layout } from '@Layout/index';
import { TC } from './__TC__';
import { LC } from './__LC__';

export const CredentialSelectionScreen = memo((props: {
  credentialScopeState: Loading
}) => {

  const [_, refresh] = useState<boolean>(false);

  return (
    <Layout.Screen
      screenButtons={
        <TC.ScreenButtons
          onCredentialCreation={() => refresh(prev => !prev)}
        />
      }
    >
      {props.credentialScopeState === 'Loading' ? (
        <Layout.Loading />
      ) : (
        <Animation>
          <Layout.ScrollView
            contentContainerStyle={{
              paddingTop: 10,
              paddingHorizontal: 5,
              gap: 10,
            }}
          >
            <LC.F_AllCredentials />
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
