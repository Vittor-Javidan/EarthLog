import React, { useState, useMemo } from 'react';
import { Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Layout } from '@Components/Layout';

import ConfigService from '@Services/ConfigService';
import ProjectService from '@Services/ProjectService';
import ThemeService from '@Services/ThemeService';
import { Input } from '@Components/Inputs';
import { useTiming } from 'app/GlobalHooks';

export default function Inputs_SampleSettings() {

  const id_project = useLocalSearchParams().id_project as string;
  const id_sample = useLocalSearchParams().id_sample as string;

  const { config } = useMemo(() => ConfigService, []);
  const { theme } = useMemo(() => config, []);
  const sampleSettings = useMemo(() => ProjectService.getSampleFromCache(id_sample), []);
  const { rules } = useMemo(() => sampleSettings, []);

  const [name, setName] = useState<string>(sampleSettings.name);
  const [saved, setSaved] = useState<boolean>(true);

  useTiming(async () => {
    if (!saved) {
      sampleSettings.name = name;
      await ProjectService.updateSample(
        id_project,
        sampleSettings,
        () => setSaved(true),
        (erroMessage) => alert(erroMessage)
      );
    }
  }, [saved], 100);

  function onNameChange(newName: string) {
    if (rules.allowNameChange) {
      setName(newName);
      setSaved(false);
    }
  }

  function onNameReset() {
    if (rules.allowNameChange) {
      setName(sampleSettings.name);
      setSaved(false);
    }
  }

  return (<>
    <StatusFeedback saved={saved} />
    <Display_ID />
    {rules.allowNameChange ? <Input.String
      label="Name"
      backgroundColor_Label={theme.secondary}
      backgroundColor_Value={theme.tertiary}
      color_Label={theme.onSecondary}
      color_Value={theme.onTertiary}
      color_Placeholder={theme.onTertiary_Placeholder}
      placeholder=""
      value={name}
      onChangeText={(text) => onNameChange(text)}
      onResetPress={() => onNameReset()}
    /> : <Display_Name />}
  </>);
}

function StatusFeedback(props: { saved: boolean }) {

  const { config } = useMemo(() => ConfigService, []);
  const { theme } = useMemo(() => config, []);

  return (
    <Layout.View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 40,
        paddingHorizontal: 0,
        paddingVertical: 0,
        backgroundColor: theme.background,
      }}
    >
      <Text
        adjustsFontSizeToFit={true}
        style={{
          color: theme.onBackground,
          fontSize: ThemeService.FONTS.h3,
          paddingHorizontal: 10,
        }}
      >
        Status
      </Text>
      <Text
        adjustsFontSizeToFit={true}
        style={{
          color: props.saved ? theme.confirm : theme.modified,
          fontSize: ThemeService.FONTS.h3,
          paddingHorizontal: 10,
        }}
      >
        {props.saved ? 'Saved' : 'Saving'}
      </Text>
    </Layout.View>
  );
}

function Display_ID() {

  const id_sample = useLocalSearchParams().id_sample as string;

  const { config } = useMemo(() => ConfigService, []);
  const { theme } = useMemo(() => config, []);
  const sampleSettings = useMemo(() => ProjectService.getSampleFromCache(id_sample), []);

  return (
    <Layout.View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 40,
        paddingHorizontal: 0,
        paddingVertical: 0,
        backgroundColor: theme.secondary,
      }}
    >
      <Text
        adjustsFontSizeToFit={true}
        style={{
          color: theme.onSecondary,
          fontSize: ThemeService.FONTS.h3,
          paddingHorizontal: 10,
        }}
      >
        ID
      </Text>
      <Text
        adjustsFontSizeToFit={true}
        style={{
          color: theme.onSecondary,
          fontSize: ThemeService.FONTS.h3,
          paddingHorizontal: 10,
        }}
      >
        {sampleSettings.id_sample}
      </Text>
    </Layout.View>
  );
}

function Display_Name() {

  const id_sample = useLocalSearchParams().id_sample as string;

  const { config } = useMemo(() => ConfigService, []);
  const { theme } = useMemo(() => config, []);
  const sampleSettings = useMemo(() => ProjectService.getSampleFromCache(id_sample), []);

  return (
    <Layout.View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 40,
        paddingHorizontal: 0,
        paddingVertical: 0,
        backgroundColor: theme.secondary,
      }}
    >
      <Text
        adjustsFontSizeToFit={true}
        style={{
          color: theme.onSecondary,
          fontSize: ThemeService.FONTS.h3,
          paddingHorizontal: 10,
        }}
      >
        Name
      </Text>
      <Text
        adjustsFontSizeToFit={true}
        style={{
          color: theme.onSecondary,
          fontSize: ThemeService.FONTS.h3,
          paddingHorizontal: 10,
        }}
      >
        {sampleSettings.name}
      </Text>
    </Layout.View>
  );
}
