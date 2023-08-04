import React, { useState, useMemo } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { Input } from '@Components/Inputs';
import { Layout } from '@Components/Layout';
import { useTiming } from 'app/GlobalHooks';

import ConfigService from '@Services/ConfigService';
import ProjectService from '@Services/ProjectService';
import { InputColors } from '@Types/index';
import { translations } from '@Translations/index';

export default function Inputs_ProjectSettings() {

  const id_project = useLocalSearchParams().id_project as string;

  const { config } = useMemo(() => ConfigService, []);
  const { theme } = useMemo(() => config, []);
  const stringResources = useMemo(() => translations.Screens.ProjectSettingsScreen[ConfigService.config.language], []);
  const projectSettings = useMemo(() => ProjectService.getProjectFromCache(id_project), []);
  const { rules } = useMemo(() => projectSettings, []);

  const [name, setName] = useState<string>(projectSettings.name);
  const [immutable, setImmutable] = useState<boolean>(projectSettings.immutable);
  const [saved, setSaved] = useState<boolean>(true);

  useTiming(async () => {
    if (!saved) {
      projectSettings.name = name;
      projectSettings.immutable = immutable;
      await ProjectService.updateProject(
        projectSettings,
        () => setSaved(true),
        (erroMessage) => alert(erroMessage)
      );
    }
  }, [saved], 100);

  function onImmutableChange(boolean: boolean) {
    if (rules.allowImmutableChange) {
      setImmutable(boolean);
      setSaved(false);
    }
  }

  function onNameChange(newName: string) {
    if (rules.allowNameChange) {
      setName(newName);
      setSaved(false);
    }
  }

  function onNameReset() {
    if (rules.allowNameChange) {
      setName(projectSettings.name);
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
      label={stringResources['ID']}
      colors={inputColors}
      placeholder=""
      value={projectSettings.id_project}
      locked={true}
    />
    <Input.String
      label={stringResources['Name']}
      colors={inputColors}
      placeholder={stringResources['Write the project name here...']}
      value={name}
      locked={!rules.allowNameChange}
      onChangeText={(text) => onNameChange(text)}
      onResetPress={() => onNameReset()}
    />
    <Input.Boolean
      label={stringResources['Immutable']}
      colors={inputColors}
      value={immutable}
      locked={!rules.allowImmutableChange}
      onSwitchChange={(boolean) => onImmutableChange(boolean)}
    />
  </>);
}
