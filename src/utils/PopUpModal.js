import {View, Text, Pressable, StyleSheet} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {useSelector, useDispatch} from 'react-redux';
import {setter} from 'app-redux/actions/app/app.actions';
import {COLORS, SCREEN_SIZE, APP_STYLES} from 'theme/theme';
import Mui from 'react-native-vector-icons/MaterialIcons';
export default function PopModal(props) {
  const dispatch = useDispatch();
  const app = useSelector(state => state.appReducer);
  const closeModal = () => {
    dispatch(setter({response: null}));
  };

  const styles = StyleSheet.create({
    modalView: {
      width: SCREEN_SIZE.WIDTH * 0.8,
      bottom: 0,
      alignSelf: 'center',
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 15,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      justifyContent: 'flex-end',
      zIndex: 1000,
    },
    borderMessage: {
      paddingVertical: 10,
      borderRadius: 20,
      marginVertical: 5,
    },
    modalButton: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
      backgroundColor: app.response?.type ? COLORS.GREEN : COLORS.RED,
      width: SCREEN_SIZE.WIDTH * 0.7,
      marginVertical: 5,
      alignSelf: 'center',
      ...APP_STYLES.SHADOW,
    },
    text: {
      fontSize: 14,
      textAlign: 'center',
    },
    textButton: {
      fontWeight: 'bold',
      color: 'white',
      textAlign: 'center',
      ...APP_STYLES.SHADOW,
    },
    icon: {
      alignItems: 'center',
      position: 'absolute',
      top: -25,
      padding: 2,
      backgroundColor: 'white',
      borderRadius: 100,
      alignSelf: 'center',
    },
  });

  return (
    <Modal isVisible={app.response?.isResponse} onBackdropPress={closeModal}>
      <View style={styles.modalView}>
        <View style={styles.icon}>
          <Mui
            name={app.response?.type ? 'check-circle' : 'error'}
            size={50}
            color={app.response?.type ? COLORS.GREEN : COLORS.RED}
          />
        </View>
        <Text style={[styles.text, {marginTop: 25, fontSize: 18}]}>
          {app.response?.type ? 'Well done!' : 'Oooops, something went wrong!'}
        </Text>
        <View style={styles.borderMessage}>
          <Text style={styles.text}>{app.response?.message}</Text>
        </View>
        <Pressable onPress={closeModal} style={styles.modalButton}>
          <Text style={styles.textButton}>Confirm</Text>
        </Pressable>
      </View>
    </Modal>
  );
}
