<template>
  <div class="shopcar-container">
    <div class="goods-list">
      <div class="mui-card">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <mt-switch></mt-switch>
            <img src="http://www.lovegf.cn:8899/xm1.jpg">
            <div class="info">
              <h1>苹果Apple iPhone 6 Plus 16G 4G手机（联通三网版）</h1>
              <div class="numbox">
                <span class="price">¥3222</span>
                <div>
                <input type="button" value="-">
                <input type="number">
                <input type="button" value="+">
                </div>
                <a href="#">删除</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">这是一个最简单的卡片视图控件；卡片视图常用来显示完整独立的一段信息，比如一篇文章的预览图、作者信息、点赞数量等</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="less" scoped>
.shopcar-container {
  .goods-list {
    .mui-card-content-inner {
      display: flex;
      align-items: center;
    }
    img {
      width: 60px;
      height: 60px;
    }
    .info {
      h1 {
        font-size: 13px;
        font-weight: bold;
      }
      .numbox {
        display: flex;
        height: 50px;
        align-items: center;
        justify-content: space-between;
        .price {
          margin-right: 10px;
          color: red;
          font-size: 16px;
          font-weight: bold;
        }
        input {
          width: 30px;
          height: 30px;
          text-align: center;
          padding: 0;
          margin: 0;
          float: left;
          &[type="number"] {
            border-right: none;
            border-left: none;
            font-size: 12px;
          }
        }
      }
    }
  }
}
</style>
