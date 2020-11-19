<template>
  <div class="mv">
      <mv-title
        @getContent="getContent"
        :currentPage="currentPage"
      />
      <mv-content
        :contentInfo="contentList"
        @currentPage="getCurrentPage"
      />
  </div>
</template>

<script>
    import MvTitle from '@/components/main/mv/MvTitle'
    import MvContent from '@/components/main/mv/MvContent'
    import '@/assets/css/mv.scss'
    export default {
        data(){
            return{
                contentList:[],
                currentPage:1,
            }
        },
        components:{
            MvTitle,
            MvContent
        },
        methods:{
            getContent(val){
                // debugger
                this.contentList=val.list
                // console.log(this.contentList)
            },
            getCurrentPage(val){
                this.currentPage=val
            }
        }
    }

</script>
