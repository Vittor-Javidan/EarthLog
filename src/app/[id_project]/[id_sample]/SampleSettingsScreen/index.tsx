import React, { useMemo, ReactNode } from 'react';
import { Dimensions } from 'react-native';
import { MotiView } from 'moti';

import { Layout } from '@Components/Layout';
import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';

import NavigationTree from './NavigationTree';
import ScreenButtons from './ScreenButtons';
import Inputs_SampleSettings from './LocalComponents/Inputs_SampleSettings';

export default function SampleSettingsScreen() {

  const { language } = useMemo(() => ConfigService.config, []);
  const stringResources = useMemo(() => translations.Screens.SampleSettingsScreen[language], []);

  return (
    <Layout.Root
      title={stringResources['Edit sample']}
      drawerChildren={<></>}
      navigationTree={<NavigationTree />}
      screenButtons={<ScreenButtons />}
    >
      <Layout.ScrollView>
        <Animation>
          <Inputs_SampleSettings />
        </Animation>
      </Layout.ScrollView>
    </Layout.Root>
  );
}

function Animation(props: { children: ReactNode}) {

  const { height } = useMemo(() => Dimensions.get('window'), []);

  return (
    <MotiView
      style={{
        paddingTop: 10,
        padding: 5,
        gap: 10,
      }}
      from={{ top: -height }}
      transition={{
        type: 'timing',
        duration: 500,
      }}
      animate={{
        top: 0,
      }}
    >
      {props.children}
    </MotiView>
  );
}
