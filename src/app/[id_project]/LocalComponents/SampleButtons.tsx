import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { useNavigate } from '@Hooks/index';
import { Layout } from '@Components/Layout';

import ProjectService from '@Services/ProjectService';

export default function SampleButtons() {

  const id_project = useLocalSearchParams().id_project as string;

  return (<>
    {ProjectService.allSamples.map(sampleSettings => (
      <Layout.UI.Sample
        key={sampleSettings.id_sample}
        title_label=""
        title_button={sampleSettings.name}
        onPress_Open={async () => await useNavigate('SAMPLE SCREEN', id_project, sampleSettings.id_sample)}
      />
    ))}
  </>);
}
