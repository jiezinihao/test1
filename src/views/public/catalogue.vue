<template>
  <div class="container">
    <div class="topHeader">
      <span @click="goHome()"> <i class="fa fa-chevron-left"></i>目录</span>
      <div class="sort">
        <span :class="{ active: !isReverse }" @click="reverse(0)">正序</span
        >|<span :class="{ active: isReverse }" @click="reverse(1)">倒叙</span>
      </div>
    </div>
    <div class="catalogue" v-for="item in indices" :key="item.volumeId">
      <div class="catalogue-item">
        <div class="item-title">{{ item.volume }}</div>
        <div class="item-body">
          <div
            class="item-chapter"
            v-for="item1 in item.chapter"
            :key="item1.chapterId"
            @click="goReadBook(item1.chapterId)"
          >
            <div class="chapterName">
              {{ item1.chapterName }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      bookId: this.$cookies.get("bookId"),
      indices: [],
      isReverse: false,
    };
  },
  created() {
    this.getCatalogue();
  },
  methods: {
    getCatalogue() {
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
          console.log(res);
          this.indices = res.data.Result.bookIndices;
        });
    },
    goHome() {
      this.$router.go(-1);
    },

    //正序倒序，有BUG，连续点击两次会出现反转
    reverse(res) {
      if (res) {
      this.isReverse = true;
      } else {
        this.isReverse = false;
      }
      this.indices.reverse();
      this.indices.forEach((item) => {
        item.chapter.reverse();
      });
    },
    goReadBook(res){
      this.$cookies.remove("chapterId")
      this.$cookies.set("chapterId",res)
      this.$router.push({name:"readBook"})

    }
  },
};
</script>
<style lang="scss" scoped>
.container {
  .topHeader {
    width: 95%;
    height: 7vh;
    margin: 0 3vw;
    color: gray;
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
    .sort {
      span {
        font-size: 0.7rem;
        color: gray;
        margin: 0 5px;
        transition: all 0.2s ease;
      }
      .active {
        font-size: 0.8rem;
        color: black;
        font-weight: 600;
      }
    }
  }
  .catalogue {
    width: 100vw;
    background-color: #f6f7f9;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .catalogue-item {
    // margin: 10px 0;
    width: 100%;
    // border-bottom: 1px solid rgba(189, 195, 199, 0.4);
    .item-title {
      opacity: 0.7;
      font-size: 0.8rem;
      padding: 10px 10px;
      color: gray;
    }
    .item-body {
      background-color: #fff;
      padding: 10px 20px;
      .item-chapter {
        padding: 10px 0;
        border-bottom: 1px solid rgba(189, 195, 199, 0.2);
        &:last-child {
          border: none;
        }
      }
    }
  }
}
</style>
