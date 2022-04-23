import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {COLORS, SCREEN_SIZE, APP_STYLES} from 'theme/theme';

export default function Input(props) {
  const {
    title,
    onChangeText,
    value,
    style,
    editable,
    multiline,
    width = SCREEN_SIZE.WIDTH * 0.8,
  } = props;
  return (
    <View style={[style, {marginVertical: 5, alignSelf: 'center'}]}>
      <Text style={styles.title}>{title}</Text>
      <TextInput
        style={[
          styles.input,
          {
            width,
            backgroundColor: !editable ? COLORS.PURPLE : '#CFD8DC',
            color: !editable ? 'white' : 'black',
            ...(multiline && {height: 250}),
          },
        ]}
        onChangeText={onChangeText}
        value={value}
        editable={editable}
        selectTextOnFocus={editable}
        multiline={Boolean(multiline)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    marginLeft: 10,
    marginBottom: 5,
    fontWeight: 'bold',
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
  },
});
