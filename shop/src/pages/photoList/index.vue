<template>
  <div>
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <a :class="['mui-control-item', {'mui-active' : item.id == 0 }]" href="#item1mobile" data-wid="tab-top-subpage-1.html" v-for="(item) in categories" :key="item.id" @click="getphotoList(item.id)">{{item.title}}</a>
        </div>
      </div>
    </div>

    <!-- 图片列表区域 -->
    <ul class="photo-list">
      <router-link v-for="(item) in photoList" :key="item.id" tag="li" :to="'/home/photoInfo/'+item.id">
        <img v-lazy="item.img_url">
        <div class="info">
          <h1 class="info-title">{{item.title}}</h1>
          <div class="info-body">{{item.zhaiyao}}</div>
        </div>
      </router-link>
    </ul>
  </div>
</template>
<script>
import mui from "@/libs/mui/js/mui.min.js";
export default {
  created() {
    this.getCategories()
    this.getphotoList(0)
  },
  mounted() {
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  data(){
    return {
      categories:[],
      photoList:[]
    }
  },
  methods: {
    getCategories(){
      this.$http.get("getimgcategory").then(result=>{
        // console.log(result.body)
        this.categories = result.body.message
        this.categories.unshift({
          id:0,
          title:"全部"
        })
      })
    },
    getphotoList(cateid){
      this.$http.get("getimages/"+cateid).then(result=>{
        // console.log(result.body)
        this.photoList = result.body.message
      })
    }
  },
};
</script>
<style lang="less">
* {
  touch-action: pan-y;
}

.photo-list {
  list-style: none;
  margin: 0;
  padding: 10px;
  padding-bottom: 0;
  li {
    background-color: #ccc;
    text-align: center;
    margin-bottom: 10px;
    box-shadow: 0 0 9px #999;
    position: relative;
    img {
      width: 100%;
      vertical-align: middle;
    }
    img[lazy="loading"] {
      width: 40px;
      height: 300px;
      margin: auto;
    }

    .info {
      color: white;
      text-align: left;
      position: absolute;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.4);
      max-height: 84px;
      .info-title {
        font-size: 14px;
      }
      .info-body {
        font-size: 13px;
      }
    }
  }
}
</style>