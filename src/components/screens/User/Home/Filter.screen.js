import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useFormik} from 'formik';
import {Slider} from '@miblanchard/react-native-slider';
import DatePicker from 'utils/DatePicker';
import {COLORS, SCREEN_SIZE, APP_STYLES} from 'theme/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Mui from 'react-native-vector-icons/MaterialCommunityIcons';
import dayjs from 'dayjs';
import {sortByDate, sortByLength} from 'helpers/sort';
import {getDistance} from 'geolib';

export default function FilterScreen(props) {
  const {navigation, filters, setter, posts} = props;
  const {handleSubmit, handleChange, values, setFieldValue} = useFormik({
    initialValues: {
      ...filters,
    },
    onSubmit: applyFilters,
  });

  function filteredByType(type) {
    switch (type) {
      case 'popular':
        return posts.sort((a, b) => sortByLength(a, b, 'likes'));
      case 'date':
        return posts.sort(sortByDate);
      case 'distance':
        return posts.sort((a, b) => sortByLength(a, b, 'distance'));
      default:
        return posts;
    }
  }

  function applyFilters(filters) {
    let filteredPosts = filteredByType(filters.type);
    console.log(filteredPosts);
    // setter({filters});
    // navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.buttonGroupContainer}>
          <TouchableOpacity
            style={[
              styles.buttonGroupElement,
              {
                borderRightWidth: 1,
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
                ...(values.type === 'popular' && {
                  backgroundColor: COLORS.LIGHT_BLUE,
                }),
              },
            ]}
            onPress={() => setFieldValue('type', 'popular')}>
            <Text
              style={[
                styles.buttonText,
                {
                  ...(values.type === 'popular' && {
                    color: 'white',
                  }),
                },
              ]}>
              Populare
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.buttonGroupElement,
              {
                borderRightWidth: 1,
                borderLeftWidth: 1,
                ...(values.type === 'date' && {
                  backgroundColor: COLORS.LIGHT_BLUE,
                }),
              },
            ]}
            onPress={() => setFieldValue('type', 'date')}>
            <Text
              style={[
                styles.buttonText,
                {
                  ...(values.type === 'date' && {
                    color: 'white',
                  }),
                },
              ]}>
              Dată
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.buttonGroupElement,
              {
                borderLeftWidth: 1,
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
                ...(values.type === 'distance' && {
                  backgroundColor: COLORS.LIGHT_BLUE,
                }),
              },
            ]}
            onPress={() => setFieldValue('type', 'distance')}>
            <Text
              style={[
                styles.buttonText,
                {
                  ...(values.type === 'distance' && {
                    color: 'white',
                  }),
                },
              ]}>
              Distanță
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{marginTop: 20}}>
          <DatePicker
            isModal={true}
            value={values.startDate}
            isVisible={values.isStartDate}
            toggleVisibility={value => setFieldValue('isStartDate', value)}
            title={'Data de început'}
            getValue={date => setFieldValue('startDate', date)}
            maxDate={new Date()}
          />
        </View>
        <View style={{marginTop: 20}}>
          <DatePicker
            isModal={true}
            value={values.endDate}
            isVisible={values.isEndDate}
            toggleVisibility={value => setFieldValue('isEndDate', value)}
            title={'Data de sfârșit'}
            getValue={date => setFieldValue('endDate', date)}
            maxDate={new Date()}
          />
        </View>
        <View style={styles.sliderContainer}>
          <Text style={[styles.text, {marginBottom: 30}]}>
            Distanța: {values.distance[0]} km - {values.distance[1]} km
          </Text>
          <Slider
            value={values.distance}
            onValueChange={value => setFieldValue('distance', value)}
            animationType="timing"
            maximumValue={100}
            minimumValue={1}
            step={1}
            maximumTrackTintColor={COLORS.MEDIUM_GRAY}
            minimumTrackTintColor={COLORS.RED}
            trackMarks={[0, 100]}
            animateTransitions
            trackStyle={{borderRadius: 10, height: 10}}
            thumbStyle={{height: 26, width: 26, borderRadius: 20}}
          />
        </View>
      </View>
      <View style={{marginBottom: 50}}>
        <TouchableOpacity style={styles.applyButton} onPress={handleSubmit}>
          <Text style={styles.applyButtonText}>Aplică filtrele</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  buttonGroupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 30,
  },
  buttonGroupElement: {
    borderColor: COLORS.LIGHT_BLUE,
    borderWidth: 2,
    width: 100,
    padding: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: COLORS.LIGHT_BLUE,
    fontSize: 16,
    fontWeight: '500',
  },
  sliderContainer: {
    width: SCREEN_SIZE.WIDTH * 0.8,
    alignSelf: 'center',
    marginTop: 30,
  },
  text: {
    marginLeft: 10,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  applyButton: {
    alignItems: 'center',
    alignSelf: 'center',
    width: SCREEN_SIZE.WIDTH * 0.8,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: COLORS.LIGHT_BLUE,
  },
  applyButtonText: {
    fontWeight: '600',
    fontSize: 16,
    color: 'white',
  },
});
