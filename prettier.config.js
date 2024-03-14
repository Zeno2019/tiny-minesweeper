// prettier.config.js
/** @type {import("prettier").Config} */
export default {
  printWidth: 200, // 行宽
  semi: true, // 分号
  singleQuote: true, // 使用单引号
  useTabs: false, // 使用 tab 缩进
  tabWidth: 2, // 缩进
  bracketSameLine: true,
  bracketSpacing: true, // 在对象，数组括号与文字之间加空格 "{ foo: bar }"
  trailingComma: 'es5', // 后置逗号，多行对象、数组在最后一行增加逗号
  proseWrap: 'preserve', // 换行方式 默认值。因为使用了一些折行敏感型的渲染器（如GitHub comment>）而按照markdown文本样式进行折行
  endOfLine: 'auto', // 结尾是 \n \r \n\r auto
  jsxSingleQuote: true, // 在jsx中使用单引号代替双引号
  stylelintIntegration: false, // 不让prettier使用stylelint的代码格式进行校验
  htmlWhitespaceSensitivity: 'ignore',
  eslintIntegration: false, // 不让prettier使用eslint的代码格式进行校验
  tslintIntegration: false, // 不让prettier使用tslint的代码格式进行校验
  plugins: [
    "prettier-plugin-tailwindcss",
    "prettier-plugin-classnames"
  ],
};
