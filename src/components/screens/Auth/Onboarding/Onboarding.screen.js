import * as React from 'react';
import {Image} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import {SCREENS} from 'constants/screens/screen.names';
import {COLORS} from 'theme/theme';
import LottieView from 'lottie-react-native';

export default function OnboardingScreen(props) {
  const {navigation} = props;

  const onFinishOnboarding = () => {
    navigation.navigate(SCREENS.SIGN_IN);
  };

  return (
    <Onboarding
      pages={[
        {
          backgroundColor: '#ffffff',
          image: (
            <LottieView
              style={{height: 250}}
              autoPlay
              loop
              source={require('assets/lottie/woman.json')}
            />
          ),
          title: 'Welcome',
          subtitle: 'Welcome to the app',
        },
        {
          backgroundColor: COLORS.PURPLE,
          image: (
            <LottieView
              style={{height: 250}}
              autoPlay
              loop
              source={require('assets/lottie/paper.json')}
            />
          ),
          title: 'Report the issues',
          subtitle: 'Help the community with real life problems',
        },
        {
          backgroundColor: COLORS.GREEN,
          image: (
            <LottieView
              style={{height: 250}}
              autoPlay
              loop
              source={require('assets/lottie/question.json')}
            />
          ),
          title: 'Live perfect',
          subtitle: 'Make your place better!',
        },
      ]}
      onDone={onFinishOnboarding}
      onSkip={onFinishOnboarding}
    />
  );
}
