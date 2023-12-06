import React, { useEffect } from 'react';
import VersionManager from '@VersionManager';
import SubscriptionManager from 'src/SubscriptionManager';

export default function Home() {
  useEffect(() => {
    connectionTest();
    VersionManager.selectLTSVersion();
  }, []);
  return <></>;
}

async function connectionTest() {
  console.log(await SubscriptionManager.hasInternetConection());
}
