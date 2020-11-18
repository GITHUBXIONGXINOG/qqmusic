<template>
  <div class="radioStation">
      <div class="radio-station-inner">
          <radio-station-title
            @contentList="contentList"
          />
          <radio-station-content
            :storeContent="storeContent"
          />
      </div>

  </div>
</template>

<script>
import RadioStationTitle from "@/components/main/radiostation/RadioStationTitle";
import RadioStationContent from "@/components/main/radiostation/RadioStationContent";
import "@/assets/css/radiostation.scss"
  export default {
    components:{
      RadioStationTitle,
      RadioStationContent
    },
    data(){
        return{
            storeContent:[],//存储图片

        }
    },
    methods:{
        contentList(val){
            this.storeContent=val
        }
    }

  }
</script>
