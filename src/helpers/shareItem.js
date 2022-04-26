import React from 'react';
import Share from 'react-native-share';
import base64File from 'helpers/base64File';
import {store} from 'app-redux/store/store';
import {setter} from 'app-redux/actions/app/app.actions';
const onShareItem = async item => {
  try {
    const image = item.files.find(file => file.mimetype.includes('image'));
    if (image) {
      store.dispatch(setter({isLoading: true}));
      const base64Image = await base64File(image.fileUrl);

      Share.open({
        title: item.title,
        subject: item.title,
        message: item.description,
        ...(image && {url: base64Image}),
      }).finally(res => {
        store.dispatch(setter({isLoading: false}));
      });
    }
  } catch (error) {
    store.dispatch(
      setter({
        response: {
          isResponse: true,
          message: 'A aparut o eroare!',
          type: false,
        },
      }),
    );
  }
};

export default onShareItem;
