module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      viewportWidth: 375, // 视窗宽度，对应的是我们设计稿的宽度
      viewportHeight: 667,// 视窗高度，对应的是我们设计稿的高度
      unitPrecision: 5, // 指定px转换为视窗单位的小数位数(很多无法整除)
      viewportUnit: 'vw',// 指定转换成的视窗单位，建议使用vw
      selectorBlackList: ['ignore', 'tab-bar', 'tab-bar-item'], // 配置不需要转换的类
      minPixelValue: 1, // 最小转换单位，小于 1px 不转换
      mediaQuery: false, // 允许在媒体查询中转换 px
      exclude:['TabBarItem.vue'],
    }
  }
}
