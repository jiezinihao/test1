<template>
  <div>
    <div class="isnull" v-if="!isnull">
      <div class="topHeader">
        <span @click="goHome()">
          <i class="fa fa-chevron-left"></i>我的书架</span
        >

        <span class="tophader-right">
          <i class="fa fa-search"></i>
          <router-link to="/selfBook"> <i class="fa fa-book"></i></router-link>
        </span>
      </div>
      还没有收藏任何书籍哦！
    </div>
    <div class="container" v-if="isnull">
      <div class="topHeader">
        <span @click="goHome()">
          <i class="fa fa-chevron-left"></i>我的书架</span
        >

        <span class="tophader-right">
          <i class="fa fa-search"></i>
          <router-link to="/selfBook"> <i class="fa fa-book"></i></router-link>
        </span>
      </div>
      <div class="incentct">
        <div
          class="bgc"
          :style="{
            backgroundImage:
              'url(' + defaulturl + incentBook[0].bookImage + ')',
          }"
        ></div>
        <img
          :src="defaulturl + incentBook[0].bookImage"
          @click="goBookdetail(incentBook[0].bookId)"
        />
        <div class="book-detail">
          <div class="book-name">
            最近收藏：<span>{{ incentBook[0].bookName }}</span>
          </div>
          <div>
            <el-button>继续阅读</el-button>
            <el-button @click="goCatalogue(incentBook[0].bookId)"
              >目录</el-button
            >
          </div>
        </div>
      </div>
      <div class="book-L">
      <div class="book-list">
        <div
          class="book-list-item"
          v-for="item in bookList"
          :key="item.bookId"
          @click="goBookdetail(item.bookId)"
        >
          <img :src="defaulturl + item.bookImage" alt="" />
          <div class="book-name">{{ item.bookName }}</div>
        </div>
      </div>
      <copy-right></copy-right>
    </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      bookList: [],
      offset: 1,
      incentBook: [{ bookImage: "", bookName: "" }],
      isnull: false,
    };
  },
  created() {
    this.getSelfBook();
  },
  methods: {
    getSelfBook() {
      if (this.$cookies.isKey("token")) {
        this.axios
          .get(
            `${this.defaulturl}/api/User/GetUserFavorites?offset=${this.offset}&size=20`,
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
            this.bookList = res.data.Result.books;
            this.incentBook = this.bookList.splice(0, 1);
            if (res.data.Result.total >= 1) {
              this.isnull = true;
            }
          });
      } else {
        this.$router.push("login");
      }
    },
    goHome() {
      this.$router.go(-1);
    },
    goBookdetail(res) {
      this.$cookies.remove("bookId");
      this.$cookies.set("bookId", res);
      this.$router.push({ name: "bookDetail" });
    },
    goCatalogue(res) {
      this.$cookies.remove("bookId");
      this.$cookies.set("bookId", res);
      this.$router.push({ name: "catalogue" });
    },
  },
};
</script>
<style lang="scss" scoped>
.isnull {
}
  .topHeader {
    width: 95%;
    height: 7vh;
    margin: 10px 0;
    margin: 0 3vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 0.1px solid rgba(236, 240, 241, 1);
    i {
      height: 100%;
      width: 10vw;
      color: gray;
      padding: 5px 0;
      text-align: center;
      font-size: 1.1rem;
    }
    a {
      padding: 5px;
      background-color: rgba(178, 190, 195, 0.2);
      border: 1px solid rgba(9, 132, 227, 0.5);
      border-radius: 7px;
      box-shadow: 0.1px 0.1px 2px #888888 inset;
    }
    span {
      color: gray;
    }
  }
.container {
  // min-height: 100vh;
  // background-color: #f6f7f9;
  .incentct {
    display: flex;
    padding: 10px 0;
    margin: 0 10px;
    border-bottom: 1px solid rgba(99, 110, 114, 0.4);
    position: relative;
    .bgc {
      position: absolute;
      transform: translate(-10px, -10px);
      z-index: -1;
      height: 100%;
      width: 100%;
      opacity: 0.6;
      background-size: cover;
      filter: blur(5px);
    }
    img {
      max-height: 20vh;
      border-radius: 5px;
    }
    .book-detail {
      margin: 10px;
      font-size: 0.9rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .book-name {
        span {
          opacity: 1 !important;
          font-size: 1.3rem;
          color: rgba(255, 118, 117, 1);
        }
      }
    }
  }
  .book-list {
    display: flex;
    flex-flow: wrap;
    margin: 10px;
    min-height: 56vh;
    .book-list-item {
      margin: 9px;
      width: 18vw;
      height: 20vh;
      img {
        width: 18vw;
        border-radius: 5px;
      }
      .book-name {
        font-size: 0.8rem;
        text-align: center;
      }
    }
  }
}
</style>
