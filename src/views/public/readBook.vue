<template>
  <div class="container">
    <div class="bgc" :style="bgc"></div>
    <div :class="['drawer', { activeLeft: drawer }]">
      <div class="cata" v-for="item in cata" :key="item.volumeId">
        <div class="catalogue-title">{{ item.volume }}</div>
        <div class="catalogue-body">
          <div
            :class="[
              'cata-item',
              chapterId == item1.chapterId ? 'cata-focus' : '',
            ]"
            v-for="item1 in item.chapter"
            :key="item1.chapterId"
            @click="goAssignChapter(item1.chapterId)"
          >
            <span>{{ item1.chapterName }}</span>
          </div>
        </div>
      </div>
    </div>
    <div :class="['setting', { activeSet: setting }]">
      <div class="font-bgc">
        <div class="bgc-title">背景</div>
        <div class="bgc-item">
          <span @click="changeBgc(1)" style="background-color:#CBBFB7"></span>
          <span @click="changeBgc(2)" style="background-color:#bdc3c"></span>
          <span @click="changeBgc(3)" style="background-color:#ecf0f1"></span>
          <span @click="changeBgc(4)" style="background-color:#34495e"></span>
        </div>
      </div>
      <div class="fontS">
        <svg
          t="1591108596418"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="3005"
          width="32"
          height="32"
          @click="fontSize += 1"
        >
          <path
            d="M631.1 266.9h152.2v41H631.1zM824.3 266.9h152.2v41H824.3zM783.3 307.8h41V460h-41zM783.3 114.6h41v152.2h-41z"
            p-id="3006"
            fill="#ffffff"
          ></path>
          <path
            d="M783.3 266.9h41v41h-41zM368.5 150.5L57.2 855.2h73.2l101.3-236.8h346.7l98.9 236.8h78.1L444.2 150.5h-75.7zM559 572H251.3l54.9-127.6c35.4-82.2 65.9-156.6 96.4-241.7h4.9c31.7 85.1 61 159.5 97.7 241.7L559 572z"
            p-id="3007"
            fill="#ffffff"
          ></path>
        </svg>
        <el-slider
          v-model="fontSize"
          :step="1"
          show-stops
          :min="minFontSize"
          :max="maxFontSize"
          input-size="large"
          class="slider"
        ></el-slider>
        <svg
          t="1591108474978"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2579"
          width="32"
          height="32"
          @click="fontSize -= 1"
        >
          <path
            d="M631.1 266.9h345.4v41H631.1zM368.5 150.5L57.2 855.2h73.2l101.3-236.8h346.7l98.9 236.8h78.1L444.2 150.5h-75.7zM559 572H251.3l54.9-127.6c35.4-82.2 65.9-156.6 96.4-241.7h4.9c31.7 85.1 61 159.5 97.7 241.7L559 572z"
            p-id="2580"
            fill="#ffffff"
          ></path>
        </svg>
      </div>
    </div>
    <div :class="['topheader', { activeTop: !topBottom }]" @click="goback()">
      <span><i class="fa fa-angle-left"></i>返回</span>
    </div>
    <div :class="['cbottom', { activeBottom: !topBottom }]">
      <span @click="drawer = !drawer"
        ><i class="fa fa-bars"></i>
        <div>目录</div>
      </span>
      <span @click="setting = !setting"
        ><i class="fa fa-font"></i>
        <div>设置</div></span
      >
      <span
        ><i class="fa  fa-moon-o"></i>
        <div @click="changeBgc(5)">夜间</div></span
      >
    </div>
    <div class="reading" v-if="indexBody >= 1">
      <div
        class="read-title"
        :style="{ fontSize: fontSize / 4 + 'rem', color: bgc.color }"
        id="miaodian0"
      >
        {{ chapterBody[0].chapterTitle }}
      </div>
      <div class="read-body">
        <div class="up-down"></div>
        <pre
          @click.self="openMenu($event)"
          :style="{ fontSize: fontSize / 4 + 'rem', color: bgc.color }"
          >{{ chapterBody[0].chapterBody.value }}</pre
        >
      </div>
    </div>
    <div class="reading" v-if="indexBody >= 2">
      <div
        class="read-title"
        id="miaodian1"
        :style="{ fontSize: fontSize / 4 + 'rem', color: bgc.color }"
      >
        {{ chapterBody[1].chapterTitle }}
      </div>
      <div class="read-body">
        <div class="up-down"></div>
        <pre
          @click.self="openMenu($event)"
          :style="{ fontSize: fontSize / 4 + 'rem', color: bgc.color }"
          >{{ chapterBody[1].chapterBody.value }}</pre
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // testbgc:"white",
      chapterId: this.$cookies.get("chapterId"),
      chapterBody: [],
      indexBody: 0,
      drawer: false,
      fontSize: 4,
      topBottom: false,
      maxFontSize: 9,
      minFontSize: 2,
      cata: [],
      setting: false,
      bgc: {
        backgroundColor: "#CBBFB7",
        color: "black",
      },
    };
  },
  created() {
    this.getBookBody(0);
    this.getcata();
    let that = this;
    window.onscroll = function() {
      //变量scrollTop是滚动条滚动时，距离顶部的距离
      var scrollTop = document.documentElement.scrollTop; //变量windowHeight是可视区的高度
      var clientHeight = document.documentElement.clientHeight; //变量scrollHeight是滚动条的总高度
      var scrollHeight = document.documentElement.scrollHeight; //滚动条到底部的条件
      if (scrollTop + clientHeight + 10 >= scrollHeight && scrollTop > 0) {
        that.getBookBody(1);
      }
    };
  },
  methods: {
    //逻辑，如果当前页面有
    getBookBody(res) {
      if (res) {
        this.axios
          .get(
            `${
              this.defaulturl
            }/api/Book/GetUpOrDownChapter?type=${2}&chapterid=${
              this.chapterId
            }`,
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
            // console.log("进入第一层");
            this.chapterId = res.data.Result.chapterId;
            this.$cookies.remove("chapterId");
            this.$cookies.set("chapterId", res.data.Result.chapterId);
            this.axios
              .get(
                this.defaulturl +
                  "/api/Book/GetChapter?chapterId=" +
                  this.chapterId,
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
                // console.log(this.chapterBody);
                this.indexBody += 1;
                let msg = {
                  chapterTitle: "",
                  chapterBody: {},
                };
                res.data.Result.chapter.forEach((item) => {
                  // console.log(item)
                  if (item.type == 0) {
                    msg.chapterTitle = item.value;
                  } else if (item.type == 1) {
                    msg.chapterBody = item;
                  }
                });
                this.chapterBody.push(msg);
                this.$nextTick(() => {
                  document.getElementById("miaodian1").scrollIntoView();
                });

                if (this.indexBody >= 3) {
                  // console.log(this.indexBody);
                  this.indexBody = 3;
                  this.chapterBody.shift();
                }
              });
          });
      } else if (!res) {
        this.axios
          .get(
            `${this.defaulturl}/api/Book/GetChapter?chapterId=${this.chapterId}`,
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
            this.indexBody += 1;
            let msg = {
              chapterTitle: "",
              chapterBody: {},
            };
            res.data.Result.chapter.forEach((item) => {
              // console.log(item)
              if (item.type == 0) {
                msg.chapterTitle = item.value;
              } else if (item.type == 1) {
                msg.chapterBody = item;
              }
            });
            this.chapterBody.push(msg);
            // console.log(this.chapterBody)
          });
      }
    },
    getcata() {
      this.axios
        .get(
          this.defaulturl +
            "/api/Book/GetBookIndex?bookId=" +
            this.$cookies.get("bookId"),
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
          this.cata = res.data.Result.bookIndices;
        });
    },
    openMenu($event) {
      // console.log(document.documentElement.scrollHeight);
      if (this.topBottom == true) {
        this.topBottom = false;
      } else if (
        $event.clientY > Math.floor(window.innerHeight / 3) &&
        $event.clientY < Math.floor(2 * (window.innerHeight / 3))
      ) {
        this.topBottom = this.topBottom = true;
      }
      if (this.drawer) {
        this.drawer = false;
      }
      if (this.setting) {
        this.setting = false;
      }
    },
    goback() {
      this.$router.go(-1);
    },
    //切换章节
    goAssignChapter(res) {
      this.axios
        .get(`${this.defaulturl}/api/Book/GetChapter?chapterId=${res}`, {
          headers: {
            Authorization:
              this.$cookies.get("token").token_type +
              " " +
              this.$cookies.get("token").access_token,
          },
        })
        .then((res) => {
          let msg = {
            chapterTitle: "",
            chapterBody: {},
          };
          res.data.Result.chapter.forEach((item) => {
            if (item.type == 0) {
              msg.chapterTitle = item.value;
            } else if (item.type == 1) {
              msg.chapterBody = item;
            }
          });
          this.indexBody = 1;
          this.chapterBody.splice(0, this.chapterBody.length, msg);
          this.$nextTick(() => {
            document.getElementById("miaodian0").scrollIntoView();
          });
        });
      this.$cookies.remove("chapterId");
      this.$cookies.set("chapterId", res);
      this.chapterId = res;
      this.drawer = false;
      this.topBottom = false;
    },
    changeBgc(res) {
      switch (res) {
        case 1: {
          this.bgc.backgroundColor = "#CBBFB7";
          this.bgc.color = "black";
          break;
        }
        case 2: {
          this.bgc.backgroundColor = "#bdc3c7";
          this.bgc.color = "black";
          break;
        }
        case 3: {
          this.bgc.backgroundColor = "#7f8fa6";
          this.bgc.color = "white";
          break;
        }
        case 4: {
          this.bgc.backgroundColor = "#34495e";
          this.bgc.color = "white";
          break;
        }
        case 5:{
          this.bgc.backgroundColor = "#353b48";
          this.bgc.color = "white";
        }
      }
    },
  },
  //改变背景
};
</script>
<style lang="scss" scoped>
.container {
  position: relative;
  width: 100vw;
  overflow: hidden;
  min-height: 100vh;
  .bgc {
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
    // background-image: url("../../assets/readbgc.jpeg");
    // background-size: contain;
    opacity: 0.8;
  }
  .drawer {
    position: fixed;
    left: 0;
    top: 7vh;
    height: 86vh;
    width: 80vw;
    background-color: black;
    opacity: .9;
    transform: translateX(-100%);
    transition: all 0.2s ease;
    z-index: 10;
    .cata {
      // width: 70%;
      // min-height: 86vh;
      padding: 10px;
      background-color: black;
      opacity: .9;
      .catalogue-title {
        margin-bottom: 10px;
        font-size: 0.6rem;
        color: gray;
      }
      .catalogue-body {
        .cata-item {
          padding: 5px;
          color: white;
          border-bottom: 0.1px solid rgba(178, 190, 195, 0.3);
          border-radius: 5px;
          &:hover {
            background-color: #dfe6e9;
          }
        }
        .cata-focus {
          background-color: #95a5a6;
        }
      }
    }
  }
  .setting {
    position: fixed;
    bottom: 7vh;
    left: 0;
    height: 30vh;
    width: 100%;
    background-color: black;
    opacity: 0.7;
    z-index: 9;
    transform: translateY(37vh);
    transition: all 0.2s ease;
    .font-bgc {
      .bgc-title {
        text-align: center;
        font-size: 1rem;
        color: white;
        margin: 10px;
      }
      .bgc-item {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
        height: 50px;
        width: 100%;
        border-bottom: 0.1 solid rgba(99, 110, 114, 0.6);
        span {
          text-align: center;
          height: 30px;
          width: 50px;
          background-color: #fff;
          border: 1px solid rgba(99, 110, 114, 0.6);
          border-radius: 5px;
        }
      }
    }
    .fontS {
      width: 100vw;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 10px 0;
      svg {
        flex: 1;
      }
      .slider {
        flex: 4;
      }
    }
  }

  .topheader {
    position: fixed;
    top: 0;
    left: 0;
    height: 7vh;
    width: 100vw;
    opacity: 0.7;
    background-color: black;
    color: white;
    transition: all 0.2s ease;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 1;
    span {
      height: 100%;
      margin: 0 20px;
      line-height: 3rem;
      i {
        margin: 0 5px;
      }
    }
  }

  .cbottom {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    height: 7vh;
    opacity: 0.7;
    background-color: black;
    color: white;
    font-size: 0.8rem;
    font-weight: 300;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    text-align: center;
    transition: all 0.2s ease;
    z-index: 10;
    span {
      flex: 1;
    }
    i {
      font-size: 1.5rem;
      font-weight: 200;
    }
  }
  .reading {
    .read-title {
      opacity: 0.7;
      font-size: 0.7rem;
      text-align: center;
      margin: 2px 0;
    }
    .read-body {
      margin: 0 10px;
      position: relative;
      pre {
        white-space: pre-wrap;
        font-size: 1rem;
        line-height: 1.7rem;
        z-index: 0;
        min-height: 100vh;
        // color:white;
      }
    }
  }
  //过渡效果
  .activeSet {
    transform: translateY(0);
  }
  .activeLeft {
    transform: translateY(0);
  }
  .activeTop {
    transform: translateY(-100%);
  }
  .activeBottom {
    transform: translateY(100%);
  }
}
</style>
