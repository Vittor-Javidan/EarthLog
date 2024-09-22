import React, { useEffect } from 'react';

import { navigate } from '@V2/Globals/NavigationControler';
import CoreService from '@V2/Services/CoreService';

export default function Home_LTS_VERSION_2() {

  useEffect(() => {
    initApp();
  }, []);

  return <></>;
}

async function initApp() {
  await CoreService.initApp();
  navigate('HOME SCOPE');
}
