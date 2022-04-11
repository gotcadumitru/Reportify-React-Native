import React, {useEffect, useRef} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {View, Pressable, StyleSheet, Text} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {COLORS, SCREEN_SIZE, APP_STYLES} from 'theme/theme';
import {TabScreens} from 'constants/screens/screens.selector';
import {SCREENS} from 'constants/screens/screen.names';
import LottieView from 'lottie-react-native';

const TabIconButton = props => {
  const {isFocused, screen} = props;
  const animateRef = useRef(null);
  const lottieRef = useRef(null);

  useEffect(() => {
    if (isFocused) {
      animateRef.current.animate({
        0: {scale: 1, rotate: '0deg', opacity: 0.8},
        1: {scale: 1.5, rotate: '360deg', opacity: 1},
      });
    } else {
      animateRef.current.animate({
        0: {scale: 1.5, rotate: '360deg', opacity: 1},
        1: {scale: 1, rotate: '0deg', opacity: 0.8},
      });
    }
  }, [isFocused]);

  useEffect(() => {
    if (isFocused && lottieRef.current) {
      lottieRef?.current?.play();
    } else {
      lottieRef?.current?.play(0.5);
      lottieRef?.current?.pause();
    }
  }, [isFocused, lottieRef.current]);

  return (
    <View
      style={{
        ...(screen.name === SCREENS.ADD_WHEEL && {
          position: 'absolute',
          bottom: 15,
          backgroundColor: 'white',
          borderRadius: 50,
          alignItems: 'center',
        }),
      }}>
      <Animatable.View ref={animateRef} duration={1000}>
        <LottieView
          style={{
            height: screen.height,
            width: screen.width,
          }}
          ref={lottieRef}
          loop={isFocused}
          autoPlay={isFocused}
          source={screen.icon}
          progress={0.5}
        />
      </Animatable.View>
    </View>
  );
};

const TabBar = props => {
  const {state, descriptors, navigation} = props;
  return (
    <Animatable.View>
      <View style={styles.container}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <View
              key={index}
              style={[styles.itemContainer, APP_STYLES.LIGHT_SHADOW]}>
              <Pressable onPress={onPress} style={styles.tabIcon}>
                <TabIconButton
                  route={label}
                  isFocused={isFocused}
                  screen={TabScreens[index]}
                />
              </Pressable>
            </View>
          );
        })}
      </View>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 25,
    backgroundColor: 'white',
    borderRadius: 25,
    marginHorizontal: SCREEN_SIZE.WIDTH * 0.05,
    ...APP_STYLES.LIGHT_SHADOW,
  },
  itemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 1,
    borderColor: COLORS.LIGHT_GRAY,
  },
  tabIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export default TabBar;
