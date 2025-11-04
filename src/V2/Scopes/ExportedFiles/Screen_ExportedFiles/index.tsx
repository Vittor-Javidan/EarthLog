import React, { memo, useCallback, useEffect, useMemo } from 'react';

import { path } from '@V2/Globals/Path';
import { translations } from '@V2/Translations/index';
import { ShareService } from '@V2/Services_Core/ShareService';
import { ThemeService } from '@V2/Services_Core/ThemeService';
import { ExportedFilesService } from '@V2/Services_Files/ExportedFilesService';
import { ConfigService } from '@V2/Services/ConfigService';

import { Layout } from '@V2/Layout/index';
import { PopUpAPI } from '@V2/Layers/API/PopUp';
import { TC } from './__TC__';
import { ContentButtons } from './__LC__/ContentButtons';

export const Screen_ExportedFiles = memo((props: {
  onScreenButton_ArrowBack: () => void
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].component, []);
  const R      = useMemo(() => translations.screen.exportedFiles[config.language], []);
  const [contents, setContents] = React.useState<string[]>([]);

  const onFileClick = useCallback(async (fileName: string) => {
    await ShareService.share({
      directory: `${path.getDir().EXPORTED_FILES()}/${fileName}`,
    });
  }, [])

  const onDeleteFile = useCallback((fileName: string) => {
    PopUpAPI.handleAlert(true, {
      type: 'warning',
      question: R['Are you sure you want to delete "${fileName}"? This action cannot be undone.'](fileName),
    }, () => {
      ExportedFilesService.deleteFile(fileName);
      setContents(ExportedFilesService.listContents());
    })
  }, [])

  useEffect(() => {
    setContents(ExportedFilesService.listContents());
  }, [])

  return (
    <Layout.Screen
      screenButtons={
        <TC.ScreenButtons
          onArrowBackPress={() => props.onScreenButton_ArrowBack()}
        /> 
      }
    >
      <Layout.ScrollView
        contentContainerStyle={{
          paddingTop: 20,
          gap: 1,
        }}
        style={{
          backgroundColor: theme.background,
        }}
      >
        <ContentButtons
          contents={contents}
          onPressFile={(fileName) => onFileClick(fileName)}
          onDeleteFile={(fileName) => onDeleteFile(fileName)}
        />
      </Layout.ScrollView>
    </Layout.Screen>
  )
});