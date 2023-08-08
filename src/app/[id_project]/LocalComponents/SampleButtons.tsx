import React, { useMemo } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { useNavigate } from '@Hooks/index';
import { Layout } from '@Components/Layout';

import ProjectService from '@Services/ProjectService';
import ConfigService from '@Services/ConfigService';

export default function SampleButtons() {

  const id_project = useLocalSearchParams().id_project as string;

  const noSample = ProjectService.allSamples.length <= 0;

  return (<>
    {noSample ? (
      <NoSampleMessage />
    ) : (
      ProjectService.allSamples.map(sampleSettings => (
        <Layout.SampleDisplay
          key={sampleSettings.id_sample}
          title_label=""
          title_button={sampleSettings.name}
          onPress_Open={async () => await useNavigate('SAMPLE SCREEN', id_project, sampleSettings.id_sample)}
        />
      ))
    )}
  </>);
}

function NoSampleMessage() {

  const { config } = useMemo(() => ConfigService, []);
  const { theme } = useMemo(() => config, []);

  return (
    <Layout.Text.MessageArea
      color_background={theme.primary}
      color_border={theme.secondary}
    >
      <Layout.Text.BR />
      <Layout.Text.H1
        style={{ color: theme.onPrimary }}
      >
        Nothing here!
      </Layout.Text.H1>
      <Layout.Text.BR />
      <Layout.Text.H2
        style={{ color: theme.onPrimary }}
      >
        Collecting data:
      </Layout.Text.H2>
      <Layout.Text.P
        style={{ color: theme.onPrimary }}
      >
        To start to create subgroups and collect data, click on the right side button on the bottom of your screen.
      </Layout.Text.P>
      <Layout.Text.H2
        style={{ color: theme.onPrimary }}
      >
        Defining a template:
      </Layout.Text.H2>
      <Layout.Text.P
        style={{ color: theme.onPrimary }}
      >
        To define a template and speed up your job, define a template by seletecting "Template" on Project Screen Menu.
      </Layout.Text.P>
    </Layout.Text.MessageArea>
  );
}
