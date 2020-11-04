// 是否[]
export function isArray(data) {
  if (!data) return false;
  return !Array.isArray(data)
    ? Array.isArray(data)
    : Object.prototype.toString.call(data) === '[object Array]';
}

// 是否空数组
export function isEmptyArray(data) {
  return isArray(data) && data.length === 0;
}

// 是否{}
export function isObj(data) {
  if (!data) return false;
  return Object.prototype.toString.call(data) === '[object Object]';
}

// 是否空对象
export function isEmptyObj(data) {
  return isObj(data) && Object.keys(data).length === 0;
}

// 是否函数
export function isFun(data) {
  if (!data) return false;
  return Object.prototype.toString.call(data) === '[object Function]';
}

// 是否日期
export function isDate(data) {
  if (!data) return false;
  return Object.prototype.toString.call(data) === '[object Date]';
}

// 是否正则
export function isRegExp(data) {
  if (!data) return false;
  return Object.prototype.toString.call(data) === '[object RegExp]';
}

// null
export function isNil(data) {
  return data === null;
}

// 获取类型
export function getType(data) {
  if (typeof data !== 'object') {
    return typeof data;
  } else {
    return Object.prototype.toString
      .call(data)
      .replace(
        /\[object ([a-zA-Z]+)]$/,
        ($0, $1) => $1.charAt(0).toLowerCase() + $1.substr(1)
      );
  }
}

// 深拷贝
export function deepClone(data) {
  let result = null;
  if (typeof data === 'object' && data !== null) {
    result = data.constructor === Array ? [] : {};
    for (let v in data) {
      if (data.hasOwnProperty(v)) {
        result[v] = deepClone(data[v]);
      }
    }
  } else {
    result = data;
  }
  return result;
}

// 防抖(比如：input)
export function debounce(fn, delay) {
  let timer = null;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    // args[0].persist()
    timer = setTimeout(() => {
      fn.apply(this, args);
      timer = null;
    }, delay);
  };
}

// 节流（比如：resize、drop）
export function throttle(fn, delay) {
  let last;
  let timer = null;
  return function (...args) {
    let now = +new Date();
    if (!last || now >= last + delay) {
      last = now;
      fn.apply(this, args);
    } else {
      clearTimeout(timer);
      timer = setTimeout(() => {
        last = now;
        fn.apply(this, args);
      }, delay);
    }
  };
}

// 判断两个对象是否相等
export function isEqual(obj1, obj2) {
  function isObject(obj) {
    return typeof obj === 'object' && obj !== null;
  }
  if (!isObject(obj1) && !isObject(obj2)) {
    // 值类型判断
    return obj1 === obj2;
  }
  if (obj1 === obj2) {
    // 传同一个对象
    return true;
  }
  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    // obj1与obj2的个数不一样
    return false;
  }

  for (let key in obj1) {
    const res = isEqual(obj1[key], obj2[key]);
    if (!res) {
      return false;
    }
  }
  return true;
}

// export function query(name) {
//   const search = location.search.substr(1)
//   const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i')
//   const res = search.match(reg)
//   if (res === null) {
//     return null
//   }
//   return res[2]
// }

// 获取query的值
export function query(name) {
  const search = location.search;
  return new URLSearchParams(search).get(name);
}

// 将url参数解析为js对象
// export function queryToObj() {
//   const res = {}
//   const search = location.search.substr(1)
//   search.split('&').forEach(paramStr => {
//     const [key, value] = paramStr.split('=')
//     if (key!=='') {
//       res[key] = value
//     }
//   })
//   return res;
// }

export function queryToObj() {
  const res = {};
  const pList = new URLSearchParams(location.search);
  pList.forEach((value, key) => {
    res[key] = value;
  });
  return res;
}

// 扁平数组
export function flat(arr) {
  // 验证数组中还有没有深层数组
  const isDeep = arr.some((item) => item instanceof Array);
  if (!isDeep) {
    return arr;
  }

  const res = Array.prototype.concat.apply([], arr);
  return flat(res);
}

// export function unique(arr) {
//   const res = []
//   arr.forEach(item => {
//     if (res.indexOf(item) < 0) {
//       res.push(item)
//     }
//   })
//   return res
// }

// 数组去重
export function unique(arr) {
  return [...new Set(arr)];
}

export const regAll = {
  mobile: /^[1]([3-9])[0-9]{9}$/, // 手机号
  phone: /^[\\~\/!@#$%^&*()_+{}:"<>?`=;',.\-\d]+$/, // 电话：符号+数字（排除中文、字母）
  email: /^[A-Za-z0-9]+([_\.\-][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/,
  passportNo: /^[a-zA-Z\d]+$/, // 护照号码|证件号码：字母+数字
  password: /^.{6,16}$/, //6到16位
};
