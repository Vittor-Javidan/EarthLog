import React, { useState, useMemo, memo, useCallback } from 'react';
import { View } from 'react-native';

import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';
import AlertService from '@Services/AlertService';
import ProjectService from '@Services/ProjectService';
import CacheService from '@Services/CacheService';
import ThemeService from '@Services/ThemeService';
import HapticsService from '@Services/HapticsService';

import { Button } from '@Button/index';
import { Input } from '@Input/index';
import { LC } from '../__LC__';

export const CreateSample = memo((props: {
  id_project: string | undefined
  closeModal: () => void
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].layout.modalPopUp, []);
  const R      = useMemo(() => translations.component.alert[config.language], []);
  const [name, setName] = useState<string>('');

  const onAccept = useCallback(async () => {
    if (name !== '' && props.id_project !== undefined) {
      const { id_project } = props;
      const sampleSettings = ProjectService.getDefaultSampleSettings();
      sampleSettings.name = name;
      await ProjectService.createSample(
        id_project,
        sampleSettings,
        async () => {
          CacheService.addToAllSamples(sampleSettings);
          await AlertService.runAcceptCallback();
          props.closeModal();
        },
        async (errorMesage) => {
          alert(errorMesage);
          HapticsService.vibrate('warning');
        }
      );
    }
    if (props.id_project === undefined) {
      alert(R['No project ID found']);
    }
  }, [props.id_project, props.closeModal, name, R]);

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
          iconName={name !== '' ? 'checkmark-done-sharp' : 'lock-closed-sharp'}
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
