<template>
  <div class="login-container">
    <!-- 顶部nav -->
    <van-nav-bar
      title="登錄/注册"
      left-arrow
      @click-left="$router.back()"
      class="app-nav-bar"
    />

    <!-- 登陆表单 -->
    <!-- 基于vant的表单验证：
          1. 使用van-form组件包裹所有的表单项van-field
          2. 给van-form绑定submit事件
          3. 定义验证规则
     -->
    <van-form
      @submit="onLogin"
      @failed="onFailed"
      validate-first
      ref="login-form"
      :show-error='false'
      :show-error-message="false"
     >
      <van-field
        v-model="user.mobile"
        clearable
        icon-prefix="iconfont"
        left-icon="shouji"
        center
        placeholder="请输入手机号"
        name='mobile'
        :rules="formRules.moblie"
      />
      <van-field
        v-model="user.code"
        clearable
        icon-prefix="iconfont"
        left-icon="yanzhengma"
        center
        placeholder="显示请输入验证码"
        name='code'
        :rules="formRules.code"
      >
        <template #button>
          <van-button
            v-if="isCountDownShow"
            size="mini"
            round
            class="send-btn"
            @click.prevent="onSendSms"
            :loading="isSendSmsLoading"
          >
            发送验证码
          </van-button>
          <!-- 倒计时按钮 -->
          <van-count-down
            v-else
            :time="1000 * 60"
            format='ss s'
            @finish='isCountDownShow = true'
          />
        </template>
      </van-field>
       <!--登录按钮 -->
      <div class="login-btn-wrap">
        <van-button class="login-btn" type="info" block>
          登录</van-button>
      </div>
    </van-form>

    <div class="Tips">
      <span>万能通行证 mobild:13911111111  code:246810</span>
    </div>
  </div>
</template>

<script>
import { login,sendSms } from "@/api/user.js";
import { Toast } from 'vant'
export default {
  name: "loginIndex",
  data() {
    return {
      user: {
        mobile: "", //手机号
        code: "" //验证码
      },
      //表单的正则校验
      formRules:{
        moblie:[
          { required: true, message: '请输入手机号' },
            {pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,message:'手机号格式错误'}
        ],
        code:[
          { required: true, message: '请输入验证码'},
          {pattern:/^\d{6}$/,message:'验证码格式错误'}
        ]
      },
      isCountDownShow:true,  //控制倒计时和发送按钮的显示隐藏
      isSendSmsLoading:false   //发送验证码按钮的loading
    };
  },
  methods: {
    //点击登录
    async onLogin() {
      Toast.loading({
        message: '正在登陆...',
        forbidClick: true,
        duration:0    //  展示时长，，为0时，不会消失
      });
      //  1 找到数据接口
      //  2 封装请求方法
      //  3 请求调用登录
      try {
        const {data} = await login(this.user);
        // console.log(data);
        Toast.success('登陆成功');

        //将会返回的用户登录token放到vuex中
        this.$store.commit('setUser',data.data)
      } catch (error) {
        // console.log('登陆失败',error);
        Toast.fail('登陆失败,手机号或密码错误');
      }
      //  4 处理响应结果
    },

      //自定义表单验证错误提示
    onFailed(error){
      if (error.errors[0]) {
        this.$toast({
          message:error.errors[0].message,
          position:'top'
        })
      }
    },

    async onSendSms(){
      //校验手机号码
      //验证通过，发送验证码，接收短信  输入验证码，请求登录
      //隐藏登录按钮，显示倒计时


     try {
       this.isSendSmsLoading = true  //展示按钮的loading
       const validataRes = await this.$refs['login-form'].validate('mobile')
       const res = await sendSms(this.user.mobile)
       //短息发出，隐藏发送按钮，显示倒计时
       this.isCountDownShow = false
     } catch (error) {
       let message = ''
       if (error && error.reponse && error.request.status === 429) {
         //发送短信太频繁提示
          message = '请勿频繁发送'
       }else if(error.name === 'mobile'){
         //表单验证失败的错误提示
          message = error.message
       }else{
         message = '网络出现问题了，稍后再试一下吧'
       }
       this.$toast({
          message,
          position:'top'
        })
     }
     this.isSendSmsLoading = false  //无论发送验证码成功或失败，都要关闭loading'状态
    }
  }
};
</script>

<style lang="less" scoped>
.login-container {
  .login-btn-wrap {
    padding: 26px 16px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
      .van-button__text {
        font-size: 15px;
      }
    }
  }
  .send-btn {
    width: 76px;
    height: 23px;
    background-color: #ededed;
    .van-button__text {
      font-size: 11px;
      color: #666666;
    }
  }
  .Tips{
    width: 200px;
    margin: 0 auto;
    font-size: 16px;
    color: #ccc;
  }
}
</style>
