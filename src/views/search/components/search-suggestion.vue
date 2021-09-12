<template>
  <div class="search-suggestion">
    <van-cell-group>
      <van-cell
       icon="search"
       v-for="(suggestion, index) in suggestions"
       :key="index"
       @click="$emit('search',suggestion)"
      >
        <div slot="title" v-html="highlight(suggestion)"></div>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import {debounce} from 'lodash'
import {getSearchSuggestions} from '@/api/search'
export default {
  name: "searchSuggestion",
  data() {
    return {
      suggestions:[],  //联想建议数据
    };
  },
  props: {
    value:{
      type:String,
      required:true
    }
  },
  watch: {
    value:{
       handler: debounce (async function(){
        const {data} = await getSearchSuggestions(this.value)
        // console.log(data);
        this.suggestions = data.data.options
      },200),
      immediate:true
    }
  },
  methods: {
    highlight(suggestion){
      //RegExp时正则标表达式的构造函数，原生语法
      //参数1  字符串  参数2  匹配模式
      // new RegExp(this.value,'gi')
      return suggestion.replace(
        new RegExp(this.value,'gi'),
        `<span style="color:red">${this.value}</span>`)
    }
  }
};
</script>

<style lang="less" scoped></style>
