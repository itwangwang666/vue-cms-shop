<template>
    <!-- <div class="goods-list">
        <router-link 
        class="goods-item" 
        v-for="(item) in goodsList" 
        :key="item.id" 
        :to="'/home/goodsInfo/'+item.id" 
        tag="div">
            <img :src="item.img_url" alt="">
            <h1>{{item.title}}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">¥{{item.sell_price}}</span>
                    <span class="old">¥{{item.market_price}}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩余{{item.stock_quantity}}件</span>
                </p>
            </div>
        </router-link>
        <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
    </div> -->

    <!-- 使用编程式导航 -->
    <div class="goods-list">
        <div 
        class="goods-item" 
        v-for="(item) in goodsList" 
        :key="item.id"
        @click="goDetail(item.id)">
            <img :src="item.img_url" alt="">
            <h1>{{item.title}}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">¥{{item.sell_price}}</span>
                    <span class="old">¥{{item.market_price}}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩余{{item.stock_quantity}}件</span>
                </p>
            </div>
        </div>
        <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
    </div>
</template>
<script>
export default {
    data(){
        return {
            pageindex:1,
            goodsList:[]
        }
    },
    created() {
        this.getGoodsList()
    },
    methods: {
        //获取商品列表
        getGoodsList(){
            this.$http.get("getgoods?pageindex="+this.pageindex).then(result=>{
                // console.log(result.body)
                if(result.body.status == 0){
                    this.goodsList = this.goodsList.concat(result.body.message) 
                }
            })
        },
        //加载更多
        getMore(){
            this.pageindex++
            this.getGoodsList()
        },
        //跳转至商品详情页
        goDetail(id){
            //this.$router是一个路由导航对象
            this.$router.push("/home/goodsInfo/"+id)
            //1.最简单的方法
            // this.$router.push("/home/goodsInfo/"+id)
            //2.传递对象
            // this.$router.push({path:"/home/goodsInfo/"+id})
            //3.传递命名的路由
            //{ path: '/home/goodsInfo/:id', component: goodsInfoComponent,name: 'goodsInfo'}
            // this.$router.push({name:goodsInfo,params:{id}})
        }
    },
}
</script>
<style lang="less" scoped>
    .goods-list{
        padding:7px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .goods-item{
            width: 49%;
            border:1px solid #ccc;
            box-shadow: 0 0 8px #ccc;
            margin:4px 0;
            padding:2px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            min-height: 293px;
            img{
                width: 100%;
            }
            h1{
                font-size: 14px;
            }
            .info{
                background-color: #eee;
                p{
                    margin:0;
                    padding:5px;
                }
                .price{
                    .now{
                        color:red;
                        font-weight: bold;
                        font-size: 16px;
                    }
                    .old{
                        text-decoration: line-through;
                        font-size: 12px;
                        margin-left:10px;
                    }
                }
                .sell{
                    display: flex;
                    justify-content: space-between;
                    font-size: 13px;
                }
            }
        }
    }
</style>
