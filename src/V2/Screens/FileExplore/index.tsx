import React, { memo, useCallback } from 'react';

import { FileExploreService, FileType } from '@V2/FileServices/FileExploreService';

import { Layout } from '@V2/Layout/index';
import { LC } from './__LC__';
import { TC } from './__TC__';

export const FileExploreScreen = memo(() => {

  const [currentPath    , setCurrentPath     ] = React.useState<string>(FileExploreService.currentPath);
  const [contents       , setContents        ] = React.useState<FileType[]>(FileExploreService.listCurrentDirectoryItems());
  const [opennedImage   , setOpennedImage    ] = React.useState<string | null>(null);
  const [opennedTextFile, setOpennedTextFile ] = React.useState<string | null>(null);

  const onFolderPress = useCallback((folderName: string) => {
    setCurrentPath(prevPath => `${prevPath}/${folderName}`);
    setContents(FileExploreService.openFolder({
      type: 'directory',
      name: folderName
    }));
  }, [currentPath, contents]);

  const onImagePress = useCallback((imageName: string) => {
    setOpennedImage(imageName);
  }, []);

  const onImageClose = useCallback(() => {
    setOpennedImage(null);
  }, []);

  const onTextFilePress = useCallback((textFileName: string) => {
    setOpennedTextFile(textFileName);
  }, []);

  const onTextFileClose = useCallback(() => {
    setOpennedTextFile(null);
  }, []);

  const onCloseFolder = useCallback(() => {
    if (opennedImage) {
      onImageClose();
      return;
    }
    if (opennedTextFile) {
      onTextFileClose();
      return;
    }
    if (currentPath !== FileExploreService.LTS_ROOT_PATH) {
      setContents(FileExploreService.closeFolder());
      setCurrentPath(FileExploreService.currentPath);
    }
  }, [currentPath, contents, opennedImage, opennedTextFile]);

  const onGoToRoot = useCallback(() => {
    setContents(FileExploreService.goToRoot());
    setCurrentPath(FileExploreService.currentPath);
  }, [currentPath, contents]);

  return (
    <Layout.Screen
      screenButtons={
        <TC.ScreenButtons
          onCloseFolder={() => onCloseFolder()}
          onGoToRoot={() => onGoToRoot()}
        />
      }
    >
      {opennedTextFile && (
        <LC.TextDisplay
          textFilePath={`${currentPath}/${opennedTextFile}`}
          textContent={FileExploreService.openJsonFile(`${currentPath}/${opennedTextFile}`)}
        />
      )}
      {opennedImage && (
        <LC.ImageDisplay
          imagePath={`${currentPath}/${opennedImage}`}
        />
      )}
      {!opennedImage && !opennedTextFile && (<>
        <LC.ContentsDisplay
          currentPath={currentPath}
          contents={contents}
          onPressFolder={(folderName) => onFolderPress(folderName)}
          onPressJsonFile={(textFileName) => onTextFilePress(textFileName)}
          onPressImageFile={(imageName) => onImagePress(imageName)}
        />
      </>)}
    </Layout.Screen>
  );
});
