import React from 'react';

import { navigate } from '@V1/Globals/NavigationControler';
import CoreService from '@V1/Services/CoreService';

import { Layout } from '@V1/Layout/index';
import { useRestoreSubscription } from '@SubscriptionManager';

export default function Home_LTS_VERSION_1() {

  useRestoreSubscription({
    onFinish: () => {
      initApp();
    },
    onError: (errorMessage) => {
      initApp();
      alert(errorMessage);
    },
  }, []);

  return <Layout.Loading />;
}

async function initApp() {
  await CoreService.initApp();
  navigate('HOME SCOPE');
}
