import React from 'react';
import {Redirect} from 'expo-router';

export default function Home() {
  console.log('App Iniciado');
  return <Redirect href={'/MainScreen'} />;
}
