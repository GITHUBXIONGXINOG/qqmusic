<template>
  <div class="digital-album-show">
       <rotation3d-api
           :apiSetList="list"
           @fetch-recommend-swiper="getList"
           />
      <div class="content">

                  <div v-for="(item,index) in contentList" :key="index"
                       class="albumlist-content-comment"
                       v-show="item.albumlist.length>5"
                  >
                          <nav class="contentTitle-wrap">
                              <span class="contentTitle">
                                {{contentTitle[index]}}
                              </span>
                          </nav>
                      <div class="imgList-wrap">
                          <div class="imgList_info" v-for="(v,i) in  item.albumlist" :key="i" v-show="i<5">
                              <div class="img-wrap">
                                  <img :src="`https://y.gtimg.cn/music/photo_new/T002R300x300M000${v.album_mid}.jpg`"
                                       class="select img-info"
                                  >
                                  <span class="select img-back"></span>
                              </div>

                              <span class="album_name select">
                                    {{v.album_name}}
                              </span>
                              <span class="singer_name select">
                                    {{v.singer_name}}
                              </span>
                              <span class="price">
                                    ￥{{v.price/100}}
                              </span>
                              <button type="button" class="select" >
                                  <span>立即购买</span>
                              </button>

                          </div>

                      </div>


                  </div>

      </div>

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
                    path:'http://81.70.93.91:3200/getDigitalAlbumLists'
                },
                contentList:null,
                contentTitle:[
                    '最新上架',
                    '本周热销',
                    '音乐人专区',
                    '',
                    '2019新声力量绽放',
                    '2019内地专辑推荐',
                    '',
                    '',
                    '2019韩国专辑推荐',
                    '2019影视剧OST推荐'
                ],
                imgList: [
                    [],
                    [],
                    [],
                    [],
                    [],
                    [],
                    [],
                    [],
                    [],
                    [],
                ],
            }

        },
        methods:{
            getList(path){
                // debugger
                this.contentList = path
            },


        }
    }
</script>
