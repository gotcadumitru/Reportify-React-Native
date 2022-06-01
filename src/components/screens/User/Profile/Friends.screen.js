import React from 'react';
import {
  View,
  Text,
  SectionList,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';
import Contacts from 'react-native-contacts';
import SendSMS from 'react-native-sms';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';

import {COLORS, SCREEN_SIZE, APP_STYLES} from 'theme/theme';

export default function Friends(props) {
  const {
    setter,
    contacts,
    mapContacts,
    getAllUsersLocation,
    profile,
    allLocationUsers,
  } = props;

  React.useEffect(() => {
    setter({isLoading: true});
    getAllUsersLocation({oras: profile.oras, localitate: profile.localitate});

    Contacts.getAll()
      .then(contacts => {
        const filteredContacts = contacts.filter(
          contact =>
            contact?.phoneNumbers[0]?.number?.includes('+40') &&
            contact?.givenName,
        );
        const map = new Map();

        filteredContacts.forEach(contact => {
          if (map.has(contact?.givenName[0])) {
            const prevData = map.get(contact?.givenName[0]);
            map.set(contact?.givenName[0], [...prevData, contact]);
          } else {
            map.set(contact?.givenName[0], [contact]);
          }
        });
        const jsonContacts = JSON.parse(
          JSON.stringify(Object.fromEntries(map)),
        );
        const arrayContacts = [];
        Object.keys(jsonContacts)
          .sort()
          .map((key, index) => {
            arrayContacts.push({title: key, data: jsonContacts[key]});
          });
        setter({mapContacts: arrayContacts});
      })
      .finally(() => {
        setter({isLoading: false});
      });
  }, []);

  function checkUserHaveApp(phone) {
    return JSON.stringify(allLocationUsers).includes(phone);
  }
  const getAvatarInitials = textString => {
    if (!textString) return '';
    const text = textString.trim();
    const textSplit = text.split(' ');

    if (textSplit.length <= 1) return text.charAt(0);

    const initials =
      textSplit[0].charAt(0) + textSplit[textSplit.length - 1].charAt(0);

    return initials;
  };

  function sendSMSmessage(number) {
    const image = require('assets/logo.png');
    const metadata = resolveAssetSource(image);
    const url = metadata.uri;

    const attachment = {
      url: url,
      iosType: 'public.jpeg',
      iosFilename: 'Image.jpeg',
      androidType: 'image/*',
    };

    SendSMS.send(
      {
        body: 'Participa la viata comunitatii instaland aplicatia Reportify!',
        recipients: [number],
        successTypes: ['sent', 'queued'],
        attachment: attachment,
      },
      (completed, cancelled, error) => {
        console.log('SMS status: ' + completed + cancelled + error);
      },
    );
  }

  const renderInitials = initials => {
    return (
      <View style={styles.initialsView}>
        <Text
          adjustsFontSizeToFit
          numberOfLines={1}
          minimumFontScale={0.01}
          style={[{fontSize: 25}]}>
          {initials}
        </Text>
      </View>
    );
  };

  const ContactItem = ({title: contact}) => {
    const phone = contact.phoneNumbers[0].number
      .replace(/\s/g, '')
      .replace(/[()]/g, '');
    const haveApp = checkUserHaveApp(phone);
    return (
      <View style={styles.sectionItem}>
        <View style={{position: 'relative'}}>
          {contact.hasThumbnail ? (
            <Image
              style={styles.contactImage}
              source={{uri: contact.thumbnailPath}}
            />
          ) : (
            renderInitials(getAvatarInitials(contact.givenName))
          )}
          {haveApp && (
            <Image source={require('assets/logo.png')} style={styles.appLogo} />
          )}
        </View>
        <View style={styles.contactInfoContainer}>
          <Text style={styles.title}>{contact.givenName}</Text>
          <Text style={styles.phoneNumber}>{phone}</Text>
        </View>
        {!haveApp && (
          <TouchableOpacity
            style={styles.inviteButton}
            onPress={() => {
              sendSMSmessage(phone);
            }}>
            <Text style={styles.inviteText}>Invite</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <SectionList
        stickySectionHeadersEnabled={false}
        sections={mapContacts}
        keyExtractor={(item, index) => item + index}
        renderItem={({item}) => <ContactItem title={item} />}
        renderSectionHeader={({section: {title}}) => (
          <>
            <Text style={styles.sectionTitle}>{title}</Text>
            <View style={styles.listHeaderView} />
          </>
        )}
        renderSectionFooter={() => <View style={styles.listFooterView} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',
    marginVertical: 20,
  },
  sectionTitle: {
    color: COLORS.GRAY,
    fontSize: 20,
    marginVertical: 15,
  },
  sectionItem: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
  },
  contactImage: {
    height: 50,
    width: 50,
    borderRadius: 100,
  },
  contactInfoContainer: {
    justifyContent: 'space-around',
    marginLeft: 20,
  },
  phoneNumber: {
    color: COLORS.GRAY,
    fontSize: 14,
  },
  listHeaderView: {
    backgroundColor: 'white',
    width: '100%',
    height: 10,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  listFooterView: {
    backgroundColor: 'white',
    width: '100%',
    height: 10,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  appLogo: {
    position: 'absolute',
    right: -5,
    bottom: -10,
    borderRadius: 100,
    width: 25,
    height: 25,
    backgroundColor: 'white',
  },
  inviteButton: {
    backgroundColor: COLORS.DARK_BLUE,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 10,
    bottom: 0,
    top: 0,
    paddingHorizontal: 20,
    height: 30,
    borderRadius: 20,
  },
  inviteText: {textAlign: 'center', color: 'white'},
  initialsView: {
    width: 50,
    height: 50,
    borderRadius: 100,
    backgroundColor: COLORS.INPUT,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
