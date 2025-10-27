import React, { useEffect } from 'react';

import { navigate } from '@V2/Globals/NavigationControler';
import { AppService } from '@V2/Services/CoreService';

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
