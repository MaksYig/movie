import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {
  getPopularMovies,
  getUpcomingMovies,
  getPopularTv,
  getFamilyMovies,
  getDocumentaryMovies,
} from '../services/services';
import {SliderBox} from 'react-native-image-slider-box';
import List from '../components/List';
import Error from '../components/Error';

const dimension = Dimensions.get('screen');

const HomePage = ({navigation}) => {
  const [moviesImg, setMoviesImg] = useState('');
  const [popularMovies, setpopularMovies] = useState(null);
  const [popularTv, setpopularTv] = useState(null);
  const [familyMovies, setFamilyMovies] = useState(null);
  const [documentaryMovies, setDocumentaryMovies] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const getData = () => {
    return Promise.all([
      getUpcomingMovies(),
      getPopularMovies(),
      getPopularTv(),
      getFamilyMovies(),
      getDocumentaryMovies(),
    ]);
  };

  useEffect(() => {
    getData()
      .then(
        ([
          upCommingMoviesData,
          popularMoviesData,
          popularTvData,
          familyMoviesData,
          documentaryMoviesData,
        ]) => {
          const moviesImgsArray = [];
          upCommingMoviesData.forEach(movie => {
            moviesImgsArray.push(
              'https://image.tmdb.org/t/p/w500/' + movie.poster_path,
            );
          });
          setMoviesImg(moviesImgsArray);
          setpopularMovies(popularMoviesData);
          setpopularTv(popularTvData);
          setFamilyMovies(familyMoviesData);
          setDocumentaryMovies(documentaryMoviesData);
        },
      )
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoaded(true);
      });
  }, []);
  return (
    <React.Fragment>
      {loaded && !error && (
        <ScrollView>
          {moviesImg && (
            <View style={styles.sliderContainer}>
              <SliderBox
                dotStyle={styles.sliderStyle}
                images={moviesImg}
                autoplay={true}
                circleLoop={true}
                sliderBoxHeight={dimension.height / 1.3}
              />
            </View>
          )}
          {popularMovies && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title="Popular Movies"
                content={popularMovies}
              />
            </View>
          )}
          {popularTv && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title="Popular TV Shows"
                content={popularTv}
              />
            </View>
          )}
          {familyMovies && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title="Family Movies"
                content={familyMovies}
              />
            </View>
          )}
          {documentaryMovies && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title="Documentary Movies"
                content={documentaryMovies}
              />
            </View>
          )}
        </ScrollView>
      )}
      {!loaded && <ActivityIndicator size="large" />}
      {error && <Error />}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderStyle: {
    height: 0,
  },
  carousel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomePage;
