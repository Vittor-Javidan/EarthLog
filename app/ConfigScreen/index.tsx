
import React, { useMemo, useState } from 'react';
import { Text } from 'react-native';
import { useRouter } from 'expo-router';
import Layout from '../../Components/Layout';
import DrawerButton from '../../Components/DrawerButton';
import LayoutContent from '../../Components/LayoutContent';
import LayoutButton from '../../Components/LayoutButton';

import LogService from '../../Services/LogService';
import ConfigService from '../../Services/ConfigService';

import { ConfigScreenTranslations, languages } from './translations';
import APPColors from '../../Globals/Colors';
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
        <DrawerButton
          title={stringResources['Main Screen']}
          onPress={() => navController.push('/MainScreen')}
        />
      </>}
    >
      <LayoutContent
        style={{ flex: 1 }}
      >
        <Text
          style={{color: APPColors.onBackground}}
        >
          Content
        </Text>
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
