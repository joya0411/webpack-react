module.exports = {
    "presets": [
      [
        "@babel/preset-env",
{
          "useBuiltIns": "usage",
          "corejs": "3.4.5",
        }
      ],
      "@babel/preset-react"
    ],
    "plugins": [
      "react-hot-loader/babel",
      ["import", {
        "libraryName": "antd",
        "style": true
      }],
      "@babel/plugin-proposal-export-default-from",  // 支持export default from './Login'写法
      "@babel/plugin-syntax-dynamic-import", // 异步代码分割
      ["@babel/plugin-proposal-decorators", {"legacy": true}],  // 装饰器@
      ["@babel/plugin-proposal-class-properties", { "loose": true }] // static
    ]
  }
