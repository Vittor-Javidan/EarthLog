import React, { useMemo } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { useNavigate } from '@Hooks/index';
import { Layout } from '@Components/Layout';
import Inputs_SampleSettings from './Inputs_SampleSettings';
import DeleteButton from './DeleteButton';

import { translations } from '@Translations/index';

import ConfigService from '@Services/ConfigService';

export default function SampleSettingsScreen() {

  const id_project = useLocalSearchParams().id_project as string;
  const id_sample = useLocalSearchParams().id_sample as string;

  const { config } = useMemo(() => ConfigService, []);
  const { theme, language } = useMemo(() => config, []);
  const stringResources = useMemo(() => translations.Screens.SampleSettingsScreen[language], []);

  return (
    <Layout.Root
      title={stringResources['Sample Settings']}
      showNavigationTree={true}
      drawerChildren={<></>}
      navigationTreeIcons={[
        <Layout.Button.Icon
          key="treeIcon_1"
          iconName="home"
          onPress={async () => await useNavigate('HOME SCREEN')}
        />,
        <Layout.Button.Icon
          key="treeIcon_2"
          iconName="map"
          onPress={async () => await useNavigate('PROJECT SCREEN', id_project)}
        />,
        <Layout.Button.Icon
          key="treeIcon_3"
          iconName="clipboard"
          onPress={async () => await useNavigate('SAMPLE SCREEN', id_project, id_sample)}
        />,
        <Layout.Button.Icon
          key="treeIcon_4"
          iconName="settings"
        />,
      ]}
      button_left={
        <Layout.Button.IconRounded
          iconName="arrow-back"
          showPlusSign={false}
          color_background={theme.primary}
          color={theme.onPrimary}
          onPress={async () => await useNavigate('SAMPLE SCREEN', id_project, id_sample)}
        />
      }
    >
      <Inputs_SampleSettings />
      <DeleteButton />
    </Layout.Root>
  );
}
