<template>
    <div class="search-quanping">

        <div class="searchlab">
            <el-input class="searchbody" v-model="input" placeholder="搜索"></el-input>
            <div class="btu">
            <el-button size="mini" v-if="searchIsNull" @click="backhome()">取消</el-button>
            <el-button type="primary" size="mini"  v-else>搜索</el-button>
            </div>
        </div>
        

    </div>

</template>

<script>
export default {
    data(){
        return{
            input:"",
        }
    },
    computed:{
        searchIsNull:function(){
            return this.input == ""
        }
    },
    methods: {
        backhome(){
            this.$emit('cancel',false)
        }
    },
}
</script>
<style lang="scss" scoped>
    .search-quanping{
        position:absolute;
        left: 50%;
        top:0;
        width: 100%;
        height: 100%;
        text-align: center;
        background-color: #fff;
        transform: translate(-50%);
        .searchlab{
            height: 6vh;
            position: relative;
            background-color: #fff;
            .searchbody{
            position: absolute;
            left: 5px;
            top:5px;
            width: 80%;
            height: 100%;
            }
            .btu{
                button{
                position: absolute;
                right: 5px;
                top:5px;
                height: 100%;
                }
            }
        }
    }
</style>