import React, { useState, memo } from 'react';
import { View } from 'react-native';

import { Loading } from '@Types/AppTypes';

import { Animation } from '@Animation/index';
import { Layout } from '@Layout/index';
import { LC } from './__LC__';
import { TC } from './__TC__';

export const HomeScreen = memo((props: {
  homeScopeState: Loading
}) => {

  const [_, refresher] = useState<boolean>(false);

  return (
    <Layout.Screen
      screenButtons={
        <TC.ScreenButtons
          onProjectCreation={() => refresher(prev => !prev)}
        />
      }
    >
      {props.homeScopeState === 'Loading' ? (
        <Layout.Loading />
      ) : (<>
        <Animation.SlideFromLeft
          delay={200}
          duration={200}
        >
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
            <LC.F_ProjectButtons />
          </View>
        </Animation.SlideFromLeft>
      </>)}
    </Layout.Screen>
  );
});
