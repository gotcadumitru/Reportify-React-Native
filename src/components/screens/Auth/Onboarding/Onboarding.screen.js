import * as React from 'react';
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
      nextLabel="Continuă"
      skipLabel="Sari"
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
          title: 'Reportify',
          subtitle: 'Bine ati venit!',
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
          title: 'Raportați problemele',
          subtitle: 'Ajută comunitatea cu probleme din viața reală',
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
          title: 'Trăiește mai bine',
          subtitle: 'Fă comunitatea mai bună!',
        },
      ]}
      onDone={onFinishOnboarding}
      onSkip={onFinishOnboarding}
    />
  );
}
