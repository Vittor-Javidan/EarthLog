import React from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Layout } from '@Components/Layout';

import AppRoutes from '@Globals/AppRoutes';

import ThemeService from '@Services/ThemeService';
import ProjectService from '@Services/ProjectService';

export default function SampleButtons() {

  const showSamples = ProjectService.allSamples.length > 0;

  return (
    <Layout.View>
      {showSamples && (<>
          <Layout.Text
            fontSize={ThemeService.FONTS.h2}
            color={'onBackground'}
          >
            Samples
          </Layout.Text>
          <AllButtons />
        </>)}
    </Layout.View>
  );
}

function AllButtons() {

  const navController = useRouter();
  const id_project = useLocalSearchParams().id_project as string;

  function goToSampleCreationScreen(
    id_project: string,
    id_sample: string
  ) {
    navController.push(AppRoutes.PS_SAMPLE_SCREEN(id_project, id_sample));
  }

  return <>
    {ProjectService.allSamples.map(sampleSettings => (
      <Layout.Button
        key={sampleSettings.id_sample}
        title={sampleSettings.name}
        onPress={async () => {
          await ProjectService.loadAllWidgets_Sample(id_project, sampleSettings.id_sample);
          goToSampleCreationScreen(id_project, sampleSettings.id_sample);
        }}
      />
    ))}
  </>;
}
