import { atom, selector } from 'recoil';
import { Dictionary } from '../interfaces'

export const store = atom({
  key: 'userState',
  default: {
    isModalVisible: false,
    isAuth: false,
    userData: {} as Dictionary<any>
  }
})

export const favoriteMoviesState = selector({
  key: 'favoriteState', // unique ID (with respect to other atoms/selectors)
  get: ({get}) => {
    const state = get(store);

    return state.userData?.movies?.filter((el: any) => el.isFavorite) || [];
  },
});

export const MoviesState = selector({
  key: 'moviesState', // unique ID (with respect to other atoms/selectors)
  get: ({get}) => {
    const state = get(store);

    return state.userData?.movies || [];
  },
});