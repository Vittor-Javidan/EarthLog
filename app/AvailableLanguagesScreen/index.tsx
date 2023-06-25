import React, { useState, useMemo } from 'react';
import { useRouter } from 'expo-router';

import Layout from '../../Components/Layout';
import LayoutDrawerButton from '../../Components/LayoutDrawerButton';

import LogService from '../../Services/LogService';
import ConfigService from '../../Services/ConfigService';

import { AvailableLanguagesScreen_Translations, languages } from './translations';
import { LanguageTags, Languages, languageLabels, languageTags } from '../../Types/LanguageTypes';
import LayoutButton from '../../Components/LayoutButton';
import LayoutContent from '../../Components/LayoutContent';
import APPColors from '../../Globals/Colors';

export default function AvailableLanguagesScreen() {

  LogService.useLog('AVAILABLE LANGUAGES SCREEN: rendered');
  const navController = useRouter();
  const savedConfig = useMemo(() => ConfigService.config, [ConfigService.config]);
  const [currentLanguage, setCurrentLanguage] = useState<Languages>(savedConfig.language);
  const stringResources = useMemo<AvailableLanguagesScreen_Translations[Languages]>(
    () => languages[currentLanguage], [currentLanguage]
  );

  async function onButtonClick(languageTag: LanguageTags) {
    ConfigService.config.language = languageTag;
    await ConfigService.saveConfig();
    setCurrentLanguage(languageTag);
  }

  return (
    <Layout
      title={stringResources['Languages']}
      drawerChildren={<>
        <LayoutDrawerButton
          title={stringResources['Back']}
          onPress={() => navController.push('/ConfigScreen')}
        />
      </>}
    >
      <LayoutContent>
        <AllButtons
          selectedLanguage={currentLanguage}
          onButtonClick={onButtonClick}
        />
      </LayoutContent>
    </Layout>
  );
}

function AllButtons(props: {
  selectedLanguage: LanguageTags
  onButtonClick: (languageTag: LanguageTags) => void
}) {

  const allButtons = languageLabels.map((languageLabel, index) => {

    const isSelected = props.selectedLanguage === languageTags[index];

    return (
      <LayoutButton
        key={languageLabel}
        title={languageLabel}
        overrideBackgroundColor={isSelected ? APPColors.confirm : undefined}
        overrideTextColor={isSelected ? APPColors.onConfirm : undefined}
        onPress={() => props.onButtonClick(languageTags[index])}
      />
    );
  });

  return (<>
    {allButtons}
  </>);
}
