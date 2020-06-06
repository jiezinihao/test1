<template>
    <div class="container">
        <div class="rethome" @click="retHome">
            &lt;回到首页
        </div>
        <div class="title">
        <p>星尘 </p> 
        </div>
        <div class="lbody">
            <input type="text" v-model="username" placeholder="输入邮箱/手机号/用户名">
            <div class="verification" v-show="isRegister">
                <input type="text" v-model="verification" placeholder="输入验证码" >
                <el-button class="ver-button" @click="getverification">获取验证码</el-button>
            </div>
            <input type="password" v-model="password" placeholder="密码">
            <input type="password" v-model="repassword" placeholder="确认密码" v-show="isRegister">
            <el-button class="lbody-button" type="paimary" v-show="isRegister==false" @click="postlogin">登录</el-button>
            <el-button class="lbody-button" type="paimary" v-show="isRegister==true" @click="postregister">注册</el-button>
        </div>
        
        <div class="slide">
            <span @click="gotoregister()" v-show="isRegister==false">注册</span>
            <span @click="gotoregister()" v-show="isRegister==true">登录</span>
            <span>|</span>
            <span>忘记密码</span>
        </div>
        <div class="exinfo">
            <div class="exinfo-top"><span>版权归属星尘工作室</span></div>
            <div class="exinfobuttom">
                <span>帮助反馈</span>
            </div>
        </div>
        <div class="downapp">
        <p>下载星尘小说app</p>
            
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            isRegister:false,
            username:"",
            password:"",
            verification:"",
            repassword:""
        }
    },
    methods: {
        retHome(){
            this.$router.push('home')
        },
        //本页面的注册 or 登录渲染
        gotoregister(){
            this.isRegister = !this.isRegister
        },
        //登录请求
        postlogin(){
            let msg = {
                user: this.username,
                passWord: this.password
            }
            this.axios.post(this.defaulturl + "/api/Login/emailLogin",msg)
            .then((res)=>{
                this.$message({
                    showClose:true,
                    message:"登录成功",
                    type:"success"
                })
                if(res.status == 200){
                        
                    this.$router.push('home')
                    this.$cookies.set("token",res.data.Result.token)
                    // console.log(this.$cookies.get("token"))
                }

            })
            .catch((err)=>{
                this.$message({
                    showClose:true,
                    message:"账号或密码错误",
                    type:"danger"
                })
            })
            
        },
        //发送验证码
        getverification(){
            if(this.username == ""){
                alert("邮箱不能为空")

            }else{
                this.axios
                .get(this.defaulturl + "/api/Login/getValidateCode?eMail=" + this.username)
                .then((res)=>{
                    if(res.status == 200){
                        alert("验证码发送成功")
                    }
                })
                .catch(()=>{
                    alert("验证码发送失败,请检查邮箱")
                })
            }
        },


        //注册请求
        postregister(){
            // if(this.verification == "" || this.password == "" ||this.username ==""){
            //     alert("不能输入空")
            // }
            if(this.password != this.repassword)
            { alert("两次输入密码不同")}
               
            else{
                let msg = {
                    eMail: this.username,
                    passWord:this.password,
                    ValidateCode:this.verification
                }
                this.axios.post(this.defaulturl + "/api/Login/emailEnroll",msg)
                .then((res)=>{
                    if(res.status == 200){
                        alert("注册成功！返回登录")
                        this.isRegister = false
                    }
                })
                .catch(function (error) {

                    if(error.response.status == 400){
                        alert("请输入邮箱!")
                    }else{
                        alert(error.response.data.Message)
                    }
                });
            }
            
        }

    },
}
</script>

<style lang="scss" scoped>
    .container{
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        position: relative;
        .rethome{
            position: absolute;
            left: 0;
            padding: 10px;
            color:#00a8ff;
        }
        .title{
            flex: 3;
            transform: translateY(20%);
            p{
                font-size: 2rem;
                color: #22a6b3;
            }
        }
        .lbody{
            flex: 4;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            .verification{
                position: relative;
                input{
                    display: inline-block;

                }
                .ver-button{
                    position: absolute;
                    right: 0;
                    width: 40%;
                    height: 80%;
                    padding: 0;
                }
            }

            input{
                display: block;
                margin: 5px 0;
                padding: 5px;
                font-size: 1.2rem;
                border: none;
                outline: none;
                border-bottom: solid;
                border-width: 1px;
                transition:all .3s ease;
                opacity: .3;
            }

            input:focus{
                opacity: 1;
            }
            input:focus::placeholder{
                color: #fff;
                opacity: .3;
            }
            .lbody-button{
                margin-top: 10px;
                width:60%;
                color:#7ed6df;
            }

        }
        .slide{
            flex: 2;
            span{
                // margin: 0 10px;
                padding: 10px;
                color: #22a6b3;
            }

        }
        .exinfo{
            flex: 1;
            width: 100%;
            text-align: center;
                font-size: .4rem;
                color: gray;
            .exinfobuttom{
                color: #7ed6df;
            }
        }
        .downapp{
            width: 100%;
            height: 6vh;
            background-color: #ff7979;
            text-align: center;
            border-radius: 10px 10px 0 0;
            p{
                transform: translateY(-5px);
            }
        }

    }
</style>