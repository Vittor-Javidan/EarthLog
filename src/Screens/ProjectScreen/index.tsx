import React, { useState, memo } from 'react';

import { Loading } from '@Types/AppTypes';

import { Animation } from '@Animation/index';
import { Layout } from '@Layout/index';
import { TC } from './__TC__';
import { LC } from './__LC__';

export const ProjectScreen = memo((props: {
  projectScopeState: Loading
}) => {

  const [_, refresh] = useState<boolean>(false);

  return (
    <Layout.Screen
      screenButtons={
        <TC.ScreenButtons
          onSampleCreation={() => refresh(prev => !prev)}
        />
      }
    >
      {props.projectScopeState === 'Loading' ? (
        <Layout.Loading />
      ) : (
        <Animation.SlideFromLeft
          delay={300}
          duration={200}
        >
          <LC.F_SampleButtons />
        </Animation.SlideFromLeft>
      )}
    </Layout.Screen>
  );
});
