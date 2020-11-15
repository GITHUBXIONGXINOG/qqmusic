<template>
  <div class="rank">
      <div class="rank-in-wrap">
          <!--    rank排行榜-->
          <rank-title
            @res-content-list="contentList"
          />
          <rank-content
            :contentList="storageList"
          />
      </div>

  </div>
</template>

<script>
    import RankTitle from "@/components/main/rank/RankTitle";
    import RankContent from '@/components/main/rank/RankContent';
    import '@/assets/css/rank.scss'
    export default {
        data(){
            return{
                storageList:{},
            }
        },
        components:{
            RankTitle,
            RankContent
        },
        methods:{
            contentList(list){
                this.storageList = list
                // debugger
                // console.log(this.storageList)
            }

        }
    }



</script>
