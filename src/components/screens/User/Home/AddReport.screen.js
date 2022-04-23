import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Carousel from 'react-native-snap-carousel';
import Pdf from 'react-native-pdf';
import Video from 'react-native-video';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS, SCREEN_SIZE, APP_STYLES} from 'theme/theme';
import {useFormik} from 'formik';
import FilePicker from 'utils/FilePicker';
import Input from 'utils/Input';
import LocationPicker from 'utils/LocationPicker';
import {
  REPORT_CATEGORIES,
  REPORTS_PRIORITY,
  REPORTS_IMPORTANCE_LEVEL,
} from 'constants/data/report.data';

const SLIDER_WIDTH = SCREEN_SIZE.WIDTH;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);

export default function AddReport(props) {
  const {addPost} = props;
  const [isFilePicker, setIsFilePicker] = React.useState(false);
  const [isLocationPicker, setIsLocationPicker] = React.useState(false);

  const [currentTag, setCurrentTag] = React.useState('#');

  const carouselRef = React.useRef(null);

  const {handleSubmit, handleChange, values, setFieldValue} = useFormik({
    initialValues: {
      title: '',
      description: '',
      tags: [],
      labelLocation: '',
      location: null,
      category: REPORT_CATEGORIES[1],
      importanceLevel: REPORTS_IMPORTANCE_LEVEL[1],
      priority: REPORTS_PRIORITY[1],
      files: [],
    },
    onSubmit: addReport,
  });

  function addReport(data) {
    addPost({
      ...data,
      importanceLevel: data.importanceLevel.label,
      priority: data.priority.label,
      category: data.priority.label,
    });
  }

  const filterFiles = index => {
    let files = [...values.files];
    files.splice(index, 1);
    setFieldValue('files', files);
  };
  const renderFile = ({item, index}) => {
    if (item?.mime?.includes('image')) {
      return (
        <View>
          <Image source={{uri: item.path}} style={styles.imageView} />
        </View>
      );
    } else if (item?.type?.includes('pdf')) {
      return (
        <View>
          <Pdf
            fitPolicy={0}
            source={{uri: item.uri}}
            style={styles.imageView}
          />
        </View>
      );
    } else if (item?.mime?.includes('video')) {
      return (
        <View
          style={{
            width: '100%',
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
      );
    }
  };

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={60}
      behavior={'position'}
      style={styles.container}>
      <FilePicker
        isVisible={isFilePicker}
        getFile={files => setFieldValue('files', [...values.files, ...files])}
        onClosePicker={() => {
          setIsFilePicker(false);
        }}
      />

      <ScrollView>
        <View style={{height: 250, marginTop: 30}}>
          {values.files.length > 0 ? (
            <Carousel
              data={values.files}
              renderItem={renderFile}
              sliderWidth={SLIDER_WIDTH}
              itemWidth={ITEM_WIDTH}
              itemHeight={250}
              layout={'stack'}
              layoutCardOffset={`18`}
              ref={carouselRef}
            />
          ) : (
            <Image
              source={require('assets/noimage.png')}
              style={styles.noImage}
            />
          )}
        </View>
        <View style={styles.addRemoveContainer}>
          <TouchableOpacity
            style={styles.addFileButton}
            onPress={() => setIsFilePicker(true)}>
            <Ionicons name="add-circle" size={40} color={'white'} />
          </TouchableOpacity>
          {values.files.length > 0 && (
            <TouchableOpacity
              style={[styles.addFileButton, {backgroundColor: COLORS.RED}]}
              onPress={() => filterFiles(carouselRef?.current?.currentIndex)}>
              <Ionicons name="close-circle" color={'white'} size={40} />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.inputsContainer}>
          <Input
            title={'Titlu'}
            value={values.title}
            editable
            onChangeText={handleChange('title')}
            placeholder={'Titplu raportare'}
          />
          <Input
            title={'Descriere'}
            value={values.description}
            editable
            onChangeText={handleChange('description')}
            placeholder={'Descriere raportare'}
            multiline
          />
          <Input
            title={'Taguri'}
            value={currentTag}
            editable
            onChangeText={tag => setCurrentTag(tag)}
            placeholder={'Titplu raportare'}
            onSubmitEditing={() => {
              setFieldValue('tags', [...values.tags, currentTag]);
              setCurrentTag('#');
            }}
          />
          <View style={styles.tagsView}>
            {values.tags.map(tag => (
              <View style={styles.tagComponent}>
                <Text style={styles.tagText}>{tag}</Text>
                <TouchableOpacity
                  onPress={() => {
                    setFieldValue(
                      'tags',
                      values.tags.filter(el => el !== tag),
                    );
                  }}>
                  <Ionicons
                    name="close"
                    color="white"
                    size={20}
                    style={{marginLeft: 5}}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>
          <Input
            title={'Locatie'}
            value={values.labelLocation}
            editable
            onChangeText={handleChange('labelLocation')}
            placeholder={'Locatie'}
          />
          <View style={{marginTop: 10}}>
            <LocationPicker
              isVisible={isLocationPicker}
              onClosePicker={() => setIsLocationPicker(false)}
              onOpenPicker={() => setIsLocationPicker(true)}
              getLocation={location => setFieldValue('location', location)}
              location={values.location}
            />
          </View>
          <View style={{marginTop: 10}}>
            <Text style={styles.title}>Categorie</Text>
            <Picker
              style={{width: SCREEN_SIZE.WIDTH * 0.7, alignSelf: 'center'}}
              numberOfLines={1}
              selectedValue={values.category.value}
              onValueChange={(item, index) =>
                setFieldValue('category', REPORT_CATEGORIES[index])
              }>
              {REPORT_CATEGORIES.map(({label, value}) => {
                return <Picker.Item label={label} value={value} key={value} />;
              })}
            </Picker>
          </View>
          <View style={{marginTop: 10}}>
            <Text style={styles.title}>Prioritate</Text>
            <Picker
              style={{width: SCREEN_SIZE.WIDTH * 0.7, alignSelf: 'center'}}
              numberOfLines={1}
              selectedValue={values.priority.value}
              onValueChange={(item, index) =>
                setFieldValue('priority', REPORTS_PRIORITY[index])
              }>
              {REPORTS_PRIORITY.map(({label, value}) => {
                return <Picker.Item label={label} value={value} key={value} />;
              })}
            </Picker>
          </View>
          <View style={{marginTop: 10}}>
            <Text style={styles.title}>Importanța</Text>
            <Picker
              style={{width: SCREEN_SIZE.WIDTH * 0.7, alignSelf: 'center'}}
              numberOfLines={1}
              selectedValue={values.importanceLevel.value}
              onValueChange={(item, index) =>
                setFieldValue(
                  'importanceLevel',
                  REPORTS_IMPORTANCE_LEVEL[index],
                )
              }>
              {REPORTS_IMPORTANCE_LEVEL.map(({label, value}) => {
                return <Picker.Item label={label} value={value} key={value} />;
              })}
            </Picker>
          </View>
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Raportează</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fafafa'},
  addRemoveContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  noImage: {
    width: ITEM_WIDTH,
    height: 250,
    borderRadius: 20,
    alignSelf: 'center',
  },
  addFileButton: {
    width: 150,
    paddingVertical: 3,
    backgroundColor: COLORS.LIGHT_BLUE,
    marginTop: 15,
    borderRadius: 20,
    alignItems: 'center',
  },
  imageView: {
    height: 250,
    width: ITEM_WIDTH,
    alignSelf: 'center',
    borderRadius: 20,
  },
  inputsContainer: {
    width: ITEM_WIDTH,
    alignSelf: 'center',
  },
  tagComponent: {
    backgroundColor: COLORS.GRAY,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginRight: 10,
    marginTop: 10,
    flexDirection: 'row',
  },
  tagText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  tagsView: {
    flexDirection: 'row',
    marginVertical: 10,
    flexWrap: 'wrap',
  },
  title: {
    marginLeft: 10,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  submitButton: {
    width: SCREEN_SIZE.WIDTH * 0.7,
    backgroundColor: COLORS.LIGHT_BLUE,
    borderRadius: 20,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 150,
    padding: 15,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 16,
  },
});
