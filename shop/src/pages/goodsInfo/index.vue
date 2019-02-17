<template>
  <div class="goodsInfo-container">
    <!-- 小球 -->
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter" name="ball">
      <div class="ball" v-show="ballFlag" ref="ball"></div>
    </transition>
    <!-- 商品轮播区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swiper :banners="banners"></swiper>
        </div>
      </div>
    </div>

    <!-- 商品购买区域 -->
    <div class="mui-card">
      <div class="mui-card-header">{{goodsInfo.title}}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价:
            <del>¥{{goodsInfo.market_price}}</del>&nbsp;&nbsp;
            销售价:
            <span class="now_price">¥{{goodsInfo.sell_price}}</span>
          </p>
          <div class="numbox">
            <span class="title">购买数量:</span>
            <input type="button" value="-" @click="num>=2 && num--" :disabled="num==1">
            <input type="number" v-model="num" @change="filterMaxCount">
            <input
              type="button"
              value="+"
              @click="num<goodsInfo.stock_quantity && num++"
              :disabled="num==goodsInfo.stock_quantity"
            >
          </div>
          <mt-button type="primary" size="small">立即购买</mt-button>
          <mt-button type="danger" size="small" @click="addToshopcar">加入购物车</mt-button>
        </div>
      </div>
    </div>

    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号: {{goodsInfo.goods_no}}</p>
          <p>库存情况: {{goodsInfo.stock_quantity}}件</p>
          <p>上架时间: {{goodsInfo.add_time | dateFormat}}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
        <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      banners: [],
      goodsInfo: {},
      num: 1,
      ballFlag:false
    };
  },
  created() {
    this.getLunbotu();
    this.getGoodsInfo();
  },
  methods: {
    //获取轮播图数据
    getLunbotu() {
      this.$http.get("getthumimages/" + this.id).then(result => {
        // console.log(result.body)
        if (result.body.status === 0) {
          this.banners = result.body.message;
        }
      });
    },
    //获取商品详情数据
    getGoodsInfo() {
      this.$http.get("goods/getinfo/" + this.id).then(result => {
        // console.log(result.body)
        if (result.body.status === 0) {
          this.goodsInfo = result.body.message[0];
        }
      });
    },
    filterMaxCount() {
      if (this.num > this.goodsInfo.stock_quantity) {
        this.num = this.goodsInfo.stock_quantity;
      }
    },
    goDesc(id) {
      this.$router.push("/home/goodsDesc/" + this.id);
    },
    goComment(id) {
      this.$router.push("/home/goodsComment/" + this.id);
    },
    addToshopcar() {
      this.ballFlag = !this.ballFlag
    },
    beforeEnter(el) {
      //beforeEnter表示动画入场之前,表示动画尚未开始,可以在这里设置动画开始之前的起始样式
      el.style.transform = "translate(0,0)"
    },
    enter(el, done) {
      //enter表示表示动画开始之后的样式,可以在这里设置小球完成动画之后的结束状态
      el.offsetWidth;
      //小球动画优化思路
      //1.导致小球动画不准确的原因是小球的定位都是写死的,移动页面或改变屏幕大小都会导致动画的不准确
      //2.结论:不能把小球位置的横纵坐标写死,而是应该根据不同的情况,动态的计算这个坐标
      //3.思路:先得到徽标的横纵坐标,再得到小球的横纵坐标,然后让y值求差,x值也求差,这样得到的结果就是横纵坐标要位移的距离
      //4.如何获取小球的位置?   domObj.getBoundingClientRect()
      //获取小球在页面中的位置
      console.log(this.$refs.ball);
      const ballPosition = this.$refs.ball.getBoundingClientRect()
      //获取徽标在页面中的位置
      const badgePosition = document.getElementById("badge").getBoundingClientRect()
      console.log(ballPosition)
      console.log(badgePosition)
      const xDist = badgePosition.left-ballPosition.left
      const yDist = badgePosition.top-ballPosition.top
      el.style.transform = `translate(${xDist}px, ${yDist}px)`
      el.style.transition = "all 0.5s cubic-bezier(.4,-0.3,1,.68)"
      done()
    },
    afterEnter(el) {
      //afterEnter表示动画完成之后
      this.ballFlag = !this.ballFlag
    }
  }
};
</script>
<style lang="less" scoped>
.goodsInfo-container {
  background-color: #eee;
  overflow: hidden;
  .numbox {
    display: flex;
    height: 50px;
    align-items: center;
    .title {
      margin-right: 10px;
    }
    input {
      width: 30px;
      height: 30px;
      text-align: center;
      padding: 0;
      margin: 0;
      &[type="number"] {
        border-right: none;
        border-left: none;
        font-size: 12px;
      }
    }
  }
  .now_price {
    color: red;
    font-size: 16px;
    font-weight: bold;
  }
  .mui-card-footer {
    display: block;
    button {
      margin: 15px 0;
    }
  }
  .ball {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: red;
    position: absolute;
    z-index: 99;
    top: 413px;
    left: 130px;
    // transform: translate(107px, 107px);
  }
}
</style>
