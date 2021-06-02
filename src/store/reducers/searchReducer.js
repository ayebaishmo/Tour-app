import appConstants from "../constants";
import initialState from "../initialState";

const { SET_SEARCH_ITEM } = appConstants;

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_ITEM:
      return {
        ...state,
        searchPlace: action.item,
      };

    default:
      return state;
  }
};

export default searchReducer;
