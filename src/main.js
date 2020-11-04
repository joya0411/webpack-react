import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from 'app/appRouter';
import 'static/css/global.scss';
import '../mock/index';

ReactDOM.render(<AppRouter />, document.getElementById('root'));
