module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@app/redux': './app-redux',
          '@app/assets': './assets',
          '@app/components': './components',
          '@app/constants': './constants',
          '@app/navigation': './navigation',
        },
      },
      'react-native-reanimated/plugin',
    ],
  ],
};
