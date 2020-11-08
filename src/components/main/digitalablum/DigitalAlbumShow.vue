<template>
  <div class="digital-album-show">
   <rotation3d-api
       :apiSetList="list"
       />

  </div>
</template>

<script>
    import Rotation3dApi from "@/components/main/digitalablum/Rotation3dApi";
    export default {
        components:{
            Rotation3dApi
        },
        data(){
            return {
                list:{
                    path:'http://localhost:3200/getDigitalAlbumLists'
                }
            }

        },
    }
</script>
