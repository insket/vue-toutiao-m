<template>
  <div class="">
    <!-- 搜索栏 -->
    <form action="/">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch(value)"
        @cancel="$router.back(-1)"
        background="#3296fa"
        @focus="isResultShow=false"
      />
    </form>

    <!-- 搜索结果 -->
    <searchResult
      v-if="isResultShow"
      :value='value'
     ></searchResult>
    <!-- 联想建议 -->
    <searchSuggestion
     :value='value'
      v-else-if="value"
      @search='onSearch'
    ></searchSuggestion>
    <!-- 历史记录 -->
    <searchHistory
      v-else
      :serachHistorys='serachHistorys'
      @search='onSearch'
    ></searchHistory>
  </div>
</template>

<script>
import { Toast } from "vant";
import {setItem,getItem} from '@/utils/storage'
import searchSuggestion from './components/search-suggestion.vue'
import searchHistory from './components/search-history.vue'
import searchResult from './components/search-result.vue'
export default {
  name: "Search",
  data() {
    return {
      value: "",
      isResultShow:false,   //控制搜索结果显示状态
      serachHistorys:getItem('searchHistort') || []  //搜索历史数据
    };
  },
  components: {
    searchSuggestion,
    searchHistory,
    searchResult
  },
  methods: {
    onSearch(value) {
      this.value = value
      Toast('正在搜索');
      const index = this.serachHistorys.indexOf(value,1)
      if (index !== -1) {
          //把重复移除
          this.serachHistorys.splice(index,1)
      }
          //把最新的搜索记录放到顶部
      this.serachHistorys.unshift(value)
      //把搜索记录存储到本地
      setItem('searchHistort',this.serachHistorys)
      this.isResultShow = true
    }
  }
};
</script>

<style lang="less" scoped></style>
