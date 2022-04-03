import {View} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

export default function Splash() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <LottieView
        source={require('assets/lottie/loading.json')}
        autoPlay
        loop
      />
    </View>
  );
}
