export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';
export const SET_LOGGEDIN = 'SET_LOGGEDIN_USER';

export function setMovies(value) {
  return { type: SET_MOVIES, value };
}

export function setFilter(value) {
  return { type: SET_FILTER, value };
}

export function setLoggedinUser(value){
  return {type: SET_LOGGEDIN, value}
}
