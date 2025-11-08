import React, { memo, useCallback, useMemo } from 'react';
import { View } from 'react-native';

import { translations } from '@V1/Translations/index';
import { LanguageTag, languageTags } from '@V1/Types/AppTypes';
import { ConfigService } from '@V1/Services/ConfigService';

import { Animation } from '@V1/Animation/index';
import { Layout } from '@V1/Layout/index';
import { TC } from './__TC__';
import { LC } from './__LC__';

export const Screen_LanguageSelection = memo((props: {
  onLanguageChange: (languageTag: LanguageTag) => void
  onScreenButton_ArrowBack: () => void
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const R      = useMemo(() => translations.screen.LanguageSelection, []);

  const onSelectLanguage = useCallback(async (languageTag: LanguageTag) => {
    if (config.language !== languageTag) {
      ConfigService.config.language = languageTag;
      await ConfigService.saveConfig();
      props.onLanguageChange(languageTag);
    }
  }, [props.onLanguageChange]);

  const AllButtons = languageTags.map((languageTag) => (
    <LC.LanguageButton
      key={languageTag}
      name={R[languageTag]}
      isSelected={config.language === languageTag}
      onPress={async () => await onSelectLanguage(languageTag)}
    />
  ));

  return (
    <Layout.Screen
      screenButtons={
        <TC.ScreenButtons
          onArrowBack={() => props.onScreenButton_ArrowBack()}
        />
      }
    >
      <Animation.SlideFromLeft
        duration={200}
      >
        <View
          style={{ gap: 1 }}
        >
          {AllButtons}
        </View>
      </Animation.SlideFromLeft>
    </Layout.Screen>
  );
});
