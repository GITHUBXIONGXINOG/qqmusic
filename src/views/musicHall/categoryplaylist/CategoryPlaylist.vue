<template>
  <div class="category-playlist">
      <category-title
          @contentList="contentList"
      />
      <category-list
          :contentList="contentInfo"
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
                contentInfo:[]
            }
        },
        methods:{
            contentList(list){
                // debugger
                // console.log(list)
                this.contentInfo=list
                // console.log(this.contentInfo)
            }
        }

    }
</script>
