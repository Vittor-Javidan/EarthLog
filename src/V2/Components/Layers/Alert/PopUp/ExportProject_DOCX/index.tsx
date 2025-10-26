import React, { memo, useMemo, useCallback, useState, useEffect } from 'react';

import { translations } from '@V2/Translations/index';
import ConfigService from '@V2/Services/ConfigService';
import ThemeService from '@V2/Services/ThemeService';
import { AlertAPI } from '@V2/Layers/API/Alert';
import RegexService from '@V2/Services/RegexService';
import DOCX_Module from '@V2/FileExportModules/DOCX';

import { Input } from '@V2/Input/index';
import { LC } from '@V2/Layers/Alert/__LC__';
import { FooterButtons } from './FooterButtons';
import { QualityButtons } from './QualityButtons';

export const ExportProject_DOCX = memo((props: {
  id_project: string
  closeModal: () => void
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].layout.modalPopUp, []);
  const RS     = useMemo(() => translations.component.alert.shared[config.language], []);
  const [imageQuality, setImageQuality] = useState<'High' | 'Medium' | 'Low'>('High');
  const [fileName , setFileName ] = useState<string>('');
  const [feedbacks, setFeedbacks] = useState<string[]>([]);
  const [show     , setShow     ] = useState({
    showInput: true,
    feedbackDisplay: false,
    showFooterButtons: true,
    showQualityButtons: true,
    hasError: false,
    finished: false,
  });

  const onFileNameChange = useCallback((newName: string) => {
    const sanitized = newName.replace(RegexService.rule['fileName'], '');
    setFileName(sanitized);
  }, []);

  const onQualityChange = useCallback((quality: 'High' | 'Medium' | 'Low') => {
    setImageQuality(quality);
  }, [imageQuality]);

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
      showQualityButtons: false,
    }));

    await DOCX_Module.buildAndShare_Project({
      config,
      id_project,
      fileName,
      imageQuality,
      feedback: (feedbackMessage) => setFeedbacks(prev => ([ ...prev, feedbackMessage])),
      onFinish: () => setShow(prev => ({ ...prev, finished: true })),
      onError: () => setShow(prev => ({ ...prev, hasError: true })),
    });

    AlertAPI.runAcceptCallback();

  }, [fileName]);

  useEffect(() => {
    if (show.finished) {
      props.closeModal();
    }
  }, [show.finished]);

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
      <QualityButtons
        selectedQuality={imageQuality}
        onSelectQuality={(quality) => onQualityChange(quality)}
        showButtons={show.showQualityButtons}
      />
      <FooterButtons
        isNameEmpty={fileName === ''}
        showButtons={show.showFooterButtons}
        showConfirmErrorButton={show.hasError}
        onCancel={() => props.closeModal()}
        onConfirm={async () => await onExport()}
        onConfirmError={() => props.closeModal()}
      />
    </LC.PopUp>
  );
});
