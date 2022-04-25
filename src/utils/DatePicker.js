import React from 'react';
import {View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import IconInput from './IconInput';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from 'theme/theme';

export default function DatePickerModal(props) {
  const {
    title,
    value,
    isVisible,
    toggleVisibility,
    getValue,
    icon,
    maxDate,
    isModal,
  } = props;
  return (
    <View>
      <IconInput
        title={title}
        value={value}
        onPress={() => toggleVisibility(true)}
        Icon={() => <Ionicons name="calendar" size={24} color={'black'} />}
      />
      <DatePicker
        modal={isModal}
        mode="date"
        open={isVisible}
        date={value || new Date()}
        onConfirm={date => {
          getValue(date);
          toggleVisibility(false);
        }}
        maximumDate={maxDate}
        onCancel={() => toggleVisibility(false)}
      />
    </View>
  );
}
