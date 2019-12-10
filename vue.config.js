const { SkeletonPlugin } = require('page-skeleton-webpack-plugin')
const px2rem = require('postcss-px2rem')
const cssnext = require('postcss-cssnext')({
  browsers: [
    'last 2 versions',
    'iOS >= 7',
    'Android >= 4.0'
  ]
})

const path = require('path')

module.exports = {
  devServer: {
    open: true,
    overlay: {
      warnings: false,
      errors: true
    }
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          cssnext,
          px2rem({ remUnit: 75 })
        ]
      }
    }
  },
  configureWebpack: {
    plugins: [
      new SkeletonPlugin({
        pathname: path.resolve(__dirname, './shell'), // 用来存储 shell 文件的地址
        staticDir: path.resolve(__dirname, './dist'), // 最好和 `output.path` 相同
        routes: ['/'], // 将需要生成骨架屏的路由添加到数组中
        excludes: [], // 需要忽略的css选择器,
        cssUnit: 'rem',
        loading: 'shine'
      })
    ]
  },
  chainWebpack: (config) => { // 解决vue-cli3脚手架创建的项目压缩html 干掉<!-- shell -->导致骨架屏不生效
    if (process.env.NODE_ENV !== 'development') {
      config.plugin('html').tap(opts => {
        opts[0].minify.removeComments = false
        return opts
      })
    }
  }
}
