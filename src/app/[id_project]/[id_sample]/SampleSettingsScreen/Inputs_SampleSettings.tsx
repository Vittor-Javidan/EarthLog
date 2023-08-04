import React, { useState, useMemo } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { Input } from '@Components/Inputs';
import { Layout } from '@Components/Layout';
import { useTiming } from '@Hooks/index';

import { InputColors } from '@Types/index';
import { translations } from '@Translations/index';

import ConfigService from '@Services/ConfigService';
import ProjectService from '@Services/ProjectService';

export default function Inputs_SampleSettings() {

  const id_project = useLocalSearchParams().id_project as string;
  const id_sample = useLocalSearchParams().id_sample as string;

  const { config } = useMemo(() => ConfigService, []);
  const { theme, language } = useMemo(() => config, []);
  const stringResources = useMemo(() => translations.Screens.SampleSettingsScreen[language], []);
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

  const inputColors: InputColors = {
    label: {
      background: theme.secondary,
      font: theme.onSecondary,
    },
    dataDisplay: {
      background: theme.tertiary,
      font: theme.onTertiary,
      font_placeholder: theme.onTertiary_Placeholder,
    },
  };

  return (<>
    <Layout.Feedback
      title={stringResources['Status:']}
      assert={saved}
      values={{ whenTrue: stringResources['Saved'], whenFalse: stringResources['Saving...']}}
    />
    <Input.String
      colors={inputColors}
      label={stringResources['ID']}
      placeholder=""
      locked={true}
      value={sampleSettings.id_sample}
    />
    <Input.String
      colors={inputColors}
      label={stringResources['Name']}
      placeholder={stringResources['Write the sample name here...']}
      locked={!rules.allowNameChange}
      value={name}
      onChangeText={(text) => onNameChange(text)}
      onResetPress={() => onNameReset()}
    />
  </>);
}
