import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { useNavigate } from '@Hooks/index';
import { Layout } from '@Components/Layout';

import ProjectService from '@Services/ProjectService';

export default function SampleButtons() {

  const id_project = useLocalSearchParams().id_project as string;

  return (
    <Layout.View
      style={{
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
          onPress={async () => await useNavigate('SAMPLE SCREEN', id_project, sampleSettings.id_sample)}
        />
      ))}
    </Layout.View>
  );
}
