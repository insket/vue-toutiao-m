<template>
  <div class="layout-container">
      <!-- 子路由出口 -->
      <router-view></router-view>

      <!-- 底部导航栏 -->
      <van-tabbar v-model="active" route>
        <van-tabbar-item to="/" icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item to="/qa" icon="search">问答</van-tabbar-item>
        <van-tabbar-item to="/video" icon="video-o">视频</van-tabbar-item>
        <van-tabbar-item to="/my" icon="contact">我的</van-tabbar-item>
      </van-tabbar>
  </div>
</template>

<script>
export default {
  name:'LayoutIndex',
  data() {
    return {
       active: 0
    }
  },
  components:{},
  props:{},
  computed:{},
  watch:{},
  methods: {},
}
</script>

<style lang="less" scoped>

</style>

