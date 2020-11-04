import React, {useEffect} from 'react';
import {isArray} from 'static/js/utils';

const NotFound = () => {
  useEffect(() => {
    let a = null;
    if (isArray([1, 2, 3])) {
      a = [11, 22, 33];
      console.log(a);
    }
  }, []);

  return <div>NoFound</div>;
};

export default NotFound;
