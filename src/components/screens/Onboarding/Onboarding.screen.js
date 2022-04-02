import * as React from 'react';
import {Image} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import {SCREENS} from 'constants/screens/screen.names';
import {COLORS} from 'theme/theme';

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
            <Image
              source={require('assets/logo.png')}
              style={{width: 250, height: 250}}
            />
          ),
          title: 'Welcome',
          subtitle: 'Welcome to the app',
        },
        {
          backgroundColor: COLORS.PURPLE,
          image: (
            <Image
              source={require('assets/logo.png')}
              style={{width: 250, height: 250}}
            />
          ),
          title: 'Report the issues',
          subtitle: 'Help the community with real life problems',
        },
        {
          backgroundColor: COLORS.GREEN,
          image: (
            <Image
              source={require('assets/logo.png')}
              style={{width: 250, height: 250}}
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
