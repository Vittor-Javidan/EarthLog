import React, { useEffect } from 'react';

import { navigate } from '@V1/Globals/NavigationControler';
import { AppService } from '@V1/Services/CoreService';

export default function Home_LTS_VERSION_1() {

  useEffect(() => {
    initApp();
  }, []);

  return <></>;
}

async function initApp() {
  await AppService.initApp();
  navigate('HOME SCOPE');
}
