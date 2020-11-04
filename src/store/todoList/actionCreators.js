import axios from 'axios';
import * as constants from './constants';
import {fromJS} from 'immutable';

export const getList = () => {
  return async (dispatch) => {
    dispatch({type: constants.SET_LOADING, isLoading: true});
    const {data} = await axios.get('/api/todoList');
    try {
      if (data.code === 200) {
        dispatch({
          type: constants.GET_LIST,
          data: data.data,
        });
      }
    } catch (err) {
      console.log(err);
    }
    dispatch({type: constants.SET_LOADING, isLoading: false});
  };
};

export const addItem = (value) => {
  return {
    type: constants.ADD_ITEM,
    value,
  };
};

export const delItem = (id) => {
  return {
    type: constants.DEL_ITEM,
    id,
  };
};

export const flagItem = (id) => {
  return {
    type: constants.FLAG_ITEM,
    id,
  };
};
