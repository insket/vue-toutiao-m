<template>
  <div class="articeList">
    <van-pull-refresh
     v-model="isRefreshLoading"
     @refresh="onRefresh"
     :success-text="refreshSuccesstext"
     :success-duration='1200'
     >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
      <ArticleItem
       v-for="(article, index) in articles"
       :key="index"
       :article='article'
       >

      </ArticleItem>
        <!-- <van-cell
          v-for="(article, index) in articles"
          :key="index"
          :title="article.title"
        /> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from "@/api/article.js";
import ArticleItem from '@/components/articleItem'
export default {
  name: "ArticeList",
  data() {
    return {
      articles: [],
      loading: false,
      finished: false,
      timestamp: null,  //获取下一页数据的时间戳
      isRefreshLoading:false,   //下拉刷新的loading
      refreshSuccesstext:''   //下拉刷新成功的提示文本
    };
  },
  components: {ArticleItem},
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  computed: {},
  watch: {},
  methods: {
    async onLoad() {
      // 1 请求获取数据
      const { data } = await getArticles({
        channel_id: this.channel.id, //频道id
        timestamp: this.timestamp || Date.now(), //时间戳，请求新的推荐数据传当前的时间戳，请求历史数据传指定时间戳
        with_top: 0 //是否包含指定文章  1 true 0 false
      });
      // console.log(data);
      // 2 把数据放到list数组中
      const { results } = data.data;
      this.articles.push(...results);
      // 3 设置本次价值状态结束
      this.loading = false;
      // 4 数据全部加载完成
      if (results.length) {
        //更新获取下一页的数据
        this.timestamp = data.data.pre_timestamp;
      } else {
        //没有数据，把加载状态设置为结束
        this.finished = true;
      }
    },

    async onRefresh(){
      //下拉刷新时，isRefreshLoading会自己展示loading变为true
      // 1  请求获取数据
      const { data } = await getArticles({
        channel_id: this.channel.id, //频道id
        timestamp: Date.now(),
        with_top: 0 //是否包含指定文章  1 true 0 false
      });
      // 2  把数据额放到数据顶部列表
      const {results} = data.data
      this.articles.unshift(...results)
      // 3  关闭刷新状态loading
      this.isRefreshLoading = false

      this.refreshSuccesstext = `更新了${results.length}条数据`
    }
  }
};
</script>

<style lang="less" scoped>
.articeList {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 50px;
  top: 90px;
  overflow: scroll;
}
</style>
