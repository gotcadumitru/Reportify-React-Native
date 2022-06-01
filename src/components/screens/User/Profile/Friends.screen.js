import React from 'react';
import {
  View,
  Text,
  SectionList,
  StyleSheet,
  StatusBar,
  Image,
} from 'react-native';
import Contacts from 'react-native-contacts';
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

  const ContactItem = ({title: contact}) => {
    const phone = contact.phoneNumbers[0].number
      .replace(/\s/g, '')
      .replace(/[()]/g, '');
    const haveApp = checkUserHaveApp(phone);
    return (
      <View style={styles.sectionItem}>
        <View style={{position: 'relative'}}>
          <Image
            style={styles.contactImage}
            source={
              contact.hasThumbnail
                ? {uri: contact.thumbnailPath}
                : require('assets/noimage.png')
            }
          />
          {haveApp && (
            <Image source={require('assets/logo.png')} style={styles.appLogo} />
          )}
        </View>
        <View style={styles.contactInfoContainer}>
          <Text style={styles.title}>{contact.givenName}</Text>
          <Text style={styles.phoneNumber}>{phone}</Text>
        </View>
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
});
