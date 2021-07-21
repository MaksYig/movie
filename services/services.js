import axios from 'axios';

const URL = 'https://api.themoviedb.org/3/';
const APIKey = 'api_key=a1efeee901bc9b3852240e880c1b9181';

// get popular movies
export const getPopularMovies = async () => {
  const resp = await axios.get(`${URL}movie/popular?${APIKey}`);
  return resp.data.results;
};

// get upcoming movies
export const getUpcomingMovies = async () => {
  const resp = await axios.get(`${URL}movie/upcoming?${APIKey}`);
  return resp.data.results;
};

// get popular TV
export const getPopularTv = async () => {
  const resp = await axios.get(`${URL}tv/popular?${APIKey}`);
  return resp.data.results;
};

// get family movies
export const getFamilyMovies = async () => {
  const resp = await axios.get(
    `${URL}discover/movie?${APIKey}&with_genres=10751`,
  );
  return resp.data.results;
};
// get documentary movies
export const getDocumentaryMovies = async () => {
  const resp = await axios.get(`${URL}discover/movie?${APIKey}&with_genres=99`);
  return resp.data.results;
};

// get movie
export const getMovie = async id => {
  const resp = await axios.get(`${URL}movie/${id}?${APIKey}`);
  return resp.data;
};

// SEARCH
// search move or TV
export const searchMoveTv = async (query, type) => {
  const resp = await axios.get(`${URL}search/${type}?${APIKey}&query=${query}`);
  return resp.data.results;
};
