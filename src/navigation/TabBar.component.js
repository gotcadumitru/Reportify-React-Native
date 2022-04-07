import React, {useEffect, useRef} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {View, Pressable, StyleSheet, Text} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {COLORS, SCREEN_SIZE} from 'theme/theme';

const TabIconButton = props => {
  const {isFocused} = props;
  const animateRef = useRef(null);

  useEffect(() => {
    if (isFocused) {
      animateRef.current.animate({
        0: {scale: 0.5, rotate: '0deg'},
        1: {scale: 1.5, rotate: '360deg'},
      });
    } else {
      animateRef.current.animate({
        0: {scale: 1.5, rotate: '360deg'},
        1: {scale: 1, rotate: '0deg'},
      });
    }
  }, [isFocused]);

  return (
    <View>
      <Animatable.View ref={animateRef} duration={1000}>
        <Icon
          name={'ios-book'}
          color={isFocused ? COLORS.GREEN : COLORS.WHITE}
          size={24}
        />
      </Animatable.View>
    </View>
  );
};

const TabBar = props => {
  const {state, descriptors, navigation} = props;
  const tabViewRef = React.useRef(null);
  const [bgColor, setBgColor] = React.useState('');

  useEffect(() => {
    console.log('dada');
    const unsubscribe = navigation.addListener('focus', () => {
      tabViewRef.current.animate({0: {opacity: 0.5}, 1: {opacity: 1}});
    });
    return () => unsubscribe;
  }, [navigation]);

  return (
    <Animatable.View ref={tabViewRef}>
      <View style={[styles.container, {backgroundColor: bgColor}]}>
        {state.routes.map((route, index) => {
          if (route.name == 'PlaceholderScreen') {
            return (
              <View key={index} style={styles.itemContainer}>
                {/* <SelectWheel /> */}
                <Text>dada</Text>
              </View>
            );
          }

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
              style={[
                styles.itemContainer,
                {borderRightWidth: label == 'notes' ? 3 : 0},
              ]}>
              <Pressable
                onPress={onPress}
                style={{
                  backgroundColor: isFocused ? '#030D16' : '#182028',
                  borderRadius: 20,
                }}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                    padding: 10,
                  }}>
                  <TabIconButton route={label} isFocused={isFocused} />
                  <Text>Label</Text>
                </View>
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
    backgroundColor: COLORS.LIGHT_PURPLE,
    borderRadius: 25,
    marginHorizontal: SCREEN_SIZE.WIDTH * 0.05,
  },
  itemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 1,
    borderColor: '#333B42',
  },
});

export default TabBar;
