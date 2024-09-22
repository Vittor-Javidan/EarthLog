import React, { useEffect } from 'react';

import { navigate } from '@V1/Globals/NavigationControler';
import CoreService from '@V1/Services/CoreService';

export default function Home_LTS_VERSION_1() {

  useEffect(() => {
    initApp();
  }, []);

  return <></>;
}

async function initApp() {
  await CoreService.initApp();
  navigate('HOME SCOPE');
}
