<template>
  <div class="container">
  <div class="container">
    <div class="topHeader">
      <div class="tophader-left" @click="goHome()">
        <i class="fa fa-chevron-left"></i><span>主页</span>
      </div>
      <span>书籍详情</span>
      <div class="tophader-right">
        <i class="fa fa-search"></i>
        <router-link to="/selfBook"> <i class="fa fa-book"></i></router-link>
      </div>
    </div>
  </div>
    <div class="book-top">
      <img :src="defaulturl + bookinfo.bookImage" />
      <div class="book-info">
        <div class="book-title">
          {{ bookinfo.bookName }}
        </div>
        <div class="book-incentup">
          上次更新:
          {{ bookinfo.FinalWritingTime }}
        </div>
        <div class="book-iscol">
          收藏<span>{{ bookinfo.Collection }}</span
          >次
        </div>
        <div class="fansValue">
          已被打赏<span>{{ bookinfo.fansValue }}</span
          >下
        </div>
      </div>
    </div>

    <div class="book-synopsis">
      <p>
        剧情概要：<span>{{ bookinfo.synopsis }}</span>
      </p>
    </div>
    <div class="catalogue" @click="gocatalogue()">
      <span>目录</span>
      <i class="fa fa-angle-right"></i>
    </div>
    <div class="book-opeartion">
      <el-button type="primary" @click="goReadBook(bookinfo.lastReadingTime)">{{
        bookinfo.lastReadingTime ? "继续阅读" : "现在阅读"
      }}</el-button>
      <el-button
        :type="isCollection == '加入收藏' ? 'danger' : ''"
        @click="Collection()"
        >{{ isCollection }}</el-button
      >
    </div>

    <div class="book-decs">
      <div
        v-bind:class="[{ ondashang: clickds }, 'decs-item']"
        @click="ondashang()"
      >
        <img src="../../assets/打赏.png" />
        <p>打赏</p>
        <div class="fansValue" v-show="clickds">
          <el-slider
            class="fanValue-num"
            :show-tooltip="false"
            v-model="fansValueNum"
          ></el-slider>
          <el-button type="danger" @click="dashang()"
            >赏{{ fansValueNum }}</el-button
          >
        </div>
      </div>
      <div class="decs-item" @click="urge()">
        <img src="../../assets/催单.png" />
        <p>催更</p>
      </div>
      <div class="decs-item" @click="goCommunity()">
        <img src="../../assets/评论.png" />
        <p>评论</p>
      </div>
    </div>

    <div class="author">
      <div class="author-detail">
        <p>本书作者</p>
      </div>
      <div class="author-decs">
        <div>
          <img
            class="author-img"
            :src="defaulturl + bookinfo.writerImage"
            alt=""
          />
          <span>{{ bookinfo.writerName }}</span>
        </div>
        <i class="fa fa-chevron-right"></i>
      </div>
    </div>

    <copy-right></copy-right>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bookinfo: {},
      isCollection: "",
      clickds: false,
      fansValueNum: 0,
      bookId: this.$cookies.get("bookId"),
    };
  },
  created() {
    this.getBookDetail();
  },
  methods: {
    getBookDetail() {
      if (this.$cookies.isKey("token")) {
        this.axios
          .get(
            this.defaulturl + "/api/Book/GetBookDetails?bookId=" + this.bookId,
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
            console.log(res)
            this.bookinfo = res.data.Result;
            if (this.bookinfo.isCollection == 0) {
              this.isCollection = "取消收藏";
            } else {
              this.isCollection = "加入收藏";
            }
          });
      } else {
        this.$router.push({ name: "login" });
      }
    },
    goHome() {
      this.$router.go(-1);
    },
    //阅读部分
    goReadBook(res) {
      this.axios
        .get(this.defaulturl + "/api/Book/GetBookIndex?bookId=" + this.bookId, {
          headers: {
            Authorization:
              this.$cookies.get("token").token_type +
              " " +
              this.$cookies.get("token").access_token,
          },
        })
        .then((res) => {
          if (res != null) {
          this.$cookies.remove("chapterId");
          this.$cookies.set("chapterId", res.data.Result.lastReadChapterId);
          this.$router.push({ name: "readBook" });
          } else {
            this.$cookies.remove("chapterId");
            this.$cookies.set("chapterId", res.data.Result.bookIndices[0].chapter[0].chapterId);
            this.$router.push({ name: "readBook" });
          }

        });
    },
    //收藏部分
    Collection() {
      if (!this.bookinfo.isCollection) {
        this.axios
          .post(
            this.defaulturl + "/api/User/CollectionBook?bookId=" + this.bookId,
            this.bookId,
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
            // console.log(res);conso
            if (res.data.Result.remsg == "收藏成功") {
              this.isCollection = "取消收藏";
              this.$message({
                showClose: true,
                message: res.data.Result.remsg,
                type: "success",
              });
            } else {
              this.isCollection = "加入收藏";
              this.$message({
                showClose: true,
                message: res.data.Result.remsg,
              });
            }
          });
      }
    },
    //打赏点击事件
    ondashang() {
      this.clickds = !this.clickds;
      // this.axios.post()
    },

    //打赏部分
    dashang() {
      let msg = {
        bookId: this.bookId,
        number: this.fansValueNum,
      };
      //   console.log(msg);
      //             console.log(this.$cookies.get("token"))
      this.axios
        .post(this.defaulturl + "/api/Community/Reward", msg, {
          headers: {
            Authorization:
              this.$cookies.get("token").token_type +
              " " +
              this.$cookies.get("token").access_token,
          },
        })
        .then((res) => {
          this.$message({
            showClose: true,
            message: "打赏成功！" + res.data.Result.remsg,
            type: "success",
          });
        })
        .catch((err) => {
          this.$message({
            showClose: true,
            message: "星尘不足，打赏失败",
          });
        });
    },
    //催更部分
    urge() {
      this.axios
        .post(
          this.defaulturl + "/api/Community/Urge",
          { bookId: this.bookId },
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
          this.$message({
            showClose: true,
            type: "success",
            message: "催更成功！",
          });
        })
        .catch((err) => {
          this.$message({
            showClose: true,
            message: "催更失败",
          });
        });
    },
    //进入目录部分
    gocatalogue() {
      this.$router.push({ name: "catalogue" });
    },
    //评论部分
    goCommunity(){
      this.$router.push({name:"community"})
    }
  },
};
</script>
<style lang="scss" scoped>
.container {
  &::before {
    content: "";
    position: absolute;
    height: 100%;
    width: 100%;
    background: #f6f7f9;
    //   filter: blur(30px);
    //   opacity: .;
    z-index: -1;
  }
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
  .book-top {
    margin: 10px 0;
    border-radius: 5px;
    overflow: hidden;
    padding: 10px;
    background-color: #ffffff;
    border-bottom: 1px solid rgba(178, 190, 195, 0.5);
    display: flex;

    img {
      height: 15vh;
    }
    .book-info {
      flex: 1;
      font-size: 0.7rem;
      color: gray;
      padding: 0 10px;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      span {
        color: rgba(225, 112, 85, 1);
      }
      .book-title {
        font-size: 1.1rem;
        color: rgba(45, 52, 54, 1);
      }
    }
  }
  .book-synopsis {
    background-color: #fff;
    width: 90vw;
    height: 10vh;
    padding: 5vw;
    opacity: 0.7;
    overflow: hidden;
    p {
      margin: 0;
    }
    span {
      font-size: 0.8rem;
    }
  }
  .book-opeartion {
    width: 100%;
    height: 12vh;
    margin-top: 10px;
    background-color: #fff;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    .el-button {
      height: 50%;
      opacity: 0.7;
    }
  }
  .catalogue {
    width: 90vw;
    height: 5vh;
    background-color: #fff;
    padding: 15px 5vw 0 5vw;
    border-top: 0.1px solid rgba(149, 165, 166, 0.3);
    span {
      float: left;
      padding-left: 10px;
      font-weight: 600;
    }
    i {
      float: right;
      padding-right: 10px;
    }
  }
  .book-decs {
    width: 100%;
    height: 15vh;
    margin: 10px 0;
    background-color: #fff;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    .ondashang {
      background-color: #f6f7f9;
    }
    .decs-item {
      flex: 1;
      text-align: center;
      border-right: 0.1px solid #b2bec3;
      padding: 10px;
      &:nth-child(1) {
        position: relative;
        transition: all 0.1s ease;
        .fansValue {
          position: absolute;
          width: 60vw;
          height: 15vh;
          background-color: #f6f7f9;
          //  border: .1px solid gray;
          top: -15vh;
          left: 0;
          padding: 0 20vw;
          .fansValue-num {
            margin: 10px 40px;
          }
        }
      }
      &:last-child{
        border:none;
      }
      img {
        height: 5vh;
      }
      p {
        margin: 0;
        opacity: 0.8;
      }
    }
  }

  .author {
    width: 100%;
    height: 16vh;
    background-color: #fff;

    .author-decs {
      display: flex;
      justify-content: space-between;
      align-items: center;
      opacity: 0.7;
      // text-align: ;
      margin: 5px 10px 0 20px;
      position: relative;

      div {
        .author-img {
          height: 6vh;
          border-radius: 50%;
          border: 0.1 solid #636e72;
        }
      }

      span {
        position: absolute;
      }
    }
    .author-detail {
      width: 90%;
      height: 4vh;
      padding: 10px;
      background-color: #fff;
      p {
        margin: 0;
        padding: 5px;
        border-bottom: 1px solid #b2bec3;
        img {
          height: 1rem;
        }
      }
    }
  }
}
</style>
