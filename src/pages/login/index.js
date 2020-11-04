import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'cookies-js';
import classnames from 'classnames';
import {Button, DatePicker, Pagination} from 'antd';
import {t} from 'language';
import bigSuc from 'static/imgs/bigSuc.png';
import airplane from 'static/imgs/airplane.svg';
import styles from './index.scss';
import axios from 'axios';

const Login = () => {
  return (
    <div>
      <img src={bigSuc} />
      <img src={airplane} />
      <p className={styles.test}>{t('login')}</p>
      <div className={styles.testLoading}></div>
      <DatePicker />
      <Pagination />
    </div>
  );
};

export default Login;
