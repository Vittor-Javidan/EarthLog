import React, { useState, useMemo, memo, useCallback } from 'react';
import { View } from 'react-native';

import { translations } from '@V1/Translations/index';
import ConfigService from '@V1/Services/ConfigService';
import AlertService from '@V1/Services/AlertService';
import ProjectService from '@V1/Services/ProjectService';
import CacheService from '@V1/Services/CacheService';
import ThemeService from '@V1/Services/ThemeService';

import { Input } from '@V1/Input/index';
import { LC } from '@V1/Alert/__LC__';
import { FooterButtons } from './FooterButtons';

export const CreateSample = memo((props: {
  id_project: string
  closeModal: () => void
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].layout.modalPopUp, []);
  const R      = useMemo(() => translations.component.alert.createSample[config.language], []);
  const [name, setName] = useState<string>('');

  const onAccept = useCallback(async () => {

    if (name === '') {
      return;
    }

    const projectSettings = CacheService.getProjectFromCache(props.id_project);
    const newSampleSettings = ProjectService.getDefaultSampleSettings({
      name: name,
      gps: projectSettings.rules.addGPSToNewSamples ? {} : undefined,
      rules: projectSettings.sampleRules,
    });

    await ProjectService.createSample({
      id_project: projectSettings.id_project,
      sampleSettings: newSampleSettings,
      addTemplateWidgets: true,
      sync: true,
    }, () => {
      CacheService.addToAllSamples(newSampleSettings);
      AlertService.runAcceptCallback();
      props.closeModal();
    }, (errorMesage) => alert(errorMesage));

  }, [props.id_project, props.closeModal, name]);

  return (
    <LC.PopUp>
      <View
        style={{
          paddingHorizontal: 5,
        }}
      >
        <Input.String
          label={R['Sample name']}
          value={name}
          onTextChange={(text) => setName(text)}
          placeholder={R["Write sample's name here"]}
          multiline={false}
          theme={{
            font: theme.font,
            font_placeholder: theme.font_placeHolder,
            background: theme.background,
          }}
          autoFocus
        />
      </View>
      <FooterButtons
        isNameEmpty={name === ''}
        onCancel={() => props.closeModal()}
        onConfirm={async () => await onAccept()}
      />
    </LC.PopUp>
  );
});
