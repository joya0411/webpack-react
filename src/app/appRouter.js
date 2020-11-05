import React, {useState, Suspense, useEffect} from 'react';
import {Provider} from 'react-redux';
import {hot} from 'react-hot-loader/root';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import {ConfigProvider, Button} from 'antd';
import Cookies from 'cookies-js';
import {LANG} from 'app/cookieTypes';
import store from 'rstore/index';
import enUS from 'language/en';
import zhCN from 'language/zh';

// 页面
const Login = React.lazy(() => import('pages/login'));
const TodoList = React.lazy(() => import('pages/todoList'));
const NotFound = React.lazy(() => import('pages/noFound'));
import Loading from 'components/Loading';

const AppRouter = (props) => {
  const defaultLang = Cookies.get(LANG) || navigator.language;
  const [cookiesLang, setCookiesLang] = useState(defaultLang);
  const [curLangMsg, setCurLangMsg] = useState(
    defaultLang === 'en-US' ? enUS : zhCN
  );

  useEffect(() => {
    Cookies.set(LANG, defaultLang);
  }, []);

  const changeCookieLang = () => {
    const lang = cookiesLang === 'en-US' ? 'zh-CN' : 'en-US';
    Cookies.set(LANG, lang);
    setCookiesLang(lang);
    setCurLangMsg(lang === 'en-US' ? enUS : zhCN);
  };

  return (
    <Provider store={store}>
      <ConfigProvider locale={curLangMsg}>
        <Router key={curLangMsg.locale}>
          <header>
            <span style={{paddingRight: 10}}>当前语言：{cookiesLang}</span>
            <Button type='primary' onClick={changeCookieLang}>
              改变语言
            </Button>
            <div>
              <Link to='/'>Home</Link>
              <span style={{paddingLeft: 10, paddingRight: 10}}></span>
              <Link to='/todoList'>todoList</Link>
            </div>
          </header>
          <hr />
          <Suspense fallback={Loading}>
            <Switch>
              <Route path={['/', '/index', '/home']} exact component={Login} />
              <Route path='/todoList' component={TodoList} />
              <Route path='*' component={NoFound} />
            </Switch>
          </Suspense>
        </Router>
      </ConfigProvider>
    </Provider>
  );
};

export default hot(AppRouter);
