//postCss配置文件
module.exports = {
  //配置要是用的相关插件
  plugins: {
    //自动添加浏览器厂商生命前缀，兼容不同的浏览器
    // autoprefixer:{
      //用来配置要兼容到的浏览器环境
      // browsers: ['Android >= 4.0','ios >= 8']
    // },
    //把px转为rem
    'postcss-pxtorem': {
      rootValue: 37.5,
      propList: ['*'],
    },
  },
};
