import React, { useState } from 'react';

import { Layout } from '@Layout/index';
import { navigate } from '@Globals/NavigationControler';
import { useBackPress } from '@Hooks/index';

import { LC } from './__LC__';
import { TC } from './__TC__';

export default function LanguagesSelectionScreen(): JSX.Element {

  const [_, refresh] = useState<boolean>(false);

  useBackPress(() => navigate('SETTINGS SCOPE'));

  return (
    <Layout.Screen
      screenButtons={<TC.ScreenButtons />}
    >
      <Layout.View
        style={{
          paddingTop: 1,
          gap: 1,
        }}
      >
        <LC.LanguageButtons
          onButtonClick={() => refresh(prev => !prev)}
        />
      </Layout.View>
    </Layout.Screen>
  );
}
