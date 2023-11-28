import React, { memo, useMemo, useCallback, useState } from 'react';

import { translations } from '@V1/Translations/index';
import ConfigService from '@V1/Services/ConfigService';
import ThemeService from '@V1/Services/ThemeService';
import AlertService from '@V1/Services/AlertService';
import RegexService from '@V1/Services/RegexService';
import DOCX_Module from '@V1/FileExportModules/DOCX';

import { Input } from '@V1/Input/index';
import { LC } from '@V1/Alert/__LC__';
import { FooterButtons } from './FooterButtons';

export const ExportProject_DOCX = memo((props: {
  id_project: string
  closeModal: () => void
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].layout.modalPopUp, []);
  const RS     = useMemo(() => translations.component.alert.shared[config.language], []);
  const [fileName , setFileName ] = useState<string>('');
  const [feedbacks, setFeedbacks] = useState<string[]>([]);
  const [show     , setShow     ] = useState({
    showInput: true,
    feedbackDisplay: false,
    showFooterButtons: true,
  });

  const onFileNameChange = useCallback((newName: string) => {
    if (RegexService.rule['fileName'].test(newName) || newName === '') {
      setFileName(newName);
    }
  }, []);

  const onExport = useCallback(async () => {

    if (fileName === '') {
      return;
    }

    const { id_project } = props;

    setFeedbacks([ RS['Inicializing project export'] ]);
    setShow(prev => ({ ...prev,
      feedbackDisplay: true,
      showInput: false,
      showFooterButtons: false,
    }));

    await DOCX_Module.buildAndShare_Project({ config, id_project, fileName,
      feedback: (feedbackMessage) => setFeedbacks(prev => ([ ...prev, feedbackMessage])),
    });

    AlertService.runAcceptCallback();
    props.closeModal();

  }, [fileName]);

  return (
    <LC.PopUp>
      {show.showInput && (
        <Input.String
          label={RS['File name']}
          value={fileName}
          onTextChange={(text) => onFileNameChange(text)}
          placeholder={RS["Write File's name here"]}
          multiline={false}
          theme={{
            font: theme.font,
            font_placeholder: theme.font_placeHolder,
            background: theme.background,
          }}
          autoFocus
        />
      )}
      <LC.FeedbackDisplay
        showDisplay={show.feedbackDisplay}
        feedbackMessage={feedbacks}
      />
      <FooterButtons
        isNameEmpty={fileName === ''}
        showButtons={show.showFooterButtons}
        onCancel={() => props.closeModal()}
        onConfirm={async () => await onExport()}
      />
    </LC.PopUp>
  );
});
