import appConstants from '../constants';
import initialState from '../initialState';

const { SET_SEARCH_ITEM, SET_OPEN_DIALOG } = appConstants;

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_ITEM:
      return {
        ...state,
        searchPlace: action.item,
      };

    case SET_OPEN_DIALOG:
      return {
        ...state,
        open: action.item,
      };

    default:
      return state;
  }
};

export default searchReducer;
