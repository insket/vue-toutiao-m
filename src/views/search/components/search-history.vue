<template>
  <div class="search-history">
    <van-cell-group v-if="serachHistorys.length">
      <van-cell title="搜索历史">
        <div slot="default" @click="deleteAll">全部删除</div>
      </van-cell>

      <van-cell v-for="(serachHistory,index) in serachHistorys" :key="index" >
          <div slot="title" @click="goSearch(serachHistory)">{{serachHistory}}</div>
         <van-icon name="delete" @click="deleteHis(index,serachHistory)"></van-icon>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import {setItem,getItem} from '@/utils/storage'
export default {
  name: "searchHistory",
  data() {
    return {};
  },
  components: {},
  props: {
    serachHistorys:{
      type:Array,
      required:true
    }
  },
  computed: {},
  watch: {},
  methods: {
    goSearch(serachHistory){
      this.$emit('search',serachHistory)
    },
    deleteHis(index){
      // console.log(index);
      this.serachHistorys.splice(index,1)
      setItem('searchHistort',this.serachHistorys)
    },
    deleteAll(){
      this.serachHistorys.splice(0)
      setItem('searchHistort',this.serachHistorys)
    }
  }
};
</script>

<style lang="less" scoped></style>
