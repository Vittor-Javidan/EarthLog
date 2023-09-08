import React, { useMemo, useState, useEffect, ReactNode } from 'react';
import { Dimensions } from 'react-native';
import { MotiView } from 'moti';
import { useLocalSearchParams } from 'expo-router';

import { useBackPress } from '@Hooks/index';
import { navigate } from '@Globals/NavigationControler';
import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';
import CacheService from '@Services/CacheService';

import { Layout } from '@Components/Layout';
import { TC } from './__TC__';
import { LC } from './__LC__';

export default function TemplateScreen() {

  const id_project = useLocalSearchParams().id_project as string;
  const { language } = useMemo(() => ConfigService.config, []);
  const stringResources = useMemo(() => translations.Screens.TemplateScreen[language], []);
  const [state, setState] = useState<'Loaded' | 'Loading'>('Loading');

  useEffect(() => {
    fetchWidgets(id_project, () => setState('Loaded'));
  }, []);
  useBackPress(() => navigate('PROJECT SCREEN', id_project));

  return (
    <Layout.Root
      title={stringResources['Template']}
      drawerChildren={<></>}
      navigationTree={<TC.NavigationTree />}
      screenButtons={<TC.ScreenButtons />}
    >
      {state === 'Loading' ? (
        <Layout.Loading />
      ) : (
        <Layout.ScrollView
          contenContainerStyle={{
            paddingTop: 10,
            padding: 5,
            gap: 10,
          }}
        >
          <Animation>
            <LC.TemplateWidgets />
          </Animation>
        </Layout.ScrollView>
      )}
    </Layout.Root>
  );
}

async function fetchWidgets(
  id_project: string,
  whenLoaded: () => void
) {
  await CacheService.loadAllWidgets_Template(id_project);
  whenLoaded();
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
