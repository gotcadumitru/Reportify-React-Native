import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {COLORS} from 'theme/theme';
import Input from 'utils/Input';
import FilePicker from 'utils/FilePicker';
import DatePicker from 'utils/DatePicker';
import Ionicons from 'react-native-vector-icons/Ionicons';

import * as Animatable from 'react-native-animatable';

export default function EditProfile(props) {
  const {navigation} = props;
  const [isPhotoSelect, setIsPhotoSelect] = React.useState(false);
  const [isDatePicker, setIsDatePicker] = React.useState(false);

  return (
    <View style={styles.container}>
      <FilePicker
        justPhoto
        onClosePicker={() => setIsPhotoSelect(false)}
        isVisible={isPhotoSelect}
      />
      <View>
        <Animatable.Image
          source={require('assets/dummy.png')}
          animation="slideInDown"
          style={styles.picture}
        />
        <TouchableOpacity
          style={[styles.iconButton, {right: 20}]}
          onPress={() => setIsPhotoSelect(true)}>
          <Ionicons name="camera" color="white" size={40} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.iconButton,
            {left: 20, backgroundColor: 'transparent'},
          ]}
          onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-circle" color="white" size={40} />
        </TouchableOpacity>
      </View>
      <Animatable.View
        style={{paddingHorizontal: 30, flex: 1}}
        animation="slideInUp">
        <ScrollView showsVerticalScrollIndicator={false}>
          <Input title={'Județ'} value={'Suceava'} editable={false} />
          <Input title={'Localitate'} value={'Suceava'} editable={false} />
          <Input title={'Nume'} value={'Hello'} editable />
          <Input title={'Prenume'} value={'Hello'} editable />
          <DatePicker
            value={new Date()}
            isVisible={isDatePicker}
            toggleVisibility={value => setIsDatePicker(value)}
            title={'Data de naștere'}
            getValue={value => console.log(value)}
          />
          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Salvează</Text>
          </TouchableOpacity>
        </ScrollView>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  picture: {
    borderBottomEndRadius: 50,
    borderBottomStartRadius: 50,
    height: 300,
    width: '100%',
  },
  saveButton: {
    backgroundColor: COLORS.PURPLE,
    padding: 15,
    borderRadius: 20,
    marginVertical: 30,
  },
  saveButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  iconButton: {
    position: 'absolute',
    top: 30,
    backgroundColor: COLORS.DARK,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
});
