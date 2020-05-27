<template>
  <div id="app">
    <router-link to="/"></router-link>
    <transition :name="appTrs" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      appTrs: "",
    };
  },
  watch: {
    $route(to, from) {
      // eslint-disable-next-line
      if (to.path != "/home") {
        this.appTrs = "appLeaveTrs";
        // eslint-disable-next-line
      } else if (to.path == "/home") {
        this.appTrs = "appEnterTrs";
      }
    },
  },
};
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html div::-webkit-scrollbar {
  width: 0 !important;
}

//过渡部分
//离开home过渡效果

.appLeaveTrs-enter {
  transform: translateX(100vw);
}
.appLeaveTrs-leave-to {
  transform: translateX(-100vw);
}

.appLeaveTrs-enter-active {
  transition: all 0.2s ease;
}
.appLeaveTrs-leave-active {
  transition: all 0.2s ease;
}

.appLeaveTrs-enter-to,
.appLeaveTrs-leave {
  transform: translateX(0);
}

//进入home组件效果
.appEnterTrs-enter {
  transform: translateX(-100vw);
}
.appEnterTrs-leave-to {
  transform: translateX(100vw);
}
.appEnterTrs-enter-active {
  transition: all 0.2s ease;
}
.appEnterTrs-leave-active {
  transition: all 0.2s ease;
}

.appEnterTrs-enter-to,
.appEnterTrs-leave {
  transform: translateX(0);
}
</style>
