<template>
  <div class="home">
    <topHeader class="topheader"></topHeader>
    <div class="carousel">
      <el-carousel height="150px">
        <el-carousel-item v-for="item in ad" :key="item.Id">
          <img :src="defaulturl + item.image" />
        </el-carousel-item>
      </el-carousel>
    </div>

    <div class="home-nav">
      <div v-for="item in model" :key="item.title">
        {{ item.title }}
      </div>
    </div>

    <div class="model" v-for="item in model" :key="item.title">
      <div class="model-header">
        <span class="model-title">{{ item.title }}</span>
        <span class="model-title-desc">hot</span>
      </div>
      <div class="model-slide">
        <div
          class="model-slide-son"
          v-for="item1 in item.books"
          :key="item1.bookId"
        >
          <img :src="defaulturl + item1.bookImage" />
          <span class="model-slide-caption">{{ item1.bookName }}</span>
          <span class="author">{{ item.writerName }}</span>
        </div>
      </div>
    </div>
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
  watch: {

  },
  created() {
    this.getBookHome();
  },
  methods: {
    getBookHome() {
      this.axios.get(this.defaulturl + "/api/BookHome/GetHome").then((res) => {
        this.ad = res.data.Result.ad;
        this.model = res.data.Result.list;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  min-height: 100vh;
  background-color: #f6f7f9;
  position: relative;
  display: flex;
  flex-direction: column;
  // justify-content: space-ar;
  .topheader {
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
    background-color: #fff;
    height: 10vh;
    margin-bottom: 10px;
  }
  .model {
    height: 30vh;
    width: 100vw;
    background-color: #fff;

    .model-header {
      height: 20%;
      width: 90%;
      padding: 10px 0 10px 10px;
      overflow: hidden;
      .model-title {
        border-left: 2px solid red;
        padding: 0 5px;
        font-weight: bold;
        font-size: 1.1rem;
      }
      .model-title-desc {
        font-size: 0.7rem;
        color: gray;
      }
    }
    .model-slide {
      display: flex;
      flex-direction: row;
      // justify-content: ;
      overflow-x: scroll;
      scrollbar-width: none;
      -ms-overflow-style: none;
      .model-slide-son {
        display: flex;
        align-items: center;
        flex-direction: column;
        margin: 0 10px;
        img {
          max-width: 20vw;
          max-height: 13vh;
        }
        .model-slide-caption {
          font-weight: bold;
          font-size: 0.9rem;
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
