import React, { useState, useMemo, memo, useCallback } from 'react';
import { View } from 'react-native';

import { translations } from '@V2/Translations/index';
import ConfigService from '@V2/Services/ConfigService';
import AlertService from '@V2/Services/AlertService';
import ProjectService from '@V2/Services/ProjectService';
import CacheService from '@V2/Services/CacheService';
import ThemeService from '@V2/Services/ThemeService';

import { Input } from '@V2/Input/index';
import { LC } from '@V2/Alert/__LC__';
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
        AlertService.runAcceptCallback();
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
