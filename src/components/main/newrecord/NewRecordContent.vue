<template>
    <div class="new-record-content">
        <div class="albums-wrap">
            <ul class="albums-ul">
                <li v-for="(item,index) in albumsInfo" :key="index">
                    <a href="javascript:;"><img :src="item.img" alt="" class="record-img"></a>
                    <nav>
                        <router-link :to="`/player/albummid=`+item.mid" class="img_cover_wrap" >
                            <img src="../../../../public/img/cover_play@2x.png" alt=""  class="record-img-button">
                        </router-link>
                    </nav>
                    <div class="albums-name"><a href="javascript:;" >{{item.name}}</a></div>
                    <div class="albums-singers"><a href="javascript:;" >{{item.singers}}</a></div>
                    <div class="albums-release_time"><i>{{item.release_time}}</i></div>

                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            albumsList:{
                type: Array,
                require:true
            }
        },
        data(){
            return{
                albums:[],
                albumsInfo:[],

            }
        },
        methods:{
            // showList(){
            //     // debugger
            //     console.log(this.albumsList)
            // }
        },
        watch:{
            albumsList(val){
                // debugger
                // this.albums = this.albumsList
                // console.log(this.albumsList)
                this.albumsInfo = this.albumsList.map(item=>({
                    id : item.id,
                    img: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${item.mid}.jpg`,
                    name: item.name,
                    release_time: item.release_time,
                    singers: item.singers[0].name,
                    mid:item.mid,//专辑mid
                    title:item.title,
                    singer:item.singer,
                }))
                // console.log(this.albumsInfo)
            },
            $route: {
                handler: function(val, oldVal){
                    debugger
                    console.log(val);
                },
                // 深度观察监听
                deep: true
            }

        },
        mounted() {
            // this.showList()
        }


    }
</script>
