<template>
  <div class="channel-edit" center>
    <!-- 我的频道 -->
    <van-cell :border="false">
      <div class="channel-title" slot="title">我的频道</div>
      <van-button
        style="width:50px"
        type="danger"
        plain
        round
        size="mini"
        @click="isEdit=!isEdit"
      >{{isEdit?'完成':'编辑'}}</van-button
      >
    </van-cell>
    <!-- 频道列表 -->
    <van-grid :gutter="10">
      <van-grid-item
        class="grid-item"
        :icon="(isEdit && item.id !==0) ? 'clear' : ''"
        v-for="item in userChannels"
        :key="item.id"
        :text="item.name"
        @click="onUserChannelClick(item.id)"
      />
    </van-grid>

    <!-- 频道推荐 -->
    <van-cell :border="false">
      <div slot="title">频道推荐</div>
    </van-cell>
    <!-- 频道列表 -->
    <van-grid :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(remchannel, index) in recommendChannels"
        :key="index"
        :text="remchannel.name"
        @click="onAdd(remchannel)"
      />
    </van-grid>
  </div>
</template>

<script>
//分类编辑组件
import { getAllChannels} from "@/api/channel";
import { mapState } from 'vuex'
import {setItem} from '@/utils/storage'
export default {
  name: "ChannelEdit",
  data() {
    return {
      allChannels: [], //所有频道数据
      isEdit: false //控制编辑删除按钮的状态
    };
  },
  props: {
    userChannels: {
      type: Array,
      required: true
    }
  },
  mounted() {
    this.loadAllChannels();
  },
  methods: {
    async loadAllChannels() {
      const { data } = await getAllChannels();
      console.log(data);
      this.allChannels = data.data.channels;
    },
    async onAdd(remchannel) {
      this.userChannels.push(remchannel);

      //数据持久化
      //登录了，数据存储到服务器
      if (this.user) {
        // await addUserChannel({
        //   channels:[
        //     {
        //       id:remchannel.id,
        //       seq:this.userChannels.length
        //     }
        //   ]
        // })
      // }else{
        //未登录，存储到本地
        setItem('userChannels',this.userChannels)
      }
    },
    onUserChannelClick(id){
      //编辑状态  删除频道
      if (this.isEdit && id !== 0) {
        this.deleteChannel(id)
      }else{
        //非编辑状态切换到响应分类
        this.switchChannel(id)
      }
    },
    deleteChannel(id){
      this.userChannels.splice(id,1)
      if (this.user) {
        setItem('userChannels',this.userChannels)
      }
      //数据持久化
    },
    switchChannel(id){

    }
  },
  computed: {
    // 推荐频道 列表
    recommendChannels() {
      //所有频道-我的频道=剩下的频道
      return this.allChannels.filter(channel => {
        //判断channel是否属于我的频道
        return !this.userChannels.find(userChannel => {
          return userChannel.name === channel.name;
        });
      });
    },
    ...mapState(['user'])
  }
};
</script>

<style lang="less" scoped>
.channel-edit {
  padding-top: 54px;
  .channel-title {
    font-size: 16px;
    color: #333;
  }
  .grid-item {
    width: 70px;
    height: 35px;
    /deep/.van-grid-item__content {
      background: #f4f5f6;
      // border-radius: 9px;
      .van-grid-item__text {
        font-size: 14px;
        color: #222;
        margin-top: 0;
      }
    }
    /deep/.van-icon {
      position: absolute;
      right: -5px;
      font-size: 15px;
      top: -5px;
      color: #ccc;
    }
  }
}
</style>
