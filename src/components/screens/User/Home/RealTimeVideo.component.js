import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  Text,
  useWindowDimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {IoMdCall} from 'react-icons/io';
import Mui from 'react-native-vector-icons/MaterialIcons';
import MuIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Modal from 'react-native-modal';
import {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
  MediaStream,
  MediaStreamTrack,
  mediaDevices,
  registerGlobals,
} from 'react-native-webrtc';

import {
  answerToUserCallThunk,
  callUserBySocketIdThunk,
} from 'app-redux/thunk/socket.thunk';
import {
  setUsersWhoAnsweredMeAC,
  setUsersWhoCallMeAC,
  setUserWhoICallAC,
  resetCallStatus,
} from 'app-redux/thunk/user.action';
import {COLORS} from 'theme/theme';
import Loader from 'utils/Loader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const RealtimeVideoChat = () => {
  const [isCamera, setIsCamera] = React.useState(true);
  const [isMicrophone, setIsMicrophone] = React.useState(true);

  const appReducer = useSelector(state => state.appReducer);
  const {profile} = appReducer;

  const connectedToWsUsersFromMyLocation = useSelector(
    state => state.callReducer.connectedToWsUsersFromMyLocation,
  );
  const usersWhoCallMe = useSelector(state => state.callReducer.usersWhoCallMe);
  const usersWhoAnsweredMe = useSelector(
    state => state.callReducer.usersWhoAnsweredMe,
  );
  const configuration = {iceServers: [{url: 'stun:stun.l.google.com:19302'}]};
  const {height, width} = useWindowDimensions();

  const userWhoICall = useSelector(state => state.callReducer.userWhoICall);
  const [isRealtimeVideoChatShow, handleIsRealtimeVideoChatShow] =
    useState(true);
  const [isAlreadyCalling, setIsAlreadyCalling] = useState(false);
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const peerConnection = useRef();
  const streamMedia = useRef();
  const dispatch = useDispatch();
  const isRealTimeVideoChatEnabled =
    Object.keys(usersWhoCallMe).length || userWhoICall;

  useEffect(() => {
    if (isRealTimeVideoChatEnabled) {
      peerConnection.current = new RTCPeerConnection(configuration);

      peerConnection.current.onconnectionstatechange = function (e, r) {
        console.log(peerConnection.current.connectionState);
        switch (peerConnection.current.connectionState) {
          case 'disconnected':
            closeConnection();

            break;

          default:
            break;
        }
      };
      peerConnection.current.onaddstream = function ({stream}) {
        console.log('stream: ' + JSON.stringify(stream, null, 2));
        setRemoteStream(stream);
      };
      getMediaDevices();
    }
  }, [isRealTimeVideoChatEnabled]);

  const getMediaDevices = async () => {
    const sourceInfos = await mediaDevices.enumerateDevices();
    console.log('debbuggersourceInfos', sourceInfos);
    let videoSourceId;
    for (let i = 0; i < sourceInfos.length; i++) {
      const sourceInfo = sourceInfos[i];
      if (
        sourceInfo.kind == 'videoinput' &&
        sourceInfo.facing == (true ? 'front' : 'environment')
      ) {
        videoSourceId = sourceInfo.deviceId;
      }
    }
    console.log('debbuggervideoSourceId', videoSourceId);

    streamMedia.current = await mediaDevices.getUserMedia({
      audio: true,
      video: {
        width: 640,
        height: 480,
        frameRate: 30,
        facingMode: 'user',
        deviceId: videoSourceId,
      },
    });

    setLocalStream(streamMedia.current);
    console.log('streamMedia.current', streamMedia.current);
    peerConnection.current.addStream(streamMedia.current);
    if (userWhoICall) {
      onConnectClick(userWhoICall);
    }
  };
  const closeConnection = () => {
    peerConnection.current.close();
    peerConnection.current = null;
    streamMedia.current.getTracks().forEach(function (track) {
      track.stop();
    });
    setIsAlreadyCalling(false);
    dispatch(resetCallStatus());
    setIsCamera(true);
    setLocalStream(null);
    setRemoteStream(null);
  };
  useEffect(() => {
    if (Object.keys(usersWhoAnsweredMe).length) {
      Object.keys(usersWhoAnsweredMe).forEach(async socketId => {
        if (usersWhoAnsweredMe[socketId]) {
          await peerConnection.current.setRemoteDescription(
            new RTCSessionDescription(usersWhoAnsweredMe[socketId]),
          );
          if (!isAlreadyCalling) {
            onConnectClick(socketId);
            setIsAlreadyCalling(true);
          }
        }
      });
    }
  }, [usersWhoAnsweredMe]);

  useEffect(() => {
    if (usersWhoCallMe[userWhoICall]) {
      (async () => {
        await peerConnection.current.setRemoteDescription(
          new RTCSessionDescription(usersWhoCallMe[userWhoICall]),
        );
        const answer = await peerConnection.current.createAnswer();
        await peerConnection.current.setLocalDescription(
          new RTCSessionDescription(answer),
        );
        dispatch(answerToUserCallThunk(userWhoICall, answer));
      })();
    }
  }, [usersWhoCallMe]);

  useEffect(() => {
    if (userWhoICall && !usersWhoCallMe[userWhoICall]) {
    }
  }, [userWhoICall]);

  const onConnectClick = async socketId => {
    const offer = await peerConnection.current.createOffer();
    await peerConnection.current.setLocalDescription(
      new RTCSessionDescription(offer),
    );
    dispatch(callUserBySocketIdThunk(socketId, offer));
  };

  const onAnswerClick = async (socketId, offer) => {
    await peerConnection.current.setRemoteDescription(
      new RTCSessionDescription(offer),
    );
    const answer = await peerConnection.current.createAnswer();
    await peerConnection.current.setLocalDescription(
      new RTCSessionDescription(answer),
    );
    dispatch(answerToUserCallThunk(socketId, answer));
  };

  const switchCamera = async () => {
    try {
      let cameraCount = 0;

      const devices = await mediaDevices.enumerateDevices();

      devices.map(device => {
        if (device.kind != 'videoinput') {
          return;
        }

        cameraCount = cameraCount + 1;
      });
      if (cameraCount < 2) {
        return;
      }
      const videoTrack = await localStream.getVideoTracks()[0];
      videoTrack._switchCamera();
    } catch (err) {}
  };

  const handleChangeMicrophone = async () => {
    try {
      localStream.getAudioTracks().forEach(track => {
        track.enabled = !isMicrophone;
      });
      setIsMicrophone(!isMicrophone);
    } catch (err) {}
  };

  if (!isRealTimeVideoChatEnabled) {
    return <View />;
  }

  return (
    <Modal
      // handleModalStatus={handleIsRealtimeVideoChatShow}
      isVisible={isRealtimeVideoChatShow || true}
      style={{width, height, backgroundColor: 'white', margin: 0, padding: 0}}>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <View>
          <View style={{height: height * 0.4}}>
            <View
              style={{
                height: '100%',
                width: width,
                alignSelf: 'center',
                borderWidth: 1,
              }}>
              <TouchableOpacity
                style={styles.cameraButtonState}
                onPress={() => setIsCamera(!isCamera)}>
                <MuIcons
                  name={isCamera ? 'camera' : 'camera-off'}
                  size={40}
                  color="white"
                />
              </TouchableOpacity>
              {isCamera && (
                <TouchableOpacity
                  style={styles.cameraButton}
                  onPress={() => switchCamera()}>
                  <Ionicons name="camera-reverse" size={40} color="white" />
                </TouchableOpacity>
              )}
              {isCamera ? (
                <>
                  {localStream ? (
                    <View
                      style={{
                        height: '100%',
                        width: width,
                        alignSelf: 'center',
                      }}>
                      <RTCView
                        objectFit="cover"
                        streamURL={localStream.toURL()}
                        style={{flex: 1}}
                      />
                    </View>
                  ) : (
                    <Loader />
                  )}
                </>
              ) : (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                  }}>
                  <Text style={{fontSize: 40}}>{profile?.surname}</Text>
                  <Text style={{fontSize: 40}}>{profile?.name}</Text>
                </View>
              )}
            </View>
          </View>
          <View style={{height: height * 0.4}}>
            <>
              {remoteStream ? (
                <View
                  style={{
                    height: '100%',
                    width: width * 8,
                    alignSelf: 'center',
                  }}>
                  <RTCView streamURL={remoteStream.toURL()} style={{flex: 1}} />
                </View>
              ) : (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                  }}>
                  <Text style={{fontSize: 40}}>SUPPORT</Text>
                </View>
              )}
            </>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 20,
            }}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={closeConnection}>
              <Mui name="call-end" size={50} color={COLORS.RED} />
            </TouchableOpacity>
            {!userWhoICall && !usersWhoCallMe[userWhoICall] ? (
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() =>
                  onAnswerClick(
                    Object.keys(usersWhoCallMe)[0],
                    Object.values(usersWhoCallMe)[0],
                  )
                }>
                <Mui name="call" size={50} color={COLORS.GREEN} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleChangeMicrophone}>
                <FontAwesome
                  name={isMicrophone ? 'microphone' : 'microphone-slash'}
                  size={40}
                  color={COLORS.DARK}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default RealtimeVideoChat;

const styles = StyleSheet.create({
  actionButton: {
    backgroundColor: '#e8f4f8',
    borderRadius: 100,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraButton: {
    position: 'absolute',
    zIndex: 10,
    right: 10,
    top: 10,
    backgroundColor: COLORS.DARK,
    borderRadius: 10,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraButtonState: {
    position: 'absolute',
    zIndex: 10,
    left: 10,
    top: 10,
    backgroundColor: COLORS.DARK,
    borderRadius: 10,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
