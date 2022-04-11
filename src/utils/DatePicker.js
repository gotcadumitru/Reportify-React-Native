import React from 'react';
import {View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import IconInput from './IconInput';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from 'theme/theme';

export default function DatePickerModal(props) {
  const {title, value, isVisible, toggleVisibility, getValue, icon} = props;
  return (
    <View>
      <IconInput
        title={title}
        value={value}
        onPress={() => toggleVisibility(true)}
        Icon={() => <Ionicons name="calendar" size={24} color={COLORS.GRAY} />}
      />
      <DatePicker
        modal
        mode="date"
        open={isVisible}
        date={value}
        onConfirm={date => {
          getValue(date);
          toggleVisibility(false);
        }}
        onCancel={() => toggleVisibility(false)}
      />
    </View>
  );
}
