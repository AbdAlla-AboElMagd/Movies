const INIT_VALUES = {
  favMovies: {},
  totalFav: 0,
};

export default function favReducer(state = INIT_VALUES, action) {
  switch (action.type) {
    case "AddFav":
      return {
        ...state,
        favMovies: {
          ...state.favMovies,
          [action.payload.id]: action.payload.data,
        },
        totalFav: state.totalFav + 1,
      };
    case "DelFav":
      const movies = state.favMovies;
      delete movies[action.payload.id];
      return {
        ...state,
        favMovies: movies,
        totalFav: state.totalFav >= 0 ? state.totalFav - 1 : 0,
      };
    default:
      return state;
  }
}
