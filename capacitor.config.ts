import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.azikstudio.doriyums',
  appName: 'Dori Yums',
  webDir: 'www',
  server: {
    androidScheme: 'https',
    hostname: 'app.doriyums.local',
    cleartext: false
  },
  android: {
    allowMixedContent: false,
    captureInput: true,
    webContentsDebuggingEnabled: false,
    backgroundColor: '#FBF4E4'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      launchFadeOutDuration: 400,
      backgroundColor: '#FBF4E4',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: true
    },
    StatusBar: {
      backgroundColor: '#9C5666',
      style: 'LIGHT',
      overlaysWebView: false
    },
    App: {
      handleBackButton: true
    }
  }
};

export default config;
