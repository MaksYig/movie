import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import Card from './Card';

const propTypes = {
  title: PropTypes.string,
  content: PropTypes.array,
};

class List extends React.PureComponent {
  render() {
    const {title, content, navigation} = this.props;
    return (
      <View style={styles.list}>
        <View>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View>
          <FlatList
            data={content}
            horizontal={true}
            renderItem={({item}) => (
              <Card item={item} navigation={navigation} />
            )}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  list: {marginTop: 25},
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
    paddingBottom: 15,
  },
});

List.propTypes = propTypes;

export default List;
