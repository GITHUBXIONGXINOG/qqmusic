<template>
    <div class="new-record-show">
        <div class="area-title">
            <ul class="area-ul">
                <li v-for="(item,index) in area" :key="index">
                    {{item.name}}

                </li>
            </ul>
        </div>
     </div>
</template>

<script>
    export default {
        data(){
            return{
                currentPage:1,
                area:[],
                albums:[]
            }
        },
        methods:{
              async fetchApiInfo(params){
                  // let url = `http://localhost:3200/getNewDisks?page=${this.currentPage}`
                  let url = `/api/new/album?num=21`
                  // let url = `/api/new/album?num=20&sin=40`
                  let url2 = `http://81.70.93.91:3200/getNewDisks`
                  const res = await this.$http.get(url,{params})
                  const resArea = await this.$http.get(url2)
                  //
                  // console.log(res.data.data)
                  // console.log(resArea)
                  // debugger
                  // this.albums=res.data.response.new_album.data.albums
                  this.albums=res.data.data.list
                  this.area=resArea.data.response.new_album_tag.data.area
                  // console.log(this.area)
                  // console.log(this.albums)
              }
        },
        created() {
            this.fetchApiInfo()
        }
    }
</script>
