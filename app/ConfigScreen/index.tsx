
import React, { useMemo, useState } from 'react';
import { useRouter } from 'expo-router';

import Layout from '../../Components/Layout';
import LayoutDrawerButton from '../../Components/LayoutDrawerButton';
import LayoutContent from '../../Components/LayoutContent';
import LayoutButton from '../../Components/LayoutButton';

import LogService from '../../Services/LogService';
import ConfigService from '../../Services/ConfigService';

import APPColors from '../../Globals/Colors';
import { ConfigScreenTranslations, languages } from './translations';
import { Languages } from '../../Types/LanguageTypes';

export default function ConfigScreen(): JSX.Element {

  LogService.useLog('CONFIG SCREEN: rendered');
  const navController = useRouter();
  const savedConfig = useMemo(() => ConfigService.config, [ConfigService.config]);
  const [currentLanguage, _] = useState<Languages>(savedConfig.language);
  const stringResources = useMemo<ConfigScreenTranslations[Languages]>(
    () => languages[currentLanguage], [currentLanguage]
  );

  return (
    <Layout
      title={stringResources['Settings']}
      drawerChildren={<>
        <LayoutDrawerButton
          title={stringResources['Main Screen']}
          onPress={() => navController.push('/MainScreen')}
        />
      </>}
    >
      <LayoutContent
        style={{ flex: 1 }}
      >
        <LayoutButton
          title={stringResources['Language']}
          onPress={() => {}}
        />
      </LayoutContent>
      <LayoutContent>
        <LayoutButton
          title={stringResources['SAVE']}
          overrideBackgroundColor={APPColors.confirm}
          overrideTextColor={APPColors.onConfirm}
          onPress={() => {}}
        />
      </LayoutContent>
    </Layout>
  );
}
