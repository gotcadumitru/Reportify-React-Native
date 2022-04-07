import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Image,
  FlatList,
  Platform,
} from 'react-native';
import {COLORS, SCREEN_SIZE} from 'theme/theme';
import {useFormik} from 'formik';
import {profileSchema} from './profileSetup.schema';
import useJudeteOptions from 'hooks/useJudeteOptions';
import useLocalitatiOptions from 'hooks/useLocalitatiOptions';
import {Picker} from '@react-native-picker/picker';
import Pdf from 'react-native-pdf';
import Video from 'react-native-video';
import FilePicker from 'utils/FilePicker';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ProfileSetup(props) {
  const [step, setStep] = React.useState(0);
  const [isFilePicker, setIsFilePicker] = React.useState(false);
  const {editUser, profile} = props;
  const {handleSubmit, handleChange, values, setFieldValue} = useFormik({
    initialValues: {
      name: profile?.name || '',
      surname: profile?.surname || '',
      localitate: profile?.localitate,
      oras: profile?.oras,
      files: [],
    },
    onSubmit: setupProfile,
    validationSchema: profileSchema,
  });

  const orasOptions = useJudeteOptions();
  const localitateOptions = useLocalitatiOptions(values.oras);

  function setupProfile(data) {
    editUser({...data, id: profile._id});
  }

  const getStepType = () => {
    switch (step) {
      case 0: {
        return 'name';
      }
      case 1: {
        return 'surname';
      }
      case 2: {
        return 'oras';
      }
      case 3: {
        return 'localitate';
      }

      case 4: {
        return 'files';
      }

      default: {
        return null;
      }
    }
  };
  const filterFiles = index => {
    let files = [...values.files];
    files.splice(index, 1);
    setFieldValue('files', files);
  };

  const renderFile = ({item, index}) => {
    if (item?.mime?.includes('image')) {
      return (
        <View>
          <TouchableOpacity
            style={{
              position: 'absolute',
              right: 15,
              zIndex: 20,
            }}
            onPress={() => filterFiles(index)}>
            <Ionicons name="close-circle" color={COLORS.RED} size={40} />
          </TouchableOpacity>
          <Image source={{uri: item.path}} style={styles.imageView} />
        </View>
      );
    } else if (item?.type?.includes('pdf')) {
      return (
        <View>
          <TouchableOpacity
            style={{
              position: 'absolute',
              right: 15,
              zIndex: 20,
            }}
            onPress={() => filterFiles(index)}>
            <Ionicons name="close-circle" color={COLORS.RED} size={40} />
          </TouchableOpacity>
          <Pdf
            fitPolicy={0}
            source={{uri: item.uri}}
            style={{
              width: SCREEN_SIZE.WIDTH * 0.7,
              height: 250,
              backgroundColor: 'transparent',
              alignSelf: 'center',
              borderRadius: 20,
            }}
          />
        </View>
      );
    } else if (item?.mime?.includes('video')) {
      return (
        <View>
          <TouchableOpacity
            style={{
              position: 'absolute',
              right: 15,
              zIndex: 20,
            }}
            onPress={() => filterFiles(index)}>
            <Ionicons name="close-circle" color={COLORS.RED} size={40} />
          </TouchableOpacity>
          <View
            style={{
              width: SCREEN_SIZE.WIDTH * 0.7,
              height: 250,
              backgroundColor: 'transparent',
              alignSelf: 'center',
              borderRadius: 20,
            }}>
            <Video
              source={{uri: item.path}}
              style={{width: '100%', height: '100%', borderRadius: 20}}
              resizeMode={'cover'}
              paused={true}
              controls={true}
            />
          </View>
        </View>
      );
    }
  };

  const getInput = () => {
    switch (step) {
      case 0: {
        return (
          <>
            <Text style={styles.inputLabel}>Prenume</Text>
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
            <Text style={styles.inputLabel}>Nume</Text>
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
            <Text style={styles.inputLabel}>În ce județ locuiți?</Text>
            <Picker
              selectedValue={values.oras}
              onValueChange={itemValue => setFieldValue('oras', itemValue)}>
              {orasOptions.map(oras => {
                return (
                  <Picker.Item
                    key={oras.id}
                    label={oras.name}
                    value={oras.name}
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
            <Text style={styles.inputLabel}>În ce localitate locuiți?</Text>
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
      case 4: {
        return (
          <View style={{height: SCREEN_SIZE.HEIGHT * 0.85}}>
            <FilePicker
              isVisible={isFilePicker}
              getFile={files =>
                setFieldValue('files', [...values.files, ...files])
              }
              onClosePicker={() => {
                setIsFilePicker(false);
              }}
            />
            <Text style={styles.inputLabel}>
              Adăugați documente ce dovedesc domiciliu dumneavoastră!
            </Text>
            <FlatList
              data={values.files}
              renderItem={renderFile}
              ItemSeparatorComponent={() => (
                <View style={{marginVertical: 10}} />
              )}
              ListFooterComponent={
                <>
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => {
                      setIsFilePicker(true);
                    }}>
                    <Feather name="file-plus" size={50} color={COLORS.GRAY} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.saveButton]}
                    onPress={handleSubmit}>
                    <Text style={styles.saveText}>Salvează</Text>
                  </TouchableOpacity>
                </>
              }
            />
          </View>
        );
      }
      default: {
        return null;
      }
    }
  };
  const onChangeStep = () => {
    if (step + 1 < 5) setStep(step + 1);
    else {
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
          {step > 0 && (
            <TouchableOpacity
              style={{marginLeft: 20, height: 50}}
              onPress={() => {
                setStep(step - 1);
              }}>
              <Ionicons name="ios-return-up-back" size={30} color="black" />
            </TouchableOpacity>
          )}
        </View>
        <View>{getInput()}</View>
        <View
          style={{
            marginBottom: SCREEN_SIZE.HEIGHT * 0.4,
            alignSelf: 'flex-end',
            marginRight: 20,
          }}>
          {step < 4 && (
            <TouchableOpacity
              onPress={onChangeStep}
              disabled={values[getStepType()].length < 1}>
              <Ionicons
                name="arrow-redo-circle"
                size={50}
                color={
                  values[getStepType()].length < 1 ? COLORS.GRAY : COLORS.GREEN
                }
              />
            </TouchableOpacity>
          )}
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
  inputLabel: {
    margin: 10,
    fontWeight: '500',
    fontSize: 24,
    marginTop: 40,
    textAlign: 'center',
  },
  addButton: {
    borderColor: COLORS.GRAY,
    borderWidth: 2,
    borderRadius: 20,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: SCREEN_SIZE.WIDTH * 0.7,
    height: 250,
    marginTop: 20,
  },
  imageView: {
    height: 250,
    width: SCREEN_SIZE.WIDTH * 0.7,
    alignSelf: 'center',
    borderRadius: 20,
  },
  backgroundVideo: {
    zIndex: 42,
  },
  saveButton: {
    borderRadius: 20,
    padding: 15,
    elevation: 2,
    backgroundColor: COLORS.GREEN,
    width: SCREEN_SIZE.WIDTH * 0.7,
    alignSelf: 'center',
    marginTop: 30,
  },
  saveText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});
