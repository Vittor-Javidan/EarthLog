import React, { useState, useMemo, useEffect, memo } from 'react';

import { Loading } from '@V1/Types/AppTypes';
import { Scope } from '@V1/Globals/NavigationControler';
import { translations } from '@V1/Translations/index';
import { useBackPress } from '@V1/Hooks/index';
import { ConfigService } from '@V1/Services/ConfigService';

import { Layout } from '@V1/Layout/index';
import { Screen_ExportedFiles } from './Screen_ExportedFiles';
import { NavigationTree } from './NavigationTree';

export const ExportedFilesScope = memo((props: {
  onScopeChange: (scope: Scope) => void
}) => {

  const config            = useMemo(() => ConfigService.config, []);
  const R                 = useMemo(() => translations.scope.exportedFiles[config.language], []);
  const [state, setState] = useState<Loading>('Loading');

  useBackPress(() => props.onScopeChange({ scope: 'HOME SCOPE'}), []);
  useEffect(() => {
    setState('Loaded');
  }, []);

  return (
    <Layout.Root
      title={R['Exported Files']}
      subtitle=""
      drawerChildren={<></>}
      navigationTree={
        <NavigationTree
          onHomePress={() => props.onScopeChange({ scope: 'HOME SCOPE'})}
        />
      }
    >
      {state === 'Loading' ? (
        <Layout.Loading />
      ) : (
        <Screen_ExportedFiles
          onScreenButton_ArrowBack={() => props.onScopeChange({ scope: 'HOME SCOPE'})}
        />
      )}
    </Layout.Root>
  );
});
