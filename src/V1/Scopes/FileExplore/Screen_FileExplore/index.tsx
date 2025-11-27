import React, { memo, useCallback, useEffect, useState } from 'react';
import { Directory } from 'expo-file-system';

import {
  FileType
} from '@V1/Types';

import { path } from '@V1/Globals/Path';
import { Layout } from '@V1/Layout/index';
import { LC } from './__LC__';
import { TC } from './__TC__';

export const Screen_FileExplore = memo((props: {
  onScreenButton_Home: () => void
}) => {

  const [rootPath       , _                 ] = useState<string>(path.getDir().ROOT());
  const [currentPath    , setCurrentPath    ] = useState<string>(path.getDir().ROOT());
  const [contents       , setContents       ] = useState<FileType[]>([]);
  const [opennedImage   , setOpennedImage   ] = useState<string | null>(null);
  const [opennedTextFile, setOpennedTextFile] = useState<string | null>(null);
  
  const onGoToHome = useCallback(() => {
    props.onScreenButton_Home();
  }, []);

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

  const onFolderPress = useCallback((folderName: string) => {
    setCurrentPath(prevPath => `${prevPath}/${folderName}`);
  }, [currentPath, contents]);

  const onGoToRoot = useCallback(() => {
    setCurrentPath(rootPath)
    setOpennedImage(null);
    setOpennedTextFile(null);
  }, [opennedImage, opennedTextFile]);

  const onCloseFolder = useCallback(() => {
    switch (true) {
      case opennedImage !== null:    onImageClose();    return;
      case opennedTextFile !== null: onTextFileClose(); return;
      case currentPath !== rootPath: {
        const pathParts = currentPath.split('/');
        pathParts.pop()
        setCurrentPath(pathParts.join('/'));
      }
    }
  }, [currentPath, opennedImage, opennedTextFile]);

  const listContents = useCallback(() => {
    const contents: FileType[] = new Directory(currentPath).list().map((item) => ({
      type: item instanceof Directory ? 'directory' : 'file',
      name: item.name
    }))
    setContents(contents);
  }, [currentPath])

  useListContents({
    currentPath: currentPath,
    onPathChange: listContents,
  })

  return (
    <Layout.Screen
      screenButtons={
        <TC.ScreenButtons
          onCloseFolder={() => onCloseFolder()}
          onGoToRoot={onGoToRoot}
          onGoToHome={onGoToHome}
        />
      }
    >
      {opennedTextFile && (
        <LC.TextDisplay
          textFilePath={`${currentPath}/${opennedTextFile}`}
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

function useListContents(o: {
  currentPath: string
  onPathChange: () => void
}) {
  useEffect(() => {
    o.onPathChange();
  }, [o.currentPath])
}