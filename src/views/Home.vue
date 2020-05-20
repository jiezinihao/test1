<template>
  <div class="home">
    <topHeader class="topheader"></topHeader>
  </div>
</template>

<script>

export default {
  data(){
    return{
      
    }
}
};
</script>

<style lang="scss" scoped>
.home{
  min-height: 100vh;
  background-color: #f6f7f9;
  position: relative;
  .topheader{
    position: fixed;
    height: 6vh;
    width: 95vw;
    left: 50%;
    padding: 5px;
    transform: translateX(-50%);
    background-color: #fff;
  }
}

</style>
