import React, {useState} from 'react';
import {Pressable, ScrollView, Text} from 'react-native';

import ScreenChangeButton from '../../Components/ScreenChangeButton/ScreenChangeButton';
import Background from '../../Components/Background';

import Settings from '../../Classes/Settings';
import {languageLabels, languageTags} from '../../Types/languageTags';
import {languages} from './translations';
import {styles} from './styles';

export default function LanguageSelectionScreen() {
  const [language, setLanguage] = useState(Settings.language);
  const text = languages[language];

  return (
    <Background style={styles.background}>
      <ScreenChangeButton
        route={'/GeneralSettingsScreen'}
        imgRelativePath={require('../../assets/icons/closeIcon_WithShadow.png')}
        containerStyle={styles.container_CLoseButton}
        imageStyle={styles.image_CLoseButton}
      />
      <Text style={styles.title}>{text['-Languages']}</Text>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {languageTags.map((tag, index) => (
          <Pressable
            style={
              tag === Settings.language
                ? styles.touchableOpacity_SelectedLanguage
                : styles.touchableOpacity
            }
            key={tag}
            onPress={() => {
              Settings.setLanguage(tag);
              setLanguage(tag);
            }}>
            <Text
              style={
                tag === Settings.language
                  ? styles.text_SelectedLanguage
                  : styles.text
              }>
              {languageLabels[index]}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </Background>
  );
}
