import React from 'react';

import { useRestoreSubscription } from '@SubscriptionManager';

import { navigate } from '@V2/Globals/NavigationControler';
import CoreService from '@V2/Services/CoreService';

import { Layout } from '@V2/Layout/index';

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
