import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import {actionCreators as todoListActionCreators} from 'rstore/todoList';
import TextInput from './textInput';
import List from './list';
import styles from './index.scss';

function TodoList(props) {
  const list = useSelector((state) => state.getIn(['todoList', 'list']));
  const loading = useSelector((state) => state.getIn(['todoList', 'loading']));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(todoListActionCreators.getList());
  }, []);

  const changeFlag = (id) => {
    dispatch(todoListActionCreators.flagItem(id));
  };

  const delItem = (id) => {
    dispatch(todoListActionCreators.delItem(id));
  };

  const addItem = (value) => {
    dispatch(todoListActionCreators.addItem(value));
  };

  return (
    <>
      <h1>TodoList</h1>
      <br />
      <TextInput addItem={addItem} />
      <br />
      {loading ? (
        <div className={styles.loading}></div>
      ) : (
        <List data={list} changeFlag={changeFlag} delItem={delItem} />
      )}
    </>
  );
}

export default TodoList;
