<template>
  <div class="container">
    <div class="topHeader">
      <div class="tophader-left" @click="goHome()">
        <i class="fa fa-chevron-left"></i><span>书籍详情</span>
      </div>
      <span>评论</span>
      <div class="tophader-right">
        <i class="fa fa-search"></i>
        <router-link to="/selfBook"> <i class="fa fa-book"></i></router-link>
      </div>
    </div>
    <div class="comment">
      <div class="comment-item" v-for="item in comment" :key="item.Id">
        <div class="item-left">
          <img :src="defaulturl + item.image" />
          <span>{{ item.userName }}</span>
        </div>
        <div class="item-right">
          <p>{{ item.review }}</p>
          <div class="item-right-but">
            <span class="item-time">{{ item.createDate }}</span>
            <span class="item-opreation">
              <i class="fa fa-thumbs-o-up"></i>
              <span>{{ item.likeNumber }}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="write">
    <el-input class="inp" v-model="writComment"></el-input>
    <el-button class="btn" @click="postComment()">发表</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      comment: [],
      offset: 1,
      writComment:""
    };
  },
  created() {
    this.getCommunity();
  },
  methods: {
    goHome() {
      this.$router.go(-1);
    },
    getCommunity() {
      this.axios
        .get(
          `${
            this.defaulturl
          }/api/Community/GetBookReview?bookId=${this.$cookies.get(
            "bookId"
          )}&offset=${this.offset}&size=20`,
          {
            headers: {
              Authorization:
                this.$cookies.get("token").token_type +
                " " +
                this.$cookies.get("token").access_token,
            },
          }
        )
        .then((res) => {
          this.comment = res.data.Result.bookReview;
          console.log(this.comment);
        });
    },
    postComment(){
      if(this.writComment == ""){
          this.$message({
          message:"评论不能为空哦！",
          showClose:true
        })
        return

      }
      let msg = {
        review:this.writComment,
        bookId:this.$cookies.get("bookId"),
        parentId:null
      }
      this.axios.post(this.defaulturl + "/api/Community/WriteBookReview",msg,          {
            headers: {
              Authorization:
                this.$cookies.get("token").token_type +
                " " +
                this.$cookies.get("token").access_token,
            },
          })
          .then((res)=>{
            console.log(res)
            this.writComment = ""
             this.$nextTick(() => {
                  this.getCommunity()
                });
            
          })
    }
  },
};
</script>
<style lang="scss" scoped>
.topHeader {
  width: 100%;
  height: 7vh;
  margin: 5px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border-bottom: 0.1px solid rgba(236, 240, 241, 1);
  .tophader-left {
    margin-left: 20px;
    height: 100%;
    line-height: 6vh;
    span {
      font-size: 0.8rem;
      color: gray;
    }
    i {
      height: 100%;
      color: gray;
      opacity: 0.7;
      margin-right: 5px;
    }
  }

  .tophader-right {
    height: 100%;
    line-height: 6vh;
    i {
      height: 100%;
      width: 10vw;
      color: gray;
      opacity: 0.7;
    }
  }
}
.container {
  position: relative;
  background-color: #f6f7f9;
  .comment {
    .comment-item {
      background-color: #fff;
      margin: 10px 0;
      min-height: 15vh;
      display: flex;
      justify-content: space-between;
      .item-left {
        margin: 10px;
        padding-right: 10px;
        // border-right: 1px solid gray;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: space-between;
        img {
          height: 50px;
          border:1px solid gray;
          // border-radius: 50%;
        }
        span {
          width: 60px;
          height: 2rem;
          font-size: 0.8rem;
          overflow: hidden;
          text-align: center;
          word-wrap: break-word;
        }
      }
      .item-right {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        p{
            flex: 1;
        }
        .item-right-but {
          font-size: 0.6rem;
          color: gray;
          margin: 10px 40px 10px 0;
          display: flex;
          justify-content: space-between;
          .item-opreation{
              font-size: .8rem;
          }
        }
      }
      &:last-child{
        margin-bottom: 15vh;
      }
    }
  }
  .write{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 90vw;
    display: flex;
    padding: 5vw;
    // border-top: 1px solid rgba(127, 143, 166,1.0);
    border-radius: 10px 10px 0 0;
    background-color: rgba(0, 168, 255,.3);
    justify-content: space-between;
    .inp{
      flex: 1;
      margin-right: 10px;
    }
  }
}
</style>
