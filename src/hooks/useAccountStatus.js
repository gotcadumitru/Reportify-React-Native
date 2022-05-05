import {View, Text} from 'react-native';
import React from 'react';
import {AccountStatus} from 'constants/data/account.status';
import {useSelector} from 'react-redux';

export default function useAccountStatus() {
  const appReducer = useSelector(state => state.appReducer);
  const {profile} = appReducer;
  const isAccountNotConfirmed =
    profile.accountStatus !== AccountStatus.CONFIRMED;
  return isAccountNotConfirmed;
}
