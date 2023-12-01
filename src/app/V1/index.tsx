import React, { useEffect } from 'react';

import { navigate } from '@V1/Globals/NavigationControler';
import ConfigService from '@V1/Services/ConfigService';
import CoreService from '@V1/Services/CoreService';

import { Layout } from '@V1/Layout/index';

export default function Home_LTS_VERSION_1() {

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
  await CoreService.initApp();
  onFinish();
}
