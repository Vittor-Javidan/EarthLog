import React, { useState, useMemo, memo, useCallback } from 'react';
import { View } from 'react-native';

import { translations } from '@V1/Translations/index';
import { ConfigService } from '@V1/Services/ConfigService';
import { ProjectService } from '@V1/Services/ProjectService';
import { ThemeService } from '@V1/Services_Core/ThemeService';
import { CacheService } from '@V1/Services/CacheService';
import { PopUpAPI } from '@V1/Layers/API/PopUp';

import { Input } from '@V1/Input/index';
import { LC } from '@V1/Layers/PopUp/__LC__';
import { FooterButtons } from './FooterButtons';

export const CreateProject = memo((props: {
  closeModal: () => void
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].layout.modalPopUp, []);
  const RS     = useMemo(() => translations.component.alert.shared[config.language], []);
  const R      = useMemo(() => translations.component.alert.createProject[config.language], []);
  const [name     , setName     ] = useState<string>('');
  const [feedbacks, setFeedbacks] = useState<string[]>([]);
  const [show     , setShow     ] = useState({
    input: true,
    feedbackDisplay: false,
    showFooterButtons: true,
  });

  const onAccept = useCallback(async () => {

    if (name === '') {
      return;
    }

    setShow(prev => ({ ...prev,
      feedbackDisplay: true,
      input: false,
      showFooterButtons: false,
    }));

    const projectDTO = ProjectService.getDefaultProjectTemplate({ name: name });
    const { projectSettings } = projectDTO;
    const { id_project } = projectSettings;
    const syncData = ProjectService.getDefaultSyncData({ id_project });

    await ProjectService.createProject({
      projectDTO, syncData,
      onSuccess: () => {
        setFeedbacks(prev => ([ ...prev, RS['Done!']]));
        CacheService.addToAllProjects({ projectSettings });
        CacheService.addToSyncData({ syncData });
        PopUpAPI.runAcceptCallback();
        props.closeModal();
      },
      onError: (errorMesage) => {
        setFeedbacks(prev => ([ ...prev, RS['Error!']]));
        alert(errorMesage);
      },
      feedback: (feedbackMessages) => setFeedbacks(prev => ([ ...prev, feedbackMessages])),
    });

  }, [props.closeModal, name]);

  return (
    <LC.PopUp>
      {show.input && (
        <View
          style={{
            paddingHorizontal: 5,
          }}
        >
          <Input.String
            label={R['Project name']}
            value={name}
            onTextChange={(text) => setName(text)}
            placeholder={R["Write project's name here..."]}
            multiline={false}
            theme={{
              font: theme.font,
              font_placeholder: theme.font_placeHolder,
              background: theme.background,
            }}
            autoFocus
          />
        </View>
      )}
      <LC.FeedbackDisplay
        showDisplay={show.feedbackDisplay}
        feedbackMessage={feedbacks}
      />
      <FooterButtons
        isNameEmpty={name === ''}
        showButtons={show.showFooterButtons}
        onCancel={() => props.closeModal()}
        onConfirm={async () => await onAccept()}
      />
    </LC.PopUp>
  );
});
