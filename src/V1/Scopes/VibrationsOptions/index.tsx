import React, { memo, useEffect, useMemo, useState } from 'react';

import { Scope } from '@V1/Globals/NavigationControler';
import { Loading } from '@V1/Types/AppTypes';
import { translations } from '@V1/Translations/index';
import { useBackPress } from '@V1/Hooks/index';
import { ConfigService } from '@V1/Services/ConfigService';

import { Layout } from '@V1/Layout/index';
import { Screen_VibrationOptions } from './Screen_VibrationOptions';
import { NavigationTree } from './NavigationTree';

export const VibrationsOptionsScope = memo((props: {
  onScopeChange: (scope: Scope) => void
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const R      = useMemo(() => translations.scope.vibrationOptions[config.language], []);
  const [state, setState] = useState<Loading>('Loading');

  useBackPress(() => props.onScopeChange({ scope: 'SETTINGS SCOPE' }), []);
  useEffect(() => {
    setState('Loaded');
  }, []);

  return (
    <Layout.Root
      title={R['Vibration']}
      subtitle=""
      drawerChildren={<></>}
      navigationTree={
        <NavigationTree
          onHomePress={() => props.onScopeChange({ scope: 'HOME SCOPE' })}
          onSettingsPress={() => props.onScopeChange({ scope: 'SETTINGS SCOPE' })}
        />
      }
    >
      {state === 'Loading' ? (
        <Layout.Loading />
      ) : (
        <Screen_VibrationOptions
          onScreenButton_HomePress={() => props.onScopeChange({ scope: 'SETTINGS SCOPE' })}
        />
      )}
    </Layout.Root>
  );
});
