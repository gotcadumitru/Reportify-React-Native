import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {COLORS, SCREEN_SIZE, APP_STYLES} from 'theme/theme';

export default function Input(props) {
  const {title, onChangeText, value, style, editable} = props;
  return (
    <View style={[style, {marginVertical: 5}]}>
      <Text style={styles.title}>{title}</Text>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: !editable ? COLORS.LIGHT_GRAY : 'transparent',
            color: !editable ? COLORS.GRAY : 'black',
          },
        ]}
        onChangeText={onChangeText}
        value={value}
        editable={editable}
        selectTextOnFocus={editable}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
    fontSize: 16,
    fontWeight: '500',
  },
});
