import React from 'react';
import {View, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import {useSelector, useDispatch} from 'react-redux';
import {setter} from 'app-redux/actions/app/app.actions';
import {SCREEN_SIZE} from 'theme/theme';
import LottieView from 'lottie-react-native';

export default function Loader() {
  const dispatch = useDispatch();
  const app = useSelector(state => state.appReducer);

  return (
    <Modal
      isVisible={Boolean(app.isLoading)}
      onModalHide={() => {
        if (app?.hasResponse)
          dispatch(setter({response: app.hasResponse, hasResponse: null}));
      }}>
      <View style={styles.modalView}>
        <LottieView
          source={require('assets/lottie/loading.json')}
          autoPlay
          loop
          style={{
            width: SCREEN_SIZE.WIDTH * 0.5,
            height: SCREEN_SIZE.WIDTH * 0.5,
          }}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalView: {
    bottom: 0,
    alignSelf: 'center',
    backgroundColor: 'transparent',
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
  },
});
