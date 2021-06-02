import appConstants from '../constants';

const { SET_SEARCH_ITEM, SET_OPEN_DIALOG } = appConstants;

const setSearchItem = (item) => ({ type: SET_SEARCH_ITEM, item });

const openDialog = (item) => ({ type: SET_OPEN_DIALOG, item });

export { setSearchItem, openDialog };
