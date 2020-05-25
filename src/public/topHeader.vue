<template>
    <div class="topheader">
        <div class="icon">
        星尘
        </div>
        <div class="search" >
            <transition name="search-in" mode="out-in">
                <search class="search-cantainer" v-if="searchclick" @cancel="cancel"></search>
                <div v-else @click="search()" class="search-body">
                    <i class="fa fa-search"></i>
                </div>
            </transition>
        </div>
        <div class="user">

            <i class="fa fa-user-o"></i>
            <i class="fa fa-book"></i>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
             searchclick:false
        }
    },
    methods: {
        search(){
            this.searchclick = !(this.searchclick)
        },
        cancel(res){
            this.searchclick = res
        }
    },
}
</script>
<style lang="scss">
.topheader{
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    .icon{
        text-align: center;
        flex: 1;
    }
    .search{
        flex: 5;
        height: 5vh;
        margin-left: 10px ;
        .search-cantainer{
            height: 100vh;
            width: 100vw;
        }
        .search-body{
            height: 100%;
            width: 100%;
            opacity: 1;
            border-bottom: .5px solid grey;
            color: gray;
            i{
                margin: 8px 0 0 10%;
            }
        }
    }
    .user{
        margin: .5vh;
        flex: 2;
        font-size: 1.3rem;
        color: gray;
        text-align: right;
        i:nth-child(2){
            margin: 0 10px;
        }
    }


}
//过渡部分。
.search-in-leave-active{
    transition: all .2s ease;
}
// .search-in-leave,.search-in-enter-to{
//     height: 100%;
//     width: 100%;
// }
.search-in-leave-to,.search-in-enter{
    transform: scaleX(1.1);
    opacity: 0;
}
.search-in-enter-active{
    transition:all .4s ease-out;
}
</style>