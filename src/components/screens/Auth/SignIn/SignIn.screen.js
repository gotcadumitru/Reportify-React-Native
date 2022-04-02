import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {COLORS, SCREEN_SIZE} from 'theme/theme';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {SCREENS} from 'constants/screens/screen.names';
import {useFormik} from 'formik';
import {signInSchema} from './SignIn.schema';
import axios from 'axios';
export default function SingIn(props) {
  const {navigation} = props;
  const [isSecurePassword, setIsSecurePassword] = React.useState(true);
  const {handleSubmit, handleChange, handleBlur, values, errors, touched} =
    useFormik({
      initialValues: {email: '', password: ''},
      onSubmit: submitForm,
      // validationSchema: signInSchema,
    });

  function submitForm() {
    console.log('dada');
    axios
      .post('http://localhost:8080/api/auth/login', {
        email: 'dumitru.gotca.dev@gmail.com',
        password: '111111',
      })
      .then(function (response) {
        console.log(response);
      });
  }

  return (
    <View style={{height: SCREEN_SIZE.HEIGHT}}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-start',
            }}>
            <TouchableOpacity
              style={{
                textAlign: 'left',
              }}
              onPress={() => navigation.goBack()}>
              <Entypo name="chevron-with-circle-left" size={40} color="black" />
            </TouchableOpacity>
          </View>
          <View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              SIGN IN
            </Text>
          </View>
          <View
            style={{
              flex: 1,
            }}
          />
        </View>

        <View
          style={{
            marginTop: 20,
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
          }}>
          <Text style={styles.welcomeText}>Welcome to Reportify</Text>
          <Text style={styles.authText}>
            Log in by filling in the information below:
          </Text>
        </View>
        <View style={{marginTop: 20, flex: 6}}>
          <Text style={styles.topInputText}>Email address</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="you@your-domain.com"
              placeholderTextColor="#000000"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
            />
          </View>
          <Text style={styles.errors}>
            {errors.email && touched.email && errors.email}
          </Text>
          <Text style={styles.topInputText}>Password</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              autoCorrect={false}
              placeholder="Shhh! This is super secret!"
              placeholderTextColor="#000000"
              secureTextEntry={isSecurePassword}
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
            />
            <TouchableOpacity
              style={{justifyContent: 'center', backgroundColor: 'red'}}
              onPress={() => {
                setIsSecurePassword(!isSecurePassword);
              }}>
              <Feather
                name={isSecurePassword ? 'eye-off' : 'eye'}
                size={SCREEN_SIZE.HEIGHT * 0.0325}
                color="black"
                style={{position: 'absolute', right: 10}}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.errors}>
            {errors.password && touched.password && errors.password}
          </Text>
          <View
            style={{
              marginTop: 15,
              alignItems: 'flex-end',
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(SCREENS.RESET_PASSWORD);
              }}>
              <Text style={styles.forgotPassText}>Forgot password?</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.btnView, {flex: 1}]}>
          <TouchableOpacity
            style={[styles.btn, styles.shadow]}
            onPress={handleSubmit}>
            <Text style={styles.btnText}>Sign in</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btnSecond, styles.shadow]}
            onPress={() => {
              navigation.navigate(SCREENS.SIGN_UP);
            }}>
            <Text style={[styles.btnText, {color: COLORS.PURPLE}]}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignContent: 'center',
            marginTop: 60,
            flex: 1,
          }}>
          <Text>or connect with</Text>
        </View>
        <View style={[styles.socialMediaView, {flex: 2}]}>
          <TouchableOpacity
            style={[
              styles.socialMediaButton,
              {backgroundColor: '#2596be'},
              styles.shadow,
            ]}
            onPress={() => {}}>
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
            onPress={() => {}}>
            <FontAwesome
              name="google"
              size={SCREEN_SIZE.WIDTH * 0.1}
              color="white"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
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
  },
  btnView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_SIZE.WIDTH * 0.8,
    height:
      Platform.OS === 'ios'
        ? SCREEN_SIZE.HEIGHT * 0.06
        : SCREEN_SIZE.HEIGHT * 0.06,
    backgroundColor: COLORS.PURPLE,
    borderRadius: 20,
  },
  btnSecond: {
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_SIZE.WIDTH * 0.8,
    height: SCREEN_SIZE.HEIGHT * 0.06,
    backgroundColor: 'transparent',
    borderRadius: 20,
    borderColor: COLORS.PURPLE,
    borderWidth: 2,
    marginTop: 20,
  },
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
  textInput: {
    paddingLeft: 20,
    width: SCREEN_SIZE.WIDTH * 0.8,
    height: SCREEN_SIZE.HEIGHT * 0.065,
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
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    height: SCREEN_SIZE.HEIGHT * 0.065,
  },
  topInputText: {
    marginLeft: 10,
    marginBottom: 5,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  forgotPassText: {
    color: COLORS.PURPLE,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  header: {
    flex: 2,
    width: SCREEN_SIZE.WIDTH * 0.9,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  errors: {
    color: COLORS.RED,
    fontWeight: '600',
    marginVertical: 5,
    textAlign: 'right',
  },
});
