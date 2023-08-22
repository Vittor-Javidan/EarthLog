import React, { useMemo, useState, useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';

import { Layout } from '@Components/Layout';
import { navigate } from '@Globals/NavigationControler';
import { useBackPress } from '@Hooks/index';
import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';
import CacheService from '@Services/CacheService';

import NavigationTree from './NavigationTree';
import ScreenButtons from './ScreenButtons';
import Widgets_Template from './LocalComponents/Widgets_Template';

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
      navigationTree={<NavigationTree />}
      screenButtons={<ScreenButtons />}
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
          <Widgets_Template />
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
