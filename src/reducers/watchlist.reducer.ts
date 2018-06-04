import { actions, actionTypes } from '../actions/watchlist.actions';
import * as m from '../models';

export interface IState {
  watchList: m.IWatchList[];
  loading: boolean;
}

const initialState = {
  watchList: [],
  loading: false,
};

export const reducer = (state = initialState, {type, payload}: actions) => {

  switch (type) {
    case actionTypes.REMOVE_FROM_WATCHLIST:
    case actionTypes.ADD_TO_WATCHLIST: {
      return {...state, loading: true}
    }

    case actionTypes.ADD_TO_WATCHLIST_SUCCESS: {
      const watchListItem = payload as m.IWatchList;
      const exists = state.watchList.some((item: m.IWatchList) => watchListItem.id === item.id);

      if (exists) {
        return {...state, loading: false};
      } else {
        return {
          ...state,
          loading: false,
          watchList: [
            ...state.watchList,
            watchListItem,
          ] };
      }
    }

    case actionTypes.REMOVE_FROM_WATCHLIST_SUCCESS: {
      return {
        ...state,
        loading: false,
        watchList: state.watchList.filter((item: m.IWatchList) => item.id !== payload),
      }
    }

    default:
      return state;
  };
}

export const getIsLoading = (state: IState) => state.loading;
