import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {COLORS} from 'theme/theme';
import Input from 'utils/Input';
import FilePicker from 'utils/FilePicker';
import DatePicker from 'utils/DatePicker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useFormik} from 'formik';
import {profileSchema} from 'components/screens/Auth/ProfileSetup/profileSetup.schema';
import LottieView from 'lottie-react-native';

import * as Animatable from 'react-native-animatable';

export default function EditProfile(props) {
  const {editUser, profile, navigation} = props;

  const [isPhotoSelect, setIsPhotoSelect] = React.useState(false);
  const [isDatePicker, setIsDatePicker] = React.useState(false);
  const [imageLoading, setImageLoading] = React.useState(
    Boolean(profile?.profileImage),
  );
  const {handleSubmit, handleChange, values, setFieldValue} = useFormik({
    initialValues: {
      name: profile?.name || '',
      surname: profile?.surname || '',
      localitate: profile?.localitate,
      oras: profile?.oras,
      files: [],
      birthday: new Date(profile?.birthday) || new Date(),
      profileImage: profile?.profileImage,
    },
    onSubmit: editProfile,
    validationSchema: profileSchema,
  });
  console.log(values);
  function editProfile(data) {
    const {profileImage, name, surname, localitate, oras, birthday} = data;
    editUser(
      {
        name,
        surname,
        localitate,
        birthday,
        oras,
        ...(profileImage?.isLocal && {profileImage}),
        id: profile._id,
      },
      true,
    );
  }

  return (
    <View style={styles.container}>
      <FilePicker
        justPhoto
        onClosePicker={() => setIsPhotoSelect(false)}
        isVisible={isPhotoSelect}
        single
        getFile={image =>
          setFieldValue('profileImage', {...image, isLocal: true})
        }
      />
      {imageLoading && (
        <LottieView
          source={require('assets/lottie/imageLoad.json')}
          autoPlay
          loop
          style={[{height: 300, width: '100%', alignSelf: 'center'}]}
        />
      )}
      <View>
        <Animatable.Image
          source={
            !Boolean(profile?.profileImage)
              ? require('assets/noimage.png')
              : {
                  uri: values?.profileImage?.isLocal
                    ? values?.profileImage?.path
                    : values?.profileImage?.fileUrl,
                }
          }
          animation="slideInDown"
          style={[
            styles.picture,
            {...(imageLoading && {position: 'absolute', zIndex: -10})},
          ]}
          onLoadEnd={() => setImageLoading(false)}
        />
        {!imageLoading && (
          <>
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
          </>
        )}
      </View>
      <Animatable.View
        style={{paddingHorizontal: 30, flex: 1}}
        animation="slideInUp">
        <ScrollView showsVerticalScrollIndicator={false}>
          <Input title={'Județ'} value={values.oras} editable={false} />
          <Input
            title={'Localitate'}
            value={values.localitate}
            editable={false}
          />
          <Input
            title={'Prenume'}
            value={values.name}
            editable
            onChangeText={handleChange('name')}
          />
          <Input
            title={'Nume'}
            value={values.surname}
            editable
            onChangeText={handleChange('surname')}
          />
          <DatePicker
            value={values?.birthday}
            isVisible={isDatePicker}
            toggleVisibility={value => setIsDatePicker(value)}
            title={'Data de naștere'}
            getValue={date => setFieldValue('birthday', date)}
          />
          <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
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
