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

import './styles/common.css'
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

//全局安装vue-pic-preview,缩略图
import VuePreview from 'vue-pic-preview'
Vue.use(VuePreview)

//安装vuex
import Vuex from 'vuex'
Vue.use(Vuex)

let car = JSON.parse(localStorage.getItem('car') || '[]')
let store = new Vuex.Store({
  state:{
    //car里面需要{id,price,count,selected}
    car
  },
  mutations:{
    addToCar(state,goodsInfo){
      //加入购物车的业务逻辑
      //1.即将要加入的商品是否在购物车已经存在
      //2.如果存在只需要更新数量信息即可
      //3.如果不存在只需要push进car数组即可
      //假设法
      // let flag = false
      // state.car.some(item=>{
      //   if (item.id === goodsInfo.id){
      //     item.count += parseInt(goodsInfo.count)
      //     flag = true
      //     return true
      //   }
      // })
      // if(!flag){
      //   state.car.push(goodsInfo)
      // }

      //不使用假设法
      let index = state.car.findIndex(item=>{
        if(item.id === goodsInfo.id){
          return true
        }
      })
      if(index === -1){
        state.car.push(goodsInfo)
      }else{
        state.car[index].count += parseInt(goodsInfo.count)
      }
      //当更新car之后,把car数组存在localStorage里面
      localStorage.setItem('car', JSON.stringify(state.car))
    }
  },
  getters:{
    totalCount(state){
      let sum = 0
      state.car.forEach(item=>{
        sum += item.count
      })
      return sum
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
