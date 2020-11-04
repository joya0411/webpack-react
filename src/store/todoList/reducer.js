import * as constants from './constants';
import {fromJS} from 'immutable';

const defaultState = fromJS({
  list: [],
  loading: false,
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.SET_LOADING:
      return state.set('loading', action.isLoading);
    // 获取列表
    case constants.GET_LIST:
      return state.set('list', fromJS(action.data));
    // 增加
    case constants.ADD_ITEM:
      return state.update('list', ($list) => {
        return $list.push(
          fromJS({
            id: +new Date(),
            data: action.value,
            flag: false,
          })
        );
      });
    // 删除
    case constants.DEL_ITEM:
      return state.update('list', ($list) => {
        let index = $list.findIndex((item) => item.get('id') === action.id);
        return index === -1 ? $list : $list.delete(index);
      });
      return state;
    // checkbox
    case constants.FLAG_ITEM:
      return state.update('list', ($list) => {
        let index = $list.findIndex((item) => item.get('id') === action.id);
        if (index === -1) {
          return $list;
        } else {
          return $list.update(index, ($item) => {
            return $item.set('flag', !$item.get('flag'));
          });
        }
      });
    default:
      return state;
  }
};
