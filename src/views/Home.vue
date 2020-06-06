<template>
  <div class="home">
    <topHeader class="topHeader"></topHeader>
    <div class="carousel">
      <el-carousel height="150px">
        <el-carousel-item v-for="item in ad" :key="item.Id">
          <img :src="defaulturl + item.image" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="home-nav">
      <div v-for="item in model" :key="item.title" class="nav-item">
        <div class="nav-a">
          <div @click="setbookSort(item.sort)">
            <img :src="item.imgclass" />
            <p>{{ item.title }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="model" v-for="item in model" :key="item.title">
      <div class="model-header">
        <span class="model-title"
          >{{ item.title }}
          <span class="model-title-desc">hot</span>
        </span>
        <div @click="setbookSort(item.sort)">
          <span class="model-title-more"><i>更多...</i> </span>
        </div>
      </div>
      <div class="model-slide">
        <router-link
          :to="{ name: 'bookDetail', params: { bookId: item1.bookId } }"
          class="model-slide-son"
          v-for="item1 in item.books"
          :key="item1.bookId"
        >
          <img
            :src="defaulturl + item1.bookImage"
            @click="setbookId(item1.bookId)"
          />
          <span class="model-slide-caption" @click="setbookId(item1.bookId)">{{
            item1.bookName
          }}</span>
          <span class="author" @click="setbookId(item1.bookId)">{{
            item1.writerName
          }}</span>
        </router-link>
      </div>
    </div>
    <copy-right></copy-right>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ad: [],
      model: [],
      hometrs: "",
    };
  },
  watch: {},
  created() {
    this.getBookHome();
  },
  methods: {
    getBookHome() {
      this.axios
        .get("http://xmproject.cn:21505/api/BookHome/GetHome")
        .then((res) => {
          console.log(res)
          this.ad = res.data.Result.ad;
          this.model = res.data.Result.list;
          // console.log("1")
          // console.log(res);
          //被动添加分类图标
          this.model[0].imgclass = require("../public/更新.png");
          this.model[1].imgclass = require("../public/推荐.png");
          this.model[2].imgclass = require("../public/人气热度.png");
          // console.log(this.model);
        });
    },
    setbookId(res) {
      this.$cookies.remove("bookId");
      this.$cookies.set("bookId", res);
    },
    setbookSort(res) {
      this.$cookies.remove("bookSort");
      this.$cookies.set("bookSort", res);
      this.$router.push({ name: "bookSort" });
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  min-height: 100vh;
  // background: linear-gradient(to top right,#f6f7f9,#b2bec3);
  position: relative;
  display: flex;
  flex-direction: column;
  position: relative;
  // justify-content: space-ar;
  // filter: blur(5px);
  &::before {
    position: absolute;
    height: 100%;
    width: 100%;
    content: "";
    background: #f6f1f9;
    filter: blur(20px);
    z-index: -1;
  }
  .topHeader {
    position: relative;
    height: 6vh;
    width: 95vw;
    left: 50%;
    padding: 5px;
    transform: translateX(-50%);
    background-color: #fff;
  }
  .carousel {
    margin: 10px 5px;
    // z-index: 1 !important;
  }
  .home-nav {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    background-color: #fff;
    height: 10vh;
    margin-bottom: 10px;
    .nav-item {
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: space-between;
      width: 30vw;
      text-align: center;
      img {
        // height: 50%;
        width: 27%;
      }
      .nav-a {
        text-decoration: none;
        color: gray;
      }
      p {
        margin: 0;
      }
    }
  }
  .model {
    height: 37vh;
    width: 100vw;
    background-color: #fff;

    .model-header {
      height: 20%;
      width: 90%;
      padding: 10px 0 10px 10px;
      overflow: hidden;
      display: flex;
      justify-content: space-between;
      a {
        text-decoration: none;
      }
      .model-title {
        height: 70%;
        border-left: 2px solid red;
        padding: 0 5px;
        font-weight: bold;
        font-size: 1.1rem;
        .model-title-desc {
          font-size: 0.7rem;
          color: gray;
        }
      }

      .model-title-more {
        color: #3498db;
        font-size: 0.8rem;
        height: 50%;
        width: 30%;
        text-align: right;
      }
    }
    .model-slide {
      display: flex;
      flex-direction: row;
      // justify-content: ;
      overflow-x: scroll;
      scrollbar-width: none;
      -ms-overflow-style: none;
      a {
        text-decoration: none;
        display: inline-block;
      }
      .model-slide-son {
        display: flex;
        align-items: center;
        flex-direction: column;
        margin: 0 10px;
        img {
          max-width: 30vw;
          max-height: 15vh;
        }
        .model-slide-caption {
          height: 2rem;
          overflow: hidden;
          font-size: 0.8rem;
          color: #2d3436;
        }
        .author {
          font-size: 0.5rem;
          color: gray;
        }
      }
    }
    .model-slide::-webkit-scrollbar {
      width: 0 !important;
    }
  }
}

.el-carousel__item {
  line-height: 150px;
  margin: auto;
  text-align: center;
  img {
    max-width: 100%;
    max-height: 100%;
  }
}
</style>
