<template>
  <div class="rank">
      <div class="rank-in-wrap">
          <!--    rank排行榜-->
          <rank-title
            @res-content-list="contentList"
            @res-comment-list="commentList"
          />
          <rank-content
            :contentList="storageList"
          />
          <rank-comment
            :commentList="storageComment"
          />
      </div>

  </div>
</template>

<script>
    import RankTitle from "@/components/main/rank/RankTitle";
    import RankContent from '@/components/main/rank/RankContent';
    import RankComment from '@/components/main/rank/RankComment';
    import '@/assets/css/rank.scss'
    export default {
        data(){
            return{
                storageList:{},
                storageComment:{},
            }
        },
        components:{
            RankTitle,
            RankContent,
            RankComment
        },
        methods:{
            contentList(list){
                if (list)
                    this.storageList = list
                // debugger
                // console.log(this.storageList)
            },
            commentList(list){
                this.storageComment=list
            }

        }
    }



</script>
