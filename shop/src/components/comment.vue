<template>
    <div class="cmt-container">
        <h3>发表评论</h3>
        <hr>
        <textarea placeholder="请输入要BB的内容(最多输入120个字)" maxlength="120" v-model="commentContent"></textarea>
        <mt-button @click="postComment" type="primary" size="large">发表评论</mt-button>

        <div class="cmt-list">
            <div class="cmt-item" v-for="(item,index) in comments" :key="index">
                <div class="cmt-title">第{{index+1}}楼&nbsp;&nbsp;用户:{{item.user_name}}&nbsp;&nbsp;发表时间:{{item.add_time | dateFormat}}</div>
                <div class="cmt-body">{{item.content==='undefined'?'此用户很懒,没有发表评论':item.content}}</div>
            </div>
        </div>
        <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
    </div>
</template>
<script>
import { Toast } from "mint-ui"
export default {
    data(){
        return {
            pageindex:1,    //默认展示第一页数据
            comments:[],    //所有评论的数据
            commentContent:""
        }
    },
    created() {
        this.getComments()
    },
    methods: {
        // 获取评论
        getComments(){
            this.$http.get("getcomments/"+this.id+"?pageindex="+this.pageindex).then(result=>{
                // console.log(result.body)
                //每次获取新的评论数据的时候,会把原来的数据覆盖
                // this.comments = result.body.message
                //应该使用concat方法连接数组,不会修改原数组,返回一个新数组
                this.comments =this.comments.concat(result.body.message)
            })
        },
        //加载更多
        getMore(){
            this.pageindex++
            this.getComments()
        },
        //提交评论
        postComment(){
            //非空校验
            if(this.commentContent.trim().length === 0){
                return Toast('评论内容不能为空')
            }
            this.$http.post("postcomment/"+this.id,{content:this.commentContent}).then(result=>{
                // console.log(result.body)
                Toast(result.body.message)
                //在调用getComments之前,需要注意:
                //1.原有的数据需要被清空,否则会出现重复拼接
                //2.将pageindex重置为1
                this.comments = []
                this.pageindex = 1
                this.getComments()
                //清空评论输入框
                this.commentContent = ""
            })
        }
    },
    props:["id"]
}
</script>
<style lang="less" scoped>
.cmt-container {
  h3 {
    font-size: 18px;
  }
  textarea {
    font-size: 14px;
    height: 85px;
    margin: 0;
  }

  .cmt-list {
    margin: 5px 0;
    .cmt-item {
      font-size: 13px;
      .cmt-title {
        line-height: 30px;
        background-color: #ccc;
      }
      .cmt-body {
        line-height: 35px;
        text-indent: 2em;
      }
    }
  }
}
</style>