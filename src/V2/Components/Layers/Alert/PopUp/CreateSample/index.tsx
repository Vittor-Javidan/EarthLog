import React, { useState, useMemo, memo, useCallback } from 'react';
import { View } from 'react-native';

import { translations } from '@V2/Translations/index';
import { ThemeService } from '@V2/Services_Core/ThemeService';
import { ProjectService } from '@V2/Services/ProjectService';
import { ConfigService } from '@V2/Services/ConfigService';
import { CacheService } from '@V2/Services/CacheService';
import { AlertAPI } from '@V2/Layers/API/Alert';

import { Input } from '@V2/Input/index';
import { LC } from '@V2/Layers/Alert/__LC__';
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
