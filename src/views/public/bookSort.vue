<template>
  <div class="container">
    <div class="topHeader">
      <span @click="goHome()"> <i class="fa fa-chevron-left"></i></span>

      <span class="tophader-right">
        <i class="fa fa-search"></i>
        <router-link to="/selfBook">
        <i class="fa fa-book"></i></router-link>
        
      </span>
    </div>
    <div class="bookList" v-for="item in bookList" :key="item.bookId">
      <img :src='defaulturl + item.bookImage' />
      <div class="list-detail">
        <span class="detail-title">{{ item.bookName }}</span>
        <div class="detail-desc">
          <div>
            已被收藏<span>{{ item.collection }}</span
            >次！
          </div>
          <div>
            <span>{{ item.fansValue }}</span
            >粉丝
          </div>
        </div>
        <div class="detail-btm">
          <span class="detail-author"> <i class="fa fa-user-o"></i> {{item.writerName}} </span>
          <span class="detail-sort">{{ item.sortimg }}</span>
        </div>
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
    };
  },
  created() {
    this.getBookList();
  },
  methods: {
    getBookList() {
      this.axios
        .get(
          `${this.defaulturl}/api/BookHome/GetBookListBySort?sort=${this.$route.params.bookId}&offset=${this.offset}&size=20`
        )
        .then((res) => {
          // console.log(res);
          this.bookList = res.data.Result.books;
          for (let i = 0, len = this.bookList.length; i < len; i++) {
            switch (this.$route.params.bookId) {
              case 1:
                this.bookList[i].sortimg = "全站更新";
                break;
              case 2:
                this.bookList[i].sortimg = "人气新书";
                break;
              case 3:
                this.bookList[i].sortimg = "编辑推荐";
                break;
            }
          }
        });
    },
    goHome() {
      this.$router.push({ name: "home" });
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  .topHeader {
    width: 95%;
    height: 7vh;
    margin: 0 3vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 0.1px solid rgba(236, 240, 241, 1);
    i {
      height: 100%;
      width: 10vw;
      color: gray;
      opacity: 0.7;
    }
  }
  .bookList {
    width: 97%;
    margin: 10px;
    padding: 10px 0;
    display: flex;
    border-bottom: 0.5px solid rgba(236, 240, 241, 1);
    img {
      //   max-width: 25vw;
      height: 16vh;
      opacity: 0.9;
    }
    .list-detail {
      flex: 1;
      margin: 0 10px;

      .detail-title {
        font-size: 1.1rem;
        font-weight: 600;
        margin: 5px 0;
      }
      .detail-desc {
        font-size: 0.8rem;
        color: gray;
        margin: 5px 3px;
        height: 8vh;
        span {
          color: #d63031;
          font-size: 1rem;
        }
      }
      .detail-btm {
        display: flex;
        justify-content: space-between;
        .detail-author {
          font-size: 0.8rem;
          color: #95a5a6;
        }
        .detail-sort {
          font-size: 0.4rem;
          padding: 3px;
          border: 0.1px solid rgba(236, 240, 241, 1);
          color: rgba(231, 76, 60, 1);
        }
      }
    }
  }
}
</style>
