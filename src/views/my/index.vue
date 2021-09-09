<template>
  <div class="my-container">
    <!-- 基本信息 -->
    <van-cell-group v-if="user" class="myInfo">
      <van-cell center class="baseInfo" :border="false">
        <van-image
          class="avatar"
          slot="icon"
          round
          fit="cover"
          :src="currentUser.photo"
        />
        <div slot="title" class="name">{{currentUser.name}}</div>
        <van-button size="small" round class="updataBtn">编辑资料</van-button>
      </van-cell>
      <!--  -->
      <van-grid :border="false" class="dataInfo">
        <van-grid-item class="dataInfoItem">
          <div class="ItemWrap" slot="text">
            <div class="count">{{currentUser.art_count}}</div>
            <div class="text">头条</div>
          </div>
        </van-grid-item>
        <van-grid-item class="dataInfoItem">
          <div class="ItemWrap" slot="text">
            <div class="count">{{currentUser.follow_count}}</div>
            <div class="text">关注</div>
          </div>
        </van-grid-item>
        <van-grid-item class="dataInfoItem">
          <div class="ItemWrap" slot="text">
            <div class="count">{{currentUser.fans_count}}</div>
            <div class="text">粉丝</div>
          </div>
        </van-grid-item>
        <van-grid-item class="dataInfoItem">
          <div class="ItemWrap" slot="text">
            <div class="count">{{currentUser.like_count}}</div>
            <div class="text">获赞</div>
          </div>
        </van-grid-item>
      </van-grid>
    </van-cell-group>
    <!-- 未登录状态 -->
    <div v-else class="noLogin">
      <img @click="$router.push('/login')" src="./image/mobile.png" alt="" />
      <span>登录/注册</span>
    </div>

    <!-- 收藏历史 -->
    <van-grid class="navGrid mb-4" :column-num="2">
      <van-grid-item
        class="navGridItem"
        icon-prefix="iconfont"
        icon="shoucangxiao"
        text="收藏"
      />
      <van-grid-item
        class="navGridItem"
        icon-prefix="iconfont"
        icon="lishi"
        text="历史"
      />
    </van-grid>
    <!-- 功能列表 -->
    <van-cell title="消息通知" is-link to="" />
    <van-cell class="mb-4" title="小智同学" is-link to="" />
    <van-button block class="logoutCell" v-if="user" @click="onLogout"
      >退出登录</van-button
    >
  </div>
</template>

<script>
import { mapState } from "vuex";
import {getCurrentUser} from '@/api/user'
export default {
  name: "MyIndex",
  data() {
    return {
      currentUser:{}    //当前用户登录信息
    };
  },
  created() {
   this.loadCurrentUser()
  },
  computed: {
    ...mapState(["user"])
  },
  methods: {
    onLogout() {
      //提示用户确认退出
      this.$dialog.confirm({
        title: "推出提示",
        message: "确认退出吗"
      })
        .then(() => {
          //清楚用户登陆状态
          this.$store.commit('setUser',null)
        })
        .catch(() => {
          // on cancel
        });
    },
    async loadCurrentUser(){
      const {data} = await getCurrentUser()
      console.log(data.data.data);
      this.currentUser = data.data.data
    }
  }
};
</script>

<style lang="less" scoped>
.my-container {
  .myInfo {
    background: url("./image/banner.png");
    background-size: cover;
    .baseInfo {
      background-color: unset;
      height: 115px;
      box-sizing: border-box;
      padding-top: 38px;
      padding-bottom: 11px;
      .avatar {
        height: 66px;
        width: 66px;
        border-radius: 50%;
        border: 1px solid #fff;
        box-sizing: border-box;
        margin-right: 11px;
      }
      .name {
        color: #fff;
        font-size: 15px;
      }
      .updataBtn {
        height: 20px;
        font-size: 10px;
        color: #666;
      }
    }
    .dataInfo {
      .dataInfoItem {
        height: 65px;
        color: #fff;
        .ItemWrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          .count {
            font-size: 18px;
          }
          .text {
            font-size: 12px;
          }
        }
      }
    }

    /deep/ .van-grid-item__content {
      background-color: unset;
    }
  }
  .noLogin {
    height: 180px;
    background: url("./image/banner.png");
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      width: 99px;
      height: 99px;
    }
    span {
      font-size: 16px;
      color: #fff;
      padding-top: 5px;
    }
  }
}
/deep/ .navGrid {
  .navGridItem {
    height: 70px;
    .iconfont {
      font-size: 22px;
    }
    .iconfont-shoucangxiao {
      color: #eb5253;
    }
    .iconfont-lishi {
      color: #ff9d1d;
    }
  }
}
.logoutCell {
  color: #d86262;
}
.mb-4 {
  margin-bottom: 4px;
}
</style>
