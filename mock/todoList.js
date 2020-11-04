import Mock from 'mockjs'

export default {
  url: '/api/todoList',
  method: 'get',
  timeout: 1000,
  data: {
    code: 200,
    data: [{
      id: 0,
      data: 'a',
      flag: false,
    },{
      id: 1,
      data: 'b',
      flag: false,
    },{
      id: 2,
      data: 'c',
      flag: false,
    }]
  }
}

