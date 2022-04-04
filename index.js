/**
 * @format
 */

import {AppRegistry, LogBox} from 'react-native';
LogBox.ignoreAllLogs();
import App from './src/App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
AppRegistry.registerComponent(appName, () => App);
