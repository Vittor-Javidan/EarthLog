import React, { useState, useMemo } from 'react';
import { useRouter } from 'expo-router';
import Layout from '../../../Components/Layout';
import Layout_DrawerButton from '../../../Components/Layout_DrawerButton';
import LogService from '../../../Services/LogService';
import ConfigService from '../../../Services/ConfigService';
import { ThemeDTO } from '../../../Services/ThemeService';
import { AvailableLanguagesScreen_Translations, languages } from './translations';
import { LanguageTags, Languages, languageLabels, languageTags } from '../../../Types/LanguageTypes';
import Layout_Button from '../../../Components/Layout_Button';
import Layout_Content from '../../../Components/Layout_Content';
import AppRoutes from '../../Routes';

export default function AvailableLanguagesScreen(): JSX.Element {

  LogService.useLog('LANGUAGES SCREEN: rendered');

  const [currentLanguage, setCurrentLanguage] = useState<Languages>(ConfigService.config.language);
  const navController = useRouter();
  const stringResources = useMemo<AvailableLanguagesScreen_Translations[Languages]>(
    () => languages[currentLanguage], [currentLanguage]
  );


  async function saveSelectedLanguage(languageTag: LanguageTags) {
    ConfigService.config.language = languageTag;
    await ConfigService.saveConfig();
    setCurrentLanguage(languageTag);
  }

  return (
    <Layout
      title={stringResources['Languages']}
      drawerChildren={<>
        <Layout_DrawerButton
          title={stringResources['Main Screen']}
          onPress={() => navController.push(AppRoutes.MAIN_SCREEN)}
        />
      </>}
    >
      <Layout_Content
        style={{ flex: 1 }}
      >
        <AllButtons
          selectedLanguage={currentLanguage}
          onButtonClick={saveSelectedLanguage}
        />
      </Layout_Content>
      <Layout_Content>
        <Layout_Button
          title={stringResources['Settings Screen']}
          onPress={() => navController.push(AppRoutes.SETTINGS_SCREEN)}
        />
      </Layout_Content>
    </Layout>
  );
}

function AllButtons(props: {
  selectedLanguage: LanguageTags
  onButtonClick: (languageTag: LanguageTags) => void
}): JSX.Element {

  const theme = useMemo<ThemeDTO>(() => ConfigService.config.theme, []);

  return <>
    {
      languageLabels.map((languageLabel, index) => {
        const isSelected = props.selectedLanguage === languageTags[index];
        return (
          <Layout_Button
            key={languageLabel}
            title={languageLabel}
            overrideBackgroundColor={isSelected ? theme.confirm : undefined}
            overrideTextColor={isSelected ? theme.onConfirm : undefined}
            onPress={() => props.onButtonClick(languageTags[index])}
          />
        );
      })
    }
  </>;
}
