<template>
  <div class="pagination">
    <button :disabled='pageNo==1' @click="pageclick(pageNo-1)" >上一页</button>
    <button @click="pageclick(1)" v-if="startNumAndEndNum[0]>1">1</button>
    <button v-if="startNumAndEndNum[0]>2">···</button>

    
    <button :class="{active:page==pageNo}" @click="pageclick(page)" v-for='page in startNumAndEndNum' :key='page'>{{page}}</button>
    
    <button v-if="startNumAndEndNum[continues-1]<totalPage-1">···</button>
    <button @click="pageclick(totalPage)" v-if="startNumAndEndNum[continues-1]<totalPage">{{totalPage}}</button>
    <button :disabled='pageNo==totalPage' @click="pageclick(pageNo+1)">下一页</button>
    
    <button style="margin-left: 30px">共 {{total}} 条</button>
  </div>
</template>

<script>
  export default {
    name: "Pagination",
    props:['pageNo','pageSize','total','continues'],
    computed:{
      totalPage(){
        return Math.ceil(this.total/this.pageSize)
      },
      startNumAndEndNum(){
        const { continues, pageNo, totalPage } = this;
        let start = 0
        let end = 0

        if(totalPage<continues){
          start = 1
          end = totalPage
        }else{
          start = pageNo - ((continues-1)/2)
          end = pageNo + ((continues-1)/2)
          if(start<=0){
            start = 1
            end = continues
          }
          if(end>totalPage){
            start = totalPage- continues + 1
            end = totalPage
          }
          
          }
          let pageList = []
          while (start<=end) {
            pageList.push(start)
            start++
        }
        return pageList
      }
    },
    methods:{
      pageclick(page){
        this.$emit('pageupdate',page)
      }
    }
  }
</script>
<style lang="less" scoped>
  .pagination {
    button {
      margin: 0 5px;
      background-color: #f4f4f5;
      color: #606266;
      outline: none;
      border-radius: 2px;
      padding: 0 4px;
      vertical-align: top;
      display: inline-block;
      font-size: 13px;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      border: 0;

      &[disabled] {
        color: #c0c4cc;
        cursor: not-allowed;
      }

      &.active {
        cursor: not-allowed;
        background-color: #409eff;
        color: #fff;
      }
    }
  }
  .active{
  background: skyblue;
}
</style>



