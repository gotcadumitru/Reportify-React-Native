import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import {COLORS, SCREEN_SIZE} from 'theme/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useFormik} from 'formik';
import {profileSchema} from './profileSetup.schema';
import useJudeteOptions from 'hooks/useJudeteOptions';
import useLocalitatiOptions from 'hooks/useLocalitatiOptions';
import {Picker} from '@react-native-picker/picker';

export default function ProfileSetup(props) {
  const [step, setStep] = React.useState(0);

  const {handleSubmit, handleChange, values, setFieldValue} = useFormik({
    initialValues: {
      name: '',
      surname: '',
      localitate: 'Suceava',
      oras: 'Suceava',
    },
    onSubmit: data => {
      console.log(data);
    },
    validationSchema: profileSchema,
  });

  const orasOptions = useJudeteOptions();
  const localitateOptions = useLocalitatiOptions(values.oras);

  const getStepType = () => {
    switch (step) {
      case 0: {
        return 'name';
      }
      case 1: {
        return 'surname';
      }
      case 2: {
        return 'localitate';
      }
      case 3: {
        return 'oras';
      }

      default: {
        return null;
      }
    }
  };

  const getTextInput = () => {
    switch (step) {
      case 0: {
        return (
          <>
            <Text
              style={{
                margin: 10,
                fontWeight: '500',
                fontSize: 24,
                marginTop: 40,
                textAlign: 'center',
              }}>
              What is your name?
            </Text>
            <View style={styles.textInputView}>
              <TextInput
                style={styles.textInput}
                value={values.name}
                placeholder="Name"
                onChangeText={handleChange('name')}
                placeholderTextColor={COLORS.GRAY}
                autoFocus
                selectionColor="black"
              />
            </View>
          </>
        );
      }
      case 1: {
        return (
          <>
            <Text
              style={{
                margin: 10,
                fontWeight: '500',
                fontSize: 24,
                marginTop: 40,
                textAlign: 'center',
              }}>
              What is your last name?
            </Text>
            <View style={styles.textInputView}>
              <TextInput
                style={styles.textInput}
                placeholder="Last Name"
                onChangeText={handleChange('surname')}
                value={values.surname}
                placeholderTextColor={COLORS.GRAY}
                autoFocus
                selectionColor="black"
              />
            </View>
          </>
        );
      }
      case 2: {
        return (
          <>
            <Text
              style={{
                margin: 10,
                fontWeight: '500',
                fontSize: 24,
                marginTop: 40,
                textAlign: 'center',
              }}>
              În ce județ locuiți?
            </Text>
            <Picker
              selectedValue={values.localitate}
              onValueChange={itemValue =>
                setFieldValue('localitate', itemValue)
              }>
              {orasOptions.map(judet => {
                return (
                  <Picker.Item
                    key={judet.id}
                    label={judet.name}
                    value={judet.name}
                  />
                );
              })}
            </Picker>
          </>
        );
      }
      case 3: {
        return (
          <>
            <Text
              style={{
                margin: 10,
                fontWeight: '500',
                fontSize: 24,
                marginTop: 40,
                textAlign: 'center',
              }}>
              În ce localitate locuiți?
            </Text>
            <Picker
              selectedValue={values.localitate}
              onValueChange={itemValue =>
                setFieldValue('localitate', itemValue)
              }>
              {localitateOptions.map(local => {
                return (
                  <Picker.Item
                    key={local.id}
                    label={local.name}
                    value={local.name}
                  />
                );
              })}
            </Picker>
          </>
        );
      }
      default: {
        return null;
      }
    }
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'space-between',
      }}>
      <SafeAreaView>
        <View style={{width: SCREEN_SIZE.WIDTH}}>
          <TouchableOpacity
            style={{marginLeft: 20, height: 50}}
            onPress={() => {
              setStep(step - 1);
            }}>
            {step > 0 && (
              <Ionicons name="ios-return-up-back" size={30} color="black" />
            )}
          </TouchableOpacity>
        </View>
        <View>{getTextInput()}</View>
        <View
          style={{
            marginBottom: SCREEN_SIZE.HEIGHT * 0.4,
            alignSelf: 'flex-end',
            marginRight: 20,
          }}>
          <TouchableOpacity
            onPress={() => {
              setStep(step + 1);
            }}
            disabled={values[getStepType()].length < 1}>
            <Ionicons
              name="arrow-redo-circle"
              size={50}
              color={
                values[getStepType()].length < 1 ? COLORS.GRAY : COLORS.GREEN
              }
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 40,
    height: 80,
    alignSelf: 'center',
    width: SCREEN_SIZE.WIDTH,
  },
  textInputView: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: SCREEN_SIZE.WIDTH,
  },
});
