import React from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class PlayBtn extends React.PureComponent {
  render() {
    const {handlePress} = this.props;
    return (
      <Pressable onPress={() => handlePress()} style={styles.btn}>
        <Icon name="play" size={30} color="#fff" />
      </Pressable>
    );
  }
}
const styles = StyleSheet.create({
  btn: {
    alignItems: 'center',
    borderRadius: 50,
    width: 50,
    padding: 10,
    backgroundColor: '#4481FC',
  },
});
export default PlayBtn;
