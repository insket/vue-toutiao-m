<template>
  <van-cell class="articleItem">
    <div slot="title" class="title van-multi-ellipsis--l2">
      {{ article.title }}
    </div>
    <div slot="label">
      <!-- 当图片有三张 -->
      <div class="cover-wrap" v-if="article.cover.type === 3">
        <div
          class="cover-wrap-item"
          v-for="(img, index) in article.cover.images"
          :key="index"
        >
          <van-image class="item" fit="cover" :src="img" />
        </div>
      </div>
      <div class="label-wrap">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }}评论</span>
        <span>{{date}}</span>
      </div>
    </div>
    <!-- 当图片只有一张 -->
    <van-image
      v-if="article.cover.type === 1"
      fit="cover"
      class="right-cover"
      :src="article.cover.images[0]"
    />
  </van-cell>
</template>

<script>
export default {
  name: "articleItem",
  data() {
    return {};
  },
  components: {},
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  computed: {
    date(){
      const date = this.article.pubdate.substr(0,10)
      // console.log(date);
      return date
    }
  },
  watch: {},
  methods: {}
};
</script>

<style lang="less" scoped>
.articleItem {
  .title {
    font-size: 16px;
    color: #3a3a3a;
  }
  /deep/ .van-cell__value {
    flex: unset;
    width: 116px;
    height: 73px;
    margin-left: 12px;
  }
  .right-cover {
    width: 116px;
    height: 73px;
  }
  .cover-wrap {
    display: flex;
    flex-wrap: nowrap;
    padding: 15px 0;
    .cover-wrap-item {
      flex: 1;
       overflow: hidden;
      &:not(:last-child) {
        padding-right: 4px;
      }
      .item{
        width: 100%;
        height: 73px;

      }
    }
  }
  .label-wrap{
    font-size: 11px;
    span{
      margin: 0 12px;
    }
  }
}
</style>
