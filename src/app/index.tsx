import React, { useEffect } from 'react';
import VersionManager from '@VersionManager';

export default function Home() {

  useEffect(() => {
    VersionManager.selectLTSVersion();
  }, []);

  return <></>;
}
