export default {
  expo: {
    name: 'my-expo-app',
    slug: 'my-expo-app',
    version: '1.0.0',
    web: {
      favicon: './assets/favicon.png',
      bundler: 'metro',
    },
    scheme: 'your-app-scheme',
    experiments: {
      tsconfigPaths: true,
    },
    plugins: ['expo-secure-store'],
    orientation: 'portrait',
    icon: './src/assets/icon.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './src/assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      newArchEnabled: true,
      bundleIdentifier: 'com.trybenode.markettrybe',
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false,
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './src/assets/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      newArchEnabled: true,
      package: 'com.deveyitayo.myexpoapp',
    },
    extra: {
      eas: {
        projectId: '5694d23c-29f0-431a-acab-4c7a735e9299',
      },
    },
    owner: 'trybenode',

    // ✅ Add custom properties here
    nodeModulesPath: './node_modules',
    mods: {},
  },
};
