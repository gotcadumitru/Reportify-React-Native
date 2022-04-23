import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {COLORS, SCREEN_SIZE} from 'theme/theme';
import dayjs from 'dayjs';

export default function Input(props) {
  const {
    title,
    value,
    style,
    onPress,
    Icon,
    width = SCREEN_SIZE.WIDTH * 0.8,
  } = props;
  return (
    <View style={[style, {marginVertical: 5, alignSelf: 'center', width}]}>
      <Text style={styles.title}>{title}</Text>
      <Pressable style={styles.input} onPress={onPress}>
        <Text style={styles.text}>{dayjs(value).format('DD/MM/YYYY')}</Text>
        {Icon && (
          <View style={styles.icon}>
            <Icon />
          </View>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {position: 'absolute', right: 10},
  title: {
    color: COLORS.GRAY,
    fontSize: 14,
    fontWeight: '500',
  },
  input: {
    paddingLeft: 20,
    width: '100%',
    height: 50,
    borderRadius: 10,
    backgroundColor: '#CFD8DC',
    opacity: 0.3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,

    elevation: 16,
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
  },
});
