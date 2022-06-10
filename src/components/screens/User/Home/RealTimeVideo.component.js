import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, Text, useWindowDimensions} from 'react-native';
import {IoMdCall} from 'react-icons/io';
import Mui from 'react-native-vector-icons/MaterialIcons';

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
} from 'app-redux/thunk/user.action';

const RealtimeVideoChat = ({changeStatus, ...props}) => {
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
  console.log(Object.keys(usersWhoCallMe));
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
    streamMedia.current
      .getTracks()
      .forEach(track =>
        peerConnection.current.addTrack(track, streamMedia.current),
      );
    if (userWhoICall) {
      onConnectClick(userWhoICall);
    }
  };
  const closeConnection = () => {
    peerConnection.current.close();
    peerConnection.current = null;
    // streamMedia.current.getTracks().forEach(function (track) {
    //   track.stop();
    // });
    setIsAlreadyCalling(false);
    dispatch(setUsersWhoCallMeAC(undefined, userWhoICall));
    dispatch(setUsersWhoAnsweredMeAC(userWhoICall, undefined));
    dispatch(setUserWhoICallAC(null));
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

  if (!isRealTimeVideoChatEnabled) {
    return <View />;
  }

  return (
    <Modal
      // handleModalStatus={handleIsRealtimeVideoChatShow}
      isVisible={isRealtimeVideoChatShow || true}
      style={{width, height, backgroundColor: 'white', margin: 0, padding: 0}}>
      <Text>Video chat:</Text>
      <View>
        <View>
          <View>
            <View>
              <Text>Primul </Text>
              <>
                {localStream ? (
                  // <Video autoPlay source={{uri: remoteStreamRef}} />
                  <View style={{height: 300, width: 300}}>
                    <RTCView
                      streamURL={localStream.toURL()}
                      style={{flex: 1}}
                    />
                  </View>
                ) : (
                  <Text>Loadinf</Text>
                )}
              </>
            </View>
          </View>
          <View>
            <View>
              <Text>Al doilea</Text>
              <>
                {remoteStream ? (
                  // <Video autoPlay source={{uri: remoteStreamRef}} />
                  <View style={{height: 300, width: 300}}>
                    <RTCView
                      streamURL={remoteStream.toURL()}
                      style={{flex: 1}}
                    />
                  </View>
                ) : (
                  <Text>Loadinf</Text>
                )}
              </>
            </View>
          </View>
          <>
            {!userWhoICall && !usersWhoCallMe[userWhoICall] && (
              <Mui
                name="call"
                size={50}
                onPress={() =>
                  onAnswerClick(
                    Object.keys(usersWhoCallMe)[0],
                    Object.values(usersWhoCallMe)[0],
                  )
                }
              />
            )}
            <Mui name="call-end" size={50} onPress={closeConnection} />
          </>
        </View>
      </View>
    </Modal>
  );
};

export default RealtimeVideoChat;
