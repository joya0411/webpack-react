import Mock from 'mockjs'
import todoList from './todoList'
const allMockData = {
  todoList,
}

for (let [key, value] of Object.entries(allMockData)) {
  const {url, method, data, timeout} = value;
  Mock.mock(url, method, data)
  Mock.setup({
    timeout: timeout || '10-100'
  })
}


