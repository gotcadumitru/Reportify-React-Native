/**
 * @format
 */

import {AppRegistry, LogBox} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import {socket_init} from 'app-redux/thunk/socket';
LogBox.ignoreAllLogs();
socket_init();
AppRegistry.registerComponent(appName, () => App);
