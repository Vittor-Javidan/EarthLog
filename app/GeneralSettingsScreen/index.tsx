import React from 'react';
import {ScrollView, Text} from 'react-native';
import {Link} from 'expo-router';
import Settings from '../../Classes/Settings';
import Background from '../../Components/Background';
import ScreenChangeButton from '../../Components/ScreenChangeButton/ScreenChangeButton';
import {styles} from './styles';
import {languages} from './translations';

export default function GeneralSettingScreen() {
  const text = languages[Settings.language];

  return (
    <Background style={styles.background}>
      <ScreenChangeButton
        route={'/ProjectsSelectionScreen'}
        imgRelativePath={require('../../assets/icons/closeIcon_WithShadow.png')}
        containerStyle={styles.container_CLoseButton}
        imageStyle={styles.image_CLoseButton}
      />
      <Text style={styles.title}>{text['-General Settings']}</Text>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Link style={styles.link} href={'/LanguageSelectionScreen'}>
          {text['-Languages']}
        </Link>
      </ScrollView>
    </Background>
  );
}
