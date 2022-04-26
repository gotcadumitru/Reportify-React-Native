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
    placeholder,
    onSubmitEditing,
    noHeightMultiline,
    inputRef = null,
  } = props;
  return (
    <View style={[style, {marginVertical: 5, alignSelf: 'center'}]}>
      <Text style={styles.title}>{title}</Text>
      <TextInput
        style={[
          styles.input,
          {
            width,
            backgroundColor: !editable ? COLORS.MEDIUM_GRAY : COLORS.INPUT,
            color: !editable ? 'white' : 'black',
            ...(multiline && !noHeightMultiline && {minHeight: 100}),
            ...(noHeightMultiline && {maxHeight: 150}),
          },
        ]}
        onChangeText={onChangeText}
        value={value}
        editable={editable}
        selectTextOnFocus={editable}
        multiline={Boolean(multiline)}
        placeholder={placeholder}
        onSubmitEditing={onSubmitEditing}
        ref={inputRef}
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
  },
});
