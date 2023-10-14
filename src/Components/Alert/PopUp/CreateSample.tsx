import React, { useState, useMemo, memo, useCallback } from 'react';
import { View } from 'react-native';

import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';
import AlertService from '@Services/AlertService';
import ProjectService from '@Services/ProjectService';
import CacheService from '@Services/CacheService';
import ThemeService from '@Services/ThemeService';
import SyncService from '@Services/SyncService';

import { Button } from '@Button/index';
import { Input } from '@Input/index';
import { LC } from '../__LC__';

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

    await ProjectService.createSample(projectSettings.id_project, newSampleSettings,
      async () => {
        CacheService.addToAllSamples(newSampleSettings);
        await SyncService.syncData_Samples(projectSettings.id_project, newSampleSettings.id_sample, 'creation');
        await AlertService.runAcceptCallback();
        props.closeModal();
      },
      (errorMesage) => alert(errorMesage),
    );

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
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 10,
          gap: 10,
        }}
      >
        <Button.Icon
          iconName="close"
          onPress={() => props.closeModal()}
          theme={{
            font: theme.wrong,
            font_Pressed: theme.wrong,
            background: theme.background_Button,
            background_Pressed: theme.background_active,
          }}
          style={{
            height: 40,
            flex: 1,
            justifyContent: 'center',
            paddingVertical: 0,
            borderRadius: 10,
          }}
        />
        <Button.Icon
          iconName={name === '' ? 'lock-closed-sharp' : 'checkmark-done-sharp'}
          onPress={async () => await onAccept()}
          theme={{
            font: theme.font,
            font_Pressed: theme.confirm,
            background: theme.confirm,
            background_Pressed: theme.background_active,
          }}
          style={{
            height: 40,
            flex: 1,
            justifyContent: 'center',
            paddingVertical: 5,
            borderRadius: 10,
          }}
        />
      </View>
    </LC.PopUp>
  );
});
