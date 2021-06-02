import appConstants from "../constants";

const { SET_SEARCH_ITEM } = appConstants;

const setSearchItem = (item) => ({ type: SET_SEARCH_ITEM, item });

export { setSearchItem };
