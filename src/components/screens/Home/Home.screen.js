import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {clearStorageData} from 'helpers/storage';
import {useDispatch} from 'react-redux';
import {setter} from 'app-redux/actions/app/app.actions';
export default function Home() {
  const dispatch = useDispatch();
  const logoutUser = () => {
    clearStorageData().then(() => {
      dispatch(setter({isSignedIn: false}));
    });
  };
  return (
    <View>
      <TouchableOpacity onPress={logoutUser} style={{marginTop: 150}}>
        <Text>Home</Text>
      </TouchableOpacity>
    </View>
  );
}
