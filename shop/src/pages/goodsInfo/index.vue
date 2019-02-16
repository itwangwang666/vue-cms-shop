<template>
  <div>
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
              <button  type="button">-</button>
              <input type="number" value="1" v-model="num">
              <button  type="button">+</button>
          </div>
        </div>
      </div>
    </div>

    <div class="mui-card">
      <div class="mui-card-header">页眉</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">包含页眉页脚的卡片，页眉常用来显示面板标题，页脚用来显示额外信息或支持的操作（比如点赞、评论等）</div>
      </div>
      <div class="mui-card-footer">页脚</div>
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
      num:1
    };
  },
  created() {
    this.getLunbotu();
    this.getGoodsInfo();
  },
  methods: {
    getLunbotu() {
      this.$http.get("getthumimages/" + this.id).then(result => {
        // console.log(result.body)
        if (result.body.status === 0) {
          this.banners = result.body.message;
        }
      });
    },
    getGoodsInfo() {
      this.$http.get("goods/getinfo/" + this.id).then(result => {
        console.log(result.body);
        if (result.body.status === 0) {
          this.goodsInfo = result.body.message[0];
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
</style>
