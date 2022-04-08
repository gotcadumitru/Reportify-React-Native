import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {clearStorageData} from 'helpers/storage';
import {useDispatch} from 'react-redux';
import {setter} from 'app-redux/actions/app/app.actions';
import {COLORS, SCREEN_SIZE, APP_STYLES} from 'theme/theme';

export default function Home() {
  const dispatch = useDispatch();
  const logoutUser = () => {
    // clearStorageData().then(() => {
    //   dispatch(setter({isSignedIn: false}));
    // });
    console.log('dada');
  };
  return (
    <View>
      <TouchableOpacity onPress={logoutUser} style={{marginTop: 150}}>
        <Text>Home</Text>
      </TouchableOpacity>
    </View>
  );
}
