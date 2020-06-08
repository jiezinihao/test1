<template>
  <div class="container">
    <div class="top-center">
      <div class="topHeader">
        <span @click="goHome()">
          <i class="fa fa-chevron-left"></i>个人中心</span
        >
        <span class="tophader-right">
          <i class="fa fa-search"></i>
        </span>
      </div>
      <div class="center">
        <img :src="defaulturl + usermsg.image" alt="" />
        <p>
          {{ usermsg.userName
          }}<i :class="['fa', usermsg.sex ? 'fa-male' : 'fa-female']"></i>
        </p>
        <p>UID:{{ usermsg.UID }}</p>
        <el-button
          style=" height: 30px;width: 70px; padding:7px;font-size:5px;opacity:.6;"
          @click="checkIn()"
          >{{isCheck?"已签到":"点击签到"}}</el-button
        >
      </div>
    </div>
    <div class="btn-group">
      <div class="xinceng"><span>星尘：</span> {{ usermsg.integral }}</div>
      <div class="chiugeng">
        <span>已催更：</span><img src="../assets/shigong.png" alt="" />...
      </div>
    </div>
    <div class="opeartion">
      <div>
        <img src="../assets/xiaoxi.png" alt="" /><span>我的消息</span>
        <i class="fa fa-angle-right"></i>
      </div>
      <div>
        <img src="../assets/chongzhi.png" alt="" /><span>充值中心</span>
        <i class="fa fa-angle-right"></i>
      </div>
      <div>
        <img src="../assets/jinyan.png" alt="" /><span>经验等级</span>
        <i class="fa fa-angle-right"></i>
      </div>
      <div>
        <img src="../assets/caozuo.png" alt="" /><span>用户操作</span>
        <i class="fa fa-angle-right"></i>
      </div>
      <div>
        <img src="../assets/bangzhu.png" alt="" /><span>帮助反馈</span>
        <i class="fa fa-angle-right"></i>
      </div>
    </div>
    <copy-right></copy-right>
  </div>
</template>
<script>
export default {
  data() {
    return {
      sex: 0,
      usermsg: {},
      isCheck:false
    };
  },
  created() {
    this.getuserMsg();
    this.getUserBook();
  },
  methods: {
    goHome() {
      this.$router.push({ name: "home" });
    },
    getuserMsg() {
      this.axios
        .get(this.defaulturl + "/api/User/getUserInfo", {
          headers: {
            Authorization:
              this.$cookies.get("token").token_type +
              " " +
              this.$cookies.get("token").access_token,
          },
        })
        .then((res) => {
          console.log(res);
          this.usermsg = res.data.Result;
        });
    },
    getUserBook() {
      this.axios
        .get(this.defaulturl + "/api/User/GetUserBooks?offset=1&size=20", {
          headers: {
            Authorization:
              this.$cookies.get("token").token_type +
              " " +
              this.$cookies.get("token").access_token,
          },
        })
        .then((res) => {
          // console.log(res);
        });
    },
    //签到模组
    checkIn(){
      this.axios.get(this.defaulturl + "/api/Community/CheckIn",{
          headers: {
            Authorization:
              this.$cookies.get("token").token_type +
              " " +
              this.$cookies.get("token").access_token,
          },
        })
        .then((res)=>{
          this.isCheck = true
          this.getuserMsg()
        })
        .catch((err)=>{
          this.$message({
            message:"今天已经签到过了哦！",
            showClose:true
          })
        })
    }
  },
};
</script>
<style lang="scss" scoped>
.container {
  .top-center {
    background-image: url("../public/userbgc.jpg");
    background-size: cover;
    // filter: blur(10px);
    // opacity:;
  }
  .topHeader {
    width: 94%;
    height: 7vh;
    padding: 0 3vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    border-bottom: 0.1px solid rgba(236, 240, 241, 1);
    opacity: 0.8;
    i {
      height: 100%;
      width: 10vw;
      color: gray;
      font-size: 1rem;
    }
  }
  .center {
    width: 100vw;
    height: 30vh;
    // background-color: #dfe6e9;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    img {
      border: 0.6px solid gray;
      border-radius: 50%;
      height: 12vh;
    }
    p {
      margin: 2px;
      font-size: 0.9rem;
      color: gray;
      i {
        margin: 0 10px;
        color: #636e72;
      }
      .fa-female {
        color: #e84393;
      }
    }
  }
  .btn-group {
    height: 7vh;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    color: gray;
    font-size: 0.8rem;
    margin-bottom: 10px;
    border: 0.1px solid rgba(178, 190, 195, 0.7);
    border-style: none solid;
    div {
      flex: 1;
      text-align: center;
      &:first-child {
        border-right: 1px solid rgba(178, 190, 195, 0.7);
      }
    }
    img {
      height: 14px;
    }
    span {
      font-size: 1.1rem;
    }
  }
  .opeartion {
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    div {
      width: 95%;
      margin: 10px;
      padding-bottom: 10px;
      border-bottom: 1px solid rgba(178, 190, 195, 0.7);
      display: flex;
      justify-content: space-between;
      align-items: center;
      img {
        height: 7vw;
        margin: 0 10px;
      }
      span {
        flex: 1;
      }
      i {
        padding: 0 10px;
      }
    }
  }
}
</style>
