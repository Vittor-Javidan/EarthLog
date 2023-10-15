import React, { useState, useMemo, memo, useCallback } from 'react';
import { View } from 'react-native';

import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';
import AlertService from '@Services/AlertService';
import ProjectService from '@Services/ProjectService';
import CacheService from '@Services/CacheService';
import ThemeService from '@Services/ThemeService';
import SyncService from '@Services/SyncService';

import { Input } from '@Input/index';
import { LC } from '@Alert/__LC__';
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
  });

  const onAccept = useCallback(async () => {

    if (name === '') {
      return;
    }

    setShow(prev => ({ ...prev,
      feedbackDisplay: true,
      input: false,
    }));

    const newProject = ProjectService.getDefaultProjectTemplate({ name: name });
    await ProjectService.createProject(newProject,
      (feedbackMessages) => setFeedbacks(prev => ([ ...prev, feedbackMessages])),
      async () => {
        setFeedbacks(prev => ([ ...prev, RS['Done!']]));
        CacheService.addToAllProjects(newProject.projectSettings);
        SyncService.addToSyncData(newProject.syncData);
        await AlertService.runAcceptCallback();
        props.closeModal();
      },
      (errorMesage) => {
        setFeedbacks(prev => ([ ...prev, RS['Error!']]));
        alert(errorMesage);
      },
    );

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
      <LC.Feedback
        showDisplay={show.feedbackDisplay}
        feedbackMessage={feedbacks}
      />
      <FooterButtons
        isNameEmpty={name === ''}
        onCancel={() => props.closeModal()}
        onConfirm={async () => await onAccept()}
      />
    </LC.PopUp>
  );
});
