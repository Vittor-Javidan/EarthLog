import React, { useState, useMemo, memo, useCallback } from 'react';
import { View } from 'react-native';

import { translations } from '@V1/Translations/index';
import ProjectService from '@V1/Services/ProjectService';
import ConfigService from '@V1/Services/ConfigService';
import { AlertAPI } from '@V1/Layers/API/Alert';
import CacheService from '@V1/Services/CacheService';
import ThemeService from '@V1/Services/ThemeService';

import { Input } from '@V1/Input/index';
import { LC } from '@V1/Layers/Alert/__LC__';
import { FooterButtons } from './FooterButtons';

export const CreateSample = memo((props: {
  id_project: string
  sampleNumber: number
  sampleAlias_Singular: string
  closeModal: () => void
}) => {

  const config          = useMemo(() => ConfigService.config, []);
  const theme           = useMemo(() => ThemeService.appThemes[config.appTheme].layout.modalPopUp, []);
  const R               = useMemo(() => translations.component.alert.createSample[config.language], []);
  const [name, setName] = useState<string>(`${props.sampleNumber}`);

  const onAccept = useCallback(async () => {

    if (name === '') {
      return;
    }

    const { id_project } = props;
    const projectSettings = CacheService.getProjectFromCache({ id_project });
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
      onSuccess: () => {
        CacheService.addToAllSamples({ sampleSettings: newSampleSettings });
        AlertAPI.runAcceptCallback();
        props.closeModal();
      },
      onError: (errorMesage) => alert(errorMesage) ,
    });

  }, [props.id_project, props.closeModal, name]);

  return (
    <LC.PopUp>
      <View
        style={{
          paddingHorizontal: 5,
        }}
      >
        <Input.String
          label={props.sampleAlias_Singular !== '' ? props.sampleAlias_Singular : R['Sample name']}
          value={name}
          onTextChange={(text) => setName(text)}
          placeholder={''}
          multiline={false}
          theme={{
            font: theme.font,
            font_placeholder: theme.font_placeHolder,
            background: theme.background,
          }}
          autoFocus
          selectTextOnFocus
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
