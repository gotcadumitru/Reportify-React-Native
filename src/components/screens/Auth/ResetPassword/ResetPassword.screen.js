import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  TextInput,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {COLORS, SCREEN_SIZE} from 'theme/theme';
import {useFormik} from 'formik';
import {resetPassSchema} from './resetPass.schema';
export default function ResetPassword(props) {
  const {navigation, resetPassword, signInGoogle, signInFacebook} = props;
  const {height, width} = useWindowDimensions();

  const {handleSubmit, handleChange, handleBlur, values, errors, touched} =
    useFormik({
      initialValues: {
        email: '',
      },
      onSubmit: data => {
        resetPassword(data.email);
      },
      validationSchema: resetPassSchema,
    });
  return (
    <ScrollView>
      <View style={styles.container}>
        <View
          style={{
            marginTop: 20,
            justifyContent: 'center',
            alignItems: 'center',
            flex: 3,
          }}>
          <Text style={styles.welcomeText}>Resetează parola</Text>
        </View>
        <View style={{marginTop: 20, flex: 4}}>
          <Text style={styles.topInputText}>Adresa de email</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput({width})}
              placeholder="you@your-domain.com"
              placeholderTextColor="#000000"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
            />
            <Text style={styles.errors}>
              {errors.email && touched.email && errors.email}
            </Text>
          </View>
          <Text style={styles.authText}>
            Vă rugăm să urmați instrucțiunile primite în e-mail!
          </Text>
        </View>

        <View style={[styles.bntView, {flex: 2}]}>
          <TouchableOpacity
            style={[styles.btn({height, width}), styles.shadow]}
            onPress={handleSubmit}>
            <Text style={styles.btnText}>Resetează</Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1}}>
          <TouchableOpacity
            style={{paddingTop: 25}}
            onPress={() => navigation.goBack()}>
            <Text style={styles.forgotPassText}>Mi-am amintit parola!</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignContent: 'center',
            marginTop: 30,
            flex: 1,
          }}>
          <Text>sau conectativa cu</Text>
        </View>
        <View style={[styles.socialMediaView, {flex: 5}]}>
          <TouchableOpacity
            style={[
              styles.socialMediaButton,
              {backgroundColor: '#2596be'},
              styles.shadow,
            ]}
            onPress={signInFacebook}>
            <FontAwesome
              name="facebook"
              size={SCREEN_SIZE.WIDTH * 0.1}
              color="white"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.socialMediaButton,
              {backgroundColor: '#DD2C00'},
              styles.shadow,
            ]}
            onPress={signInGoogle}>
            <FontAwesome
              name="google"
              size={SCREEN_SIZE.WIDTH * 0.1}
              color="white"
            />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: SCREEN_SIZE.HEIGHT,
  },
  welcomeText: {
    fontSize: SCREEN_SIZE.WIDTH * 0.055,
    textAlign: 'center',
  },
  authText: {
    color: COLORS.GRAY,
    fontSize: 14,
    marginTop: 10,
    width: '80%',
  },
  bntView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  btn: props => ({
    justifyContent: 'center',
    alignItems: 'center',
    width: props.width * 0.8,
    height: 50,
    backgroundColor: COLORS.DARK_BLUE,
    borderRadius: 20,
  }),
  btnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: Platform.OS === 'ios' ? 18 : 16,
  },
  socialMediaView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialMediaButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_SIZE.WIDTH * 0.2,
    height: SCREEN_SIZE.WIDTH * 0.2,
    borderRadius: SCREEN_SIZE.WIDTH * 0.2,
    marginHorizontal: 20,
  },
  textInput: props => ({
    paddingLeft: 20,
    width: props.width * 0.8,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#CFD8DC',
    opacity: 0.3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,

    elevation: 16,
  }),

  inputContainer: {
    // flexDirection: 'row',d
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    height: SCREEN_SIZE.HEIGHT * 0.065,
  },
  topInputText: {
    // fontFamily: "Roboto-Light",
    marginLeft: 10,
    marginBottom: 10,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
  forgotPassText: {
    color: COLORS.DARK_BLUE,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  errors: {
    color: COLORS.RED,
    fontWeight: '600',
    marginVertical: 5,
    textAlign: 'right',
  },
});
