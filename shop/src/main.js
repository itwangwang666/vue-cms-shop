// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import VueResource from 'vue-resource'
Vue.use(VueResource)

//设置vue-resource的请求根路径
Vue.http.options.root = 'http://www.lovegf.cn:8899/api/'

//1.导入mint-ui和其样式文件
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

//2.安装mint-ui(全局注册所有的组件)
Vue.use(MintUI)

//引入mui的css文件
import './libs/mui/css/mui.css'
//引入mui扩展字体的css文件
import './libs/mui/css/icons-extra.css'

// require('./config') // 表示引入config目录下的 : index.js index.json index.node index
Vue.config.productionTip = false

import moment from 'moment'

//定义全局的过滤器
Vue.filter('dateFormat',function (dateStr,pattern='YYYY-MM-DD HH:mm:ss') {
    return moment(dateStr).format(pattern)
})

//全局注册组件
import comment from './components/comment.vue'
Vue.component('comment',comment)

//注册全局轮播图组件
import swiper from './components/swiper.vue'
Vue.component('swiper', swiper)

//全局安装vue-pic-preview
import VuePreview from 'vue-pic-preview'
Vue.use(VuePreview)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
