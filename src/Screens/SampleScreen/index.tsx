import React, { useState, memo } from 'react';

import { Loading } from '@Types/AppTypes';
import { GPS_DTO } from '@Types/ProjectTypes';

import { Animation } from '@Animation/index';
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
        <Animation.SlideFromLeft
          delay={200}
          duration={200}
        >
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
        </Animation.SlideFromLeft>
      )}
    </Layout.Screen>
  );
});
