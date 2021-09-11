<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="app-nav-bar">
      <van-button class="searchBtn" slot="title" icon="search" type="info" round
        >搜索</van-button
      >
    </van-nav-bar>

    <!-- tab标签列表 -->
    <van-tabs v-model="active" class="channel-tabs">
      <van-tab
        :title="channel.name"
        v-for="(channel, index) in channels"
        :key="index"
      >
        <!-- 文章列表 -->
        <ArticeList :channel="channel"></ArticeList>
      </van-tab>

      <!-- 汉堡按钮 -->
      <!--  汉堡按钮把最后i一个标签挡住了，多添加一个slot，占位-->
      <div slot="nav-right">&nbsp;&nbsp;&nbsp;</div>
      <div
       slot="nav-right"
       @click="isChannelEditShow=true"
        class="icon-wrap"
        >
        <van-icon class="icon" name="bars"/>
      </div>
    </van-tabs>

    <!-- 弹出层 -->
    <van-popup
     v-model="isChannelEditShow"
     position="bottom"
     class="channel-edit-popup"
     duration='.4'
     closeable
     close-icon-position="top-left"
     get-container="body"
     >
     <ChannelEdit :user-channels='channels'></ChannelEdit>
     </van-popup>

  </div>
</template>

<script>
import { getUserChannels } from "@/api/user";
import ArticeList from "./conponents/artice-list.vue";
import ChannelEdit from "./conponents/channel-edit.vue";
import { mapState} from 'vuex'
import {getItem} from '@/utils/storage'
export default {
  name: "HomeIndex",
  data() {
    return {
      active: 0,
      channels: [], //频道列表
      isChannelEditShow:false  //控制弹出编辑分类的显示状态
    };
  },
  components: {
    ArticeList,
    ChannelEdit
  },
  created() {
    this.loadChannels();
  },
  methods: {
    async loadChannels() {
      //请求获取数据
      const { data } = await getUserChannels();
      // // console.log(data);
      // this.channels = data.data.channels;
      if (this.user) {
        this.channels =getItem('userChannels')
      }else{
        this.channels = data.data.channels;
      }
    }
  },
  computed:{
    ...mapState(['user'])
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
  /deep/ .channel-tabs {
    .van-tab {
      border-right: 1px solid rgb(235, 235, 235);
      border-bottom: 1px solid rgb(235, 235, 235);
    }
    .van-tabs__line {
      width: 20px;
      height: 3px;
      background-color: skyblue;
      flex: 1;
      bottom: 20px;
    }
  }
  .icon-wrap{
    position: fixed;
    right: 0;
    height: 44px;
    .icon{
      line-height: 44px;
      font-size: 30px;
      background: rgb(255, 255, 255);
      opacity: .7;
    }
    &:before{
      content:'|' ;
      font-size: 24px;
      position: absolute;
      top: 7px;
      left: -4px;
      color: rgb(158, 154, 154);
    }
  }
}
.channel-edit-popup{
  height: 100%;
}
</style>
