import {View, Text, Pressable, StyleSheet} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {COLORS, SCREEN_SIZE} from 'theme/theme';
import ImagePicker from 'react-native-image-crop-picker';
import DocumentPicker from 'react-native-document-picker';

export default function FilePicker(props) {
  const {isVisible, onClosePicker, getFile, justPhoto, single} = props;
  const makePicture = type => {
    ImagePicker.openCamera({cropping: true, mediaType: type})
      .then(image => {
        getFile([{...image, mimetype: image.mime}]);
      })
      .finally(onClosePicker);
  };

  const choosePicture = () => {
    ImagePicker.openPicker({...pickerParams, multiple: !single})
      .then(images => {
        if (single) return getFile(images);
        getFile(
          images.map(image => {
            return {...image, mimetype: image.mime};
          }),
        );
      })
      .finally(onClosePicker);
  };

  const selectFile = () => {
    DocumentPicker.pickMultiple({
      type: [DocumentPicker.types.pdf],
    })
      .then(docs => {
        getFile(
          docs.map(doc => {
            return {...doc, mimetype: doc.type};
          }),
        );
      })
      .finally(onClosePicker);
  };

  return (
    <Modal
      onBackdropPress={onClosePicker}
      hasBackdrop
      isVisible={isVisible}
      style={styles.bottomModal}>
      <View style={styles.modalView}>
        {!justPhoto && (
          <Pressable
            style={[styles.modalButton, {backgroundColor: COLORS.PURPLE}]}
            onPress={selectFile}>
            <Text style={styles.modalButtonText}>Selectează fișier</Text>
          </Pressable>
        )}
        <Pressable
          style={[styles.modalButton, {backgroundColor: COLORS.LIGHT_PURPLE}]}
          onPress={() => makePicture('any')}>
          <Text style={styles.modalButtonText}>Capturează foto</Text>
        </Pressable>
        {!justPhoto && (
          <Pressable
            style={[styles.modalButton, {backgroundColor: COLORS.LIGHT_PURPLE}]}
            onPress={() => makePicture('video')}>
            <Text style={styles.modalButtonText}>Capturează video</Text>
          </Pressable>
        )}
        <Pressable
          style={[styles.modalButton, {backgroundColor: COLORS.GREEN}]}
          onPress={choosePicture}>
          <Text style={styles.modalButtonText}>
            Selectează foto{!justPhoto && '/video'}
          </Text>
        </Pressable>
        <Pressable style={styles.modalButton} onPress={onClosePicker}>
          <Text style={styles.modalButtonText}>Ieșire</Text>
        </Pressable>
      </View>
    </Modal>
  );
}
const pickerParams = {
  //   cropping: true,
  compressImageQuality: 0.6,
  multiple: true,
  freeStyleCropEnabled: true,
  mediaType: 'any',
  forceJpg: true,
  compressVideoPreset: 'LowQuality',
};
const styles = StyleSheet.create({
  changeImageContainer: {
    borderWidth: 1,
    borderColor: COLORS.GRAY,
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePicture: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  changePictureContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },

  changePictureText: {
    color: COLORS.LIGHT_PURPLE,
    fontFamily: 'Rubik',
    fontSize: 14,
    lineHeight: 17,
    textAlign: 'center',
  },
  input: {
    borderBottomColor: COLORS.GRAY,
    borderBottomWidth: 1,
    width: '100%',
    fontWeight: '500',
    fontSize: 17,
    lineHeight: 22,
    paddingHorizontal: 5,
    color: COLORS.PURPLE,
  },
  headerText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 5,
  },
  textInputName: {
    fontSize: 17,
    lineHeight: 22,
    color: COLORS.GRAY,
    marginLeft: 5,
  },
  inputsContainer: {
    marginTop: 20,
  },
  modalView: {
    width: SCREEN_SIZE.WIDTH,
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    paddingVertical: 20,
  },
  modalButton: {
    borderRadius: 20,
    padding: 15,
    elevation: 2,
    backgroundColor: COLORS.RED,
    width: SCREEN_SIZE.WIDTH * 0.7,
    marginVertical: 5,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});
