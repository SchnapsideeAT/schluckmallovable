import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.schnapsidee.schluckmal',
  appName: 'Schluck mal!',
  webDir: 'dist',
  ios: {
    contentInset: 'always'
  },
  plugins: {
    Keyboard: {
      resize: 'native',
      style: 'dark'
    },
    SplashScreen: {
      launchShowDuration: 0
    }
  }
};

export default config;
