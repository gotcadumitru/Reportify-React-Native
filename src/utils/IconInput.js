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
        <Text style={styles.text}>
          {value ? dayjs(value).format('DD/MM/YYYY') : 'Alegeți o dată'}
        </Text>
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
    marginLeft: 10,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: 'red',
    justifyContent: 'center',
    paddingLeft: 20,
    width: '100%',
    minHeight: 50,
    borderRadius: 10,
    shadowColor: COLORS.INPUT,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.44,
    shadowRadius: 4.32,
    elevation: 4,
    backgroundColor: COLORS.INPUT,
  },
  text: {
    fontSize: 14,
  },
});
