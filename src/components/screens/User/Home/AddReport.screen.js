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
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Pdf from 'react-native-pdf';
import Video from 'react-native-video';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS, SCREEN_SIZE, APP_STYLES} from 'theme/theme';
import {useFormik} from 'formik';
import FilePicker from 'utils/FilePicker';
import Input from 'utils/Input';

const SLIDER_WIDTH = SCREEN_SIZE.WIDTH;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);

export default function AddReport(props) {
  const [isFilePicker, setIsFilePicker] = React.useState(false);
  const carouselRef = React.useRef(null);
  const {} = props;

  const {handleSubmit, handleChange, values, setFieldValue} = useFormik({
    initialValues: {
      title: '',
      description: '',
      location: '',
      category: null,
      tags: [],
      reportId: '',
      comments: [],
      labelLocation: '',
      importanceLevel: null,
      priority: null,
      files: [],
    },
    onSubmit: addReport,
  });

  function addReport(data) {}

  const filterFiles = index => {
    let files = [...values.files];
    files.splice(index, 1);
    setFieldValue('files', files);
  };
  console.log('carouselRef', carouselRef?.current?.currentIndex);
  const renderFile = ({item, index}) => {
    console.log('index', index);
    if (item?.mime?.includes('image')) {
      return (
        <View>
          <Image source={{uri: item.path}} style={styles.imageView} />
        </View>
      );
    } else if (item?.type?.includes('pdf')) {
      return (
        <View>
          )}
          <Pdf
            fitPolicy={0}
            source={{uri: item.uri}}
            style={styles.imageView}
          />
        </View>
      );
    } else if (item?.mime?.includes('video')) {
      return (
        <View>
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
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="always">
        <FilePicker
          isVisible={isFilePicker}
          getFile={files => setFieldValue('files', [...values.files, ...files])}
          onClosePicker={() => {
            setIsFilePicker(false);
          }}
        />
        <View style={{height: 250}}>
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
          <KeyboardAvoidingView>
            <Input
              title={'Titlu'}
              value={values.title}
              editable
              onChangeText={handleChange('title')}
            />
            <Input
              title={'Descriere'}
              value={values.description}
              editable
              onChangeText={handleChange('description')}
              multiline
            />
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, marginVertical: 30, backgroundColor: '#fff'},
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
});
