import React, { useMemo } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { Layout } from '@Components/Layout';

import ThemeService from '@Services/ThemeService';
import ProjectService from '@Services/ProjectService';
import { useNavigate } from 'app/GlobalHooks';
import ConfigService from '@Services/ConfigService';
import { translations } from '@Translations/index';

export default function SampleButtons() {

  const stringResources = useMemo(
    () => translations.Screens.ProjectScreen[ConfigService.config.language], []
  );

  const showSamples = ProjectService.allSamples.length > 0;

  return (
    <Layout.View>
      {showSamples && (<>
          <Layout.Text
            fontSize={ThemeService.FONTS.h2}
            color={'onBackground'}
          >
            {stringResources['Samples']}
          </Layout.Text>
          <AllButtons />
        </>)}
    </Layout.View>
  );
}

function AllButtons() {

  const id_project = useLocalSearchParams().id_project as string;

  return <>
    {ProjectService.allSamples.map(sampleSettings => (
      <Layout.Button
        key={sampleSettings.id_sample}
        title={sampleSettings.name}
        onPress={async () => {
          await ProjectService.loadAllWidgets_Sample(id_project, sampleSettings.id_sample);
          useNavigate('SAMPLE SCREEN', id_project, sampleSettings.id_sample);
        }}
      />
    ))}
  </>;
}
