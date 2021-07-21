import React from 'react';
import {
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';

const propTypes = {main: PropTypes.bool};

const defaultProps = {
  main: false,
};

class Navigation extends React.PureComponent {
  render() {
    const {navigation, main} = this.props;
    return (
      <SafeAreaView>
        {main ? (
          <View style={styles.mainNav}>
            <Image
              style={styles.logo}
              source={require('../assets/img/placeholder.png')}
            />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Search');
              }}>
              <Icon name="search" size={25} color={'#fff'} />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{padding: 10}}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Icon
                type="FontAwesome"
                name="backward"
                size={25}
                color={'#fff'}
              />
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  logo: {width: 50, height: 50},
  mainNav: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
});

Navigation.propTypes = propTypes;
Navigation.defaultProps = defaultProps;

export default Navigation;
