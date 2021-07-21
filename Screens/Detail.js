import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  ActivityIndicator,
  Modal,
  Pressable,
} from 'react-native';
import PlayBtn from '../components/PlayBtn';
import StarRating from 'react-native-star-rating';
import {getMovie} from '../services/services';
import dateFormat from 'dateformat';
import Video from '../components/Video';
const placeholderImg = require('../assets/img/placeholder.png');
const dimension = Dimensions.get('screen');

const Detail = ({route, navigation}) => {
  const movieId = route.params.movieId;
  const [movieDetail, setMovieDetail] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getMovie(movieId).then(movieData => {
      setMovieDetail(movieData);
      setLoaded(true);
    });
  }, [movieId]);

  const videoShown = () => {
    setModalVisible(!modalVisible);
  };
  return (
    <React.Fragment>
      {loaded && (
        <View>
          <ScrollView>
            <Image
              style={styles.image}
              resizeMode="cover"
              source={
                movieDetail.poster_path
                  ? {
                      uri:
                        'https://image.tmdb.org/t/p/w500/' +
                        movieDetail.poster_path,
                    }
                  : placeholderImg
              }
            />
            <View style={styles.container}>
              <View style={styles.palayBtn}>
                <PlayBtn handlePress={videoShown} />
              </View>
              <Text style={styles.movieTitle}>{movieDetail.title}</Text>
              {movieDetail.genres && (
                <View style={styles.genreContainer}>
                  {movieDetail.genres.map(item => (
                    <Text key={item.id} style={styles.genreText}>
                      {item.name}
                    </Text>
                  ))}
                </View>
              )}
              <StarRating
                maxStars={5}
                rating={movieDetail.vote_average / 2}
                fullStarColor="gold"
                starSize={30}
                disabled={true}
              />
              <Text style={styles.overview}>{movieDetail.overview}</Text>
              <Text style={styles.release}>
                {'Realise date: ' +
                  dateFormat(movieDetail.release_date, 'mmmm dd,yyyy')}
              </Text>
            </View>
          </ScrollView>
          <Modal
            supportedOrientations={['portrait', 'landscape']}
            animationType="slide"
            visible={modalVisible}>
            <View style={styles.videoModal}>
              <Video onClose={videoShown} />
            </View>
          </Modal>
        </View>
      )}
      {!loaded && <ActivityIndicator size="large" />}
    </React.Fragment>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: dimension.height / 2.5,
  },
  movieTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  genreContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  genreText: {
    marginLeft: 10,
    fontWeight: 'bold',
  },
  overview: {padding: 15},
  release: {fontWeight: 'bold'},
  palayBtn: {
    position: 'absolute',
    top: -35,
    right: 20,
  },
  videoModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Detail;
