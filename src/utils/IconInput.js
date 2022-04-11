import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {COLORS} from 'theme/theme';
import dayjs from 'dayjs';

export default function Input(props) {
  const {title, value, style, onPress, Icon} = props;
  return (
    <View style={[style, {marginVertical: 5}]}>
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
    borderRadius: 20,
    borderColor: COLORS.GRAY,
    borderWidth: 1,
    height: 50,
    marginTop: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
  },
});
