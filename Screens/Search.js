import React, {useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Card from '../components/Card';
import {searchMoveTv} from '../services/services';
import Icon from 'react-native-vector-icons/FontAwesome';
import Error from '../components/Error';

const Search = ({navigation}) => {
  const [text, onChangeText] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [error, setError] = useState(false);
  console.log(searchResults);
  const onSubmit = query => {
    Promise.all([searchMoveTv(query, 'movie'), searchMoveTv(query, 'tv')])
      .then(([movie, tv]) => {
        const data = [...movie, ...tv];
        setSearchResults(data);
      })
      .catch(() => {
        setError(true);
      });
  };
  return (
    <React.Fragment>
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.form}>
            <TextInput
              onChangeText={onChangeText}
              value={text}
              placeholder="Search movie or TV show"
              style={styles.input}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              onSubmit(text);
            }}>
            <Icon name="search" size={25} />
          </TouchableOpacity>
        </View>
        <View style={styles.searchItems}>
          {/* Search Items results */}
          {searchResults && searchResults.length > 0 && (
            <FlatList
              numColumns={3}
              data={searchResults}
              renderItem={({item}) => (
                <Card navigation={navigation} item={item} />
              )}
              keyExtractor={item => item.id}
            />
          )}
          {/* When search results but not resultat */}
          {searchResults && searchResults.length == 0 && (
            <View style={[styles.empty, {paddingTop: 20}]}>
              <Text>No results maching</Text>
              <Text>Try diferent keyword!</Text>
            </View>
          )}
          {/* No search results at all */}
          {!searchResults && (
            <View style={[styles.empty, {paddingTop: 20}]}>
              <Text>Type something to start search...</Text>
            </View>
          )}
          {/* Error */}
          {error && <Error />}
        </View>
      </SafeAreaView>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: 60,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    borderRadius: 15,
    height: 50,
    padding: 8,
    borderWidth: 0.5,
  },
  form: {
    flexBasis: 'auto',
    flexGrow: 1,
    paddingRight: 8,
  },
  empty: {
    padding: 20,
  },
});

export default Search;
