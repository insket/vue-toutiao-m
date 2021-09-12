<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="(item,index) in list"
        :key="index"
         :title="item.title"
       />
    </van-list>
  </div>
</template>

<script>
import {getSearchResult} from '@/api/search'
export default {
  name: "searchResult",
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page:1,   //页码
      perPage:10    //每页大小
    };
  },
  components: {},
  props: {
    value:{
      type:String,
      required:true
    }
  },
  computed: {},
  watch: {},
  methods: {
    async onLoad() {
      const {data} = await getSearchResult({
        page:this.page,   //页码
        per_page:this.perPage,   //每页大小
        q :this.value    //搜索的字符
      })
      // console.log(data);
      const {results} = data.data
      this.list.push(...results)

      this.loading = false

      if (results.length) {
        this.page++
      }else{
        this.finished = true
      }
    }
  }
};
</script>

<style lang="less" scoped>
.search-result{
  position: fixed;
  left: 0;
  right: 0;
  top: 54px;
  bottom: 0;
  overflow: scroll;
}
</style>
