import React, { memo, useMemo, useCallback, useState } from 'react';

import { translations } from '@V2/Translations/index';
import { ThemeService } from '@V2/Services_Core/ThemeService';
import { ConfigService } from '@V2/Services/ConfigService';
import { RegexService } from '@V2/Services/RegexService';
import CSV_Module from '@V2/FileExportModules/CSV';
import { PopUpAPI } from '@V2/Layers/API/PopUp';

import { Input } from '@V2/Input/index';
import { LC } from '@V2/Layers/PopUp/__LC__';
import { FooterButtons } from './FooterButtons';

export const ExportProject_CSV = memo((props: {
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
    const sanitized = newName.replace(RegexService.rule['fileName'], '');
    setFileName(sanitized);
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

    const { language } = config
    await CSV_Module.buildAndShare_Project_AllCoordinates({ language, id_project, fileName,
      feedback: (feedbackMessage) => setFeedbacks(prev => ([ ...prev, feedbackMessage])),
    });

    PopUpAPI.runAcceptCallback();
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
