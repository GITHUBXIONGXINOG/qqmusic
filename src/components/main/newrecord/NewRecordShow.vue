<template>
    <div class="new-record-show">
        <div class="area-title">
            <ul class="area-ul">
                <li v-for="(item,index) in area" :key="index" ref="tagInfo"

                >
                    <a href="javascript:;"
                       :class="{selectIndex: index==activeIndex ? true : false}"
                       @click="changeIndex(index)"
                    >
                        {{item.name}}
                    </a>

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
                albums:[],
                activeIndex:0,
                typeSave:[]
            }
        },
        methods:{
              async fetchApiInfo(params){

                  //获取标签
                  let url2 = `http://81.70.93.91:3200/getNewDisks`
                  const resArea = await this.$http.get(url2)

                  //获取内容
                  let url = `/api/new/album?num=20`
                  const res = await this.$http.get(url,{params})

                  // console.log(res)
                  // console.log(res.data.data)
                  // console.log(resArea)
                  // debugger
                  // this.albums=res.data.response.new_album.data.albums
                  // this.typeSave=res.data.data
                  this.albums=res.data.data.list
                  this.area=resArea.data.response.new_album_tag.data.area
                  // console.log(this.area)
                  // console.log(this.albums)
                  //派发事件 派发内容给父组件
                  this.$emit('albumsInfo', this.albums)
              },
            //点击事件
            changeIndex(index){
                  // console.log(index)
                if (this.activeIndex != index){
                    this.activeIndex = index
                    const params = {
                        type:1
                    }
                    params["type"]=this.activeIndex+1
                    // console.log(params)
                    this.fetchApiInfo(params)
                }

            }
        },
        created() {
            this.fetchApiInfo()
        },
        mounted() {
            // this.selectTag()
        }
    }
</script>
