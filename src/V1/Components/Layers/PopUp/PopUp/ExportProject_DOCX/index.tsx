import React, { memo, useMemo, useCallback, useState, useEffect } from 'react';

import { translations } from '@V1/Translations/index';
import { ThemeService } from '@V1/Services_Core/ThemeService';
import { ConfigService } from '@V1/Services/ConfigService';
import { RegexService } from '@V1/Services/RegexService';
import DOCX_Module from '@V1/FileExportModules/DOCX';
import { PopUpAPI } from '@V1/Layers/API/PopUp';

import { Input } from '@V1/Input/index';
import { LC } from '@V1/Layers/PopUp/__LC__';
import { FooterButtons } from './FooterButtons';
import { QualityButtons } from './QualityButtons';

export const ExportProject_DOCX = memo((props: {
  id_project: string
  closeModal: () => void
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].layout.modalPopUp, []);
  const RS     = useMemo(() => translations.component.alert.shared[config.language], []);
  const [error        , setError       ] = useState<string | null>(null);
  const [imageQuality , setImageQuality] = useState<'High' | 'Medium' | 'Low'>('High');
  const [fileName     , setFileName    ] = useState<string>('');
  const [feedbacks    , setFeedbacks   ] = useState<string[]>([]);
  const [show         , setShow        ] = useState({
    showInput: true,
    feedbackDisplay: false,
    showQualityButtons: true,
    isExporting: false,
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
      showQualityButtons: false,
      isExporting: true,
    }));

    await DOCX_Module.buildAndShare_Project({
      config,
      id_project,
      fileName,
      imageQuality,
      onFinish: () => {
        setShow(prev => ({ ...prev,
          finished: true,
        }));
        setFeedbacks(prev => [ ...prev, RS['Done!']]);
        PopUpAPI.runAcceptCallback();
      },
      onError: (errorMessage) => {
        setError(errorMessage);
        setFeedbacks(prev => [ ...prev, RS['Error!']]);
      },
      feedback: (feedbackMessage) => setFeedbacks(prev => ([ ...prev, feedbackMessage])),
    });

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
      <LC.ErrorDisplay
        showDisplay={error !== null}
        error={error}
      />
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
        showCancelButton={show.isExporting === false}
        showConfirmButton={show.isExporting === false}
        showConfirmErrorButton={error !== null}
        onCancel={() => props.closeModal()}
        onConfirm={async () => await onExport()}
        onConfirmError={() => props.closeModal()}
      />
    </LC.PopUp>
  );
});
