import {combineReducers} from 'redux-immutable';
import {reducer as todoListReducer} from './todoList';

export default combineReducers({
  todoList: todoListReducer,
});
