<template>
  <div class="home-container">
  <!-- 导航栏 -->
    <van-nav-bar class="app-nav-bar">
      <van-button class="searchBtn" slot="title" icon="search" type="info" round
        >搜索</van-button
      >
    </van-nav-bar>

  <!-- tab文章列表 -->
  <van-tabs v-model="active">
    <van-tab
     :title="channel.name"
     v-for="(channel, index) in channels" :key="index"
    >
      <!-- 文章列表 -->
      <ArticeList :channel='channel'></ArticeList>
    </van-tab>
  </van-tabs>

  </div>

</template>

<script>
import {getUserChannels} from '@/api/user'
import ArticeList from './conponents/artice-list.vue'
export default {
  name: "HomeIndex",
  data() {
    return {
      active: 0,
      channels:[]   //频道列表
    };
  },
  components:{
    ArticeList
  },
  created() {
    this.loadChannels()
  },
  methods: {
    async loadChannels(){
      //请求获取数据
      const {data} = await getUserChannels()
      console.log(data);
      this.channels = data.data.channels
    }
  }
};
</script>

<style lang="less" scoped>
.home-container {
  /deep/ .van-nav-bar__title {
    max-width: unset;
  }
  .searchBtn {
    width: 277px;
    height: 32px;
    background: #5babfb;
    border: none;
    .van-button__text {
      font-size: 14px;
    }
    .van-icon {
      font-size: 18px;
    }
  }
}
</style>
