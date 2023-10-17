import React, { memo, useMemo, useCallback, useState } from 'react';
import  { ScrollView, View } from 'react-native';

import DOCX_Module from '@FileExportModules/DOCX';
import ConfigService from '@Services/ConfigService';
import ThemeService from '@Services/ThemeService';
import AlertService from '@Services/AlertService';

import { Text } from '@Text/index';
import { LC } from '@Alert/__LC__';
import { FooterButtons } from './FooterButtons';

export const ExportProject = memo((props: {
  id_project: string
  closeModal: () => void
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].layout.modalPopUp, []);
  const [feedbacks, setFeedbacks] = useState<string[]>([]);
  const [show     , setShow     ] = useState({
    feedbackDisplay: false,
    showFlexButtons: true,
  });

  const onDocxSelected = useCallback(async () => {

    setFeedbacks(['Inicializing project export']);
    setShow(prev => ({ ...prev,
      feedbackDisplay: true,
      showFlexButtons: false,
    }));

    await DOCX_Module.buildAndShare_Project(props.id_project,
      (feedbackMessage) => setFeedbacks(prev => ([ ...prev, feedbackMessage]))
    );

    await AlertService.runAcceptCallback();
    props.closeModal();

  }, []);

  return (
    <LC.PopUp>
      {show.showFlexButtons && (<>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 5,
          }}
        >
          <Text h3
            style={{
              textAlign: 'center',
              color: theme.font,
            }}
          >
            {'Wich format:'}
          </Text>
        </View>
        <ScrollView
          contentContainerStyle={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 5,
            gap: 5,
          }}
        >
          <LC.FlexButton
            title="Docx"
            onPress={async () => await onDocxSelected()}
          />
        </ScrollView>
      </>)}
      <LC.Feedback
        showDisplay={show.feedbackDisplay}
        feedbackMessage={feedbacks}
      />
      <FooterButtons
       onCancel={() => props.closeModal()}
      />
    </LC.PopUp>
  );
});
