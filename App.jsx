import { StatusBar } from 'expo-status-bar';

import { ScreenContent } from './src/app/ScreenContent';

import './global.css';

export default function App() {
  return (
    <>
      <ScreenContent title="Home" path="App.jsx" />
      <StatusBar style="auto" />
    </>
  );
}
