import React, { memo, useMemo, useCallback, useState } from 'react';

import { translations } from '@Translations/index';
import DOCX_Module from '@FileExportModules/DOCX';
import ConfigService from '@Services/ConfigService';
import ThemeService from '@Services/ThemeService';
import AlertService from '@Services/AlertService';

import { Input } from '@Input/index';
import { LC } from '@Alert/__LC__';
import { FooterButtons } from './FooterButtons';
import UtilService from '@Services/UtilService';

export const ExportProject_DOCX = memo((props: {
  id_project: string
  closeModal: () => void
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].layout.modalPopUp, []);
  const R      = useMemo(() => translations.component.alert.exportProeject_DOCX[config.language], []);
  const [fileName , setFileName ] = useState<string>('');
  const [feedbacks, setFeedbacks] = useState<string[]>([]);
  const [show     , setShow     ] = useState({
    showInput: true,
    feedbackDisplay: false,
  });

  const onFileNameChange = useCallback((newName: string) => {
    if (UtilService.regexRules['fileName'].test(newName) || newName === '') {
      setFileName(newName);
    }
  }, []);

  const onExport = useCallback(async () => {

    if (fileName === '') {
      return;
    }

    setFeedbacks([ R['Inicializing project export'] ]);
    setShow(prev => ({ ...prev,
      feedbackDisplay: true,
      showInput: false,
    }));

    await DOCX_Module.buildAndShare_Project(props.id_project, fileName,
      (feedbackMessage) => setFeedbacks(prev => ([ ...prev, feedbackMessage]))
    );

    await AlertService.runAcceptCallback();
    props.closeModal();

  }, [fileName]);

  return (
    <LC.PopUp>
      {show.showInput && (
        <Input.String
          label={R['File name']}
          value={fileName}
          onTextChange={(text) => onFileNameChange(text)}
          placeholder={R["Write File's name here"]}
          multiline={false}
          theme={{
            font: theme.font,
            font_placeholder: theme.font_placeHolder,
            background: theme.background,
          }}
          autoFocus
        />
      )}
      <LC.Feedback
        showDisplay={show.feedbackDisplay}
        feedbackMessage={feedbacks}
      />
      <FooterButtons
        isNameEmpty={fileName === ''}
        onCancel={() => props.closeModal()}
        onConfirm={async () => await onExport()}
      />
    </LC.PopUp>
  );
});
