<template>
  <div class="category-playlist">
      <category-title
          @contentList="contentList"
          :changePageInfo="changePageInfo"
      />
      <category-list
          :contentList="contentInfo"
          @changePage="changePage"

      />
  </div>
</template>

<script>
    import categoryList from "@/components/main/categorylist/categoryList.vue";
    import categoryTitle from "@/components/main/categorylist/categoryTitle";
    import  '@/assets/css/categorylist.scss'
    export default {
        components:{
            categoryList,
            categoryTitle
        },
        data(){
            return{
                contentInfo:[],//内容信息
                changePageInfo:1,//页码改变信息
            }
        },
        methods:{
            contentList(list){
                // debugger
                // console.log(list)
                this.contentInfo=list
                // console.log(this.contentInfo)
            },
            changePage(page){
                this.changePageInfo=page
            }
        },


    }
</script>
