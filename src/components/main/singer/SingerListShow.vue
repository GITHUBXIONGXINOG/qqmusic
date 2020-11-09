<template>
    <div class="singer-list-show">
        <div class="tags">
            <ul v-for="(item,index) in tags" :key="index" class="tags-ul">
                <li v-for="(v,i) in item" :key="i" class="tags-li">
                    {{v.name}}
                </li>
            </ul>
        </div>



    </div>
</template>

<script>
    export default {
    data(){
      return{
          SingerList:[],
          tags:[],
          test:[
              [],
              [],
              [],
              []
          ]
      }
    },
     methods:{
         async fetchApiInfo(){
             // debugger
             const res = await this.$http.get('http://localhost:3200/getSingerList')
             // console.log(res.data.response.singerList.data.singerlist)
             this.SingerList=res.data.response.singerList.data.singerlist
         /*    this.tags=res.data.response.singerList.data.tags(item=>({
                 index:item.index,
                 area:item.area,
                 sex:item.sex,
                 genre:item.genre
             }))*/
             this.tags=res.data.response.singerList.data.tags
             // console.log(this.tags)

         }
     },
     created() {
         this.fetchApiInfo()
     }

    }
</script>
