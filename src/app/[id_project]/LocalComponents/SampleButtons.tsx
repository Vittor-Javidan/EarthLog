import React from 'react';
import { useLocalSearchParams } from 'expo-router';

import { Layout } from '@Components/Layout';
import { navigate } from '@Globals/NavigationControler';
import ProjectService from '@Services/ProjectService';

export default function SampleButtons() {

  const id_project = useLocalSearchParams().id_project as string;

  return (
    <Layout.ScrollView
      contenContainerStyle={{
        paddingTop: 1,
        gap: 1,
      }}
    >
      {ProjectService.allSamples.map(sampleSettings => (
        <Layout.Button.TextWithIcon
          key={sampleSettings.id_sample}
          title={sampleSettings.name}
          iconSide="Right"
          iconName="clipboard"
          onPress={() => navigate('SAMPLE SCREEN', id_project, sampleSettings.id_sample)}
        />
      ))}
    </Layout.ScrollView>
  );
}
