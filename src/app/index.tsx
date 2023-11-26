import React, { useEffect } from 'react';
import * as Location from 'expo-location';

import { navigate } from '@Globals/NavigationControler';
import ConfigService from '@Services/ConfigService';
import { FOLDER_App } from '@Services/FileSystemService';

import { Layout } from '@Layout/index';

export default function Home() {

  useEffect(() => {
    initApp(() => {
      alert(
        ConfigService.config.language === 'pt-BR'
        ? 'Até que a primeira versão LTS seja liberada, não é recomendado utilizar o aplicativo para o seu trabalho ou projeto pessoal.\n\nTalvez seja necessário desinstalar e reinstalar o aplicativo entre atualizações.\n\nEsse processo reseta todos os dados dentro do aplicativo.\n\nO nome do aplicativo poderá mudar no futuro.\n\nO sistema de monetização futuro será via assinatura, com todos os recursos gratuitos liberados de forma limitada.'
        : 'Until the first LTS version is released, it is not recommended to use the app for your job or project.\n\nYou may need to uninstall and install between updates.\n\nThis process resets all your data inside the app.\n\nApp names can be changed in the future.\n\nThe monetization system in the future will be by subscription, with all resources free, but limited in usage.'
      );
      navigate('HOME SCOPE');
    });
    // initApp(() => navigate('TEST SCOPE'));
  }, []);

  return <Layout.Loading />;
}

async function initApp(onFinish: () => void) {
  await FOLDER_App.init();
  await ConfigService.loadConfig();
  Location.requestForegroundPermissionsAsync();
  onFinish();
}
