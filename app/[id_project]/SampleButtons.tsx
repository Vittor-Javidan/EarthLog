import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { Layout } from '@Components/Layout';

import ProjectService from '@Services/ProjectService';
import { useNavigate } from 'app/GlobalHooks';

export default function SampleButtons() {

  const id_project = useLocalSearchParams().id_project as string;

  return <>
    {ProjectService.allSamples.map(sampleSettings => (
      <Layout.Button
        key={sampleSettings.id_sample}
        title={sampleSettings.name}
        onPress={async () => await useNavigate('SAMPLE SCREEN', id_project, sampleSettings.id_sample)}
      />
    ))}
  </>;
}
