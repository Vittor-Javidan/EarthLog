import React from 'react';

import { useRestoreSubscription } from '@SubscriptionManager';

import { navigate } from '@V1/Globals/NavigationControler';
import CoreService from '@V1/Services/CoreService';

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

  return <></>;
}

async function initApp() {
  await CoreService.initApp();
  navigate('HOME SCOPE');
}
