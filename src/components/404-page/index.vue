<template>
  <div class="page">
    <img src="./image/hutao.gif" alt="">
    <span>页面找不到了~~</span>
  </div>
</template>

<script>
export default {
  name:'Errorpage',
  data() {
    return {}
  },
  components:{},
  props:{},
  computed:{},
  watch:{},
  methods: {},
}
</script>

<style lang="less" scoped>
  .page{
    width: 100vw;
    height: 100vh;
    background: #FDB8C6;
    img{
      width:245px;
      margin: 50px 65px;
    }
    span{
      font-size: 25px;
      font-weight: 600;
      font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      display: block;
      text-align: center;
      color: #fff;
    }
  }
</style>
