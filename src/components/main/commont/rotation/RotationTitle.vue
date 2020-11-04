<template>
    <div >
        <div class="rotation-title"
            :class="`title-${index}`">
            <!--标题最外框-->
            <div class="song-list">
                <!--标题正文外框-->
                <div class="song-list-title-wrap">
                    <!--标题正文内框-->
                    <div class="song-list-title">
                        <img :src="require('@/assets/img/index_tit@2x.png')" alt="" class="title-img">
                    </div>
                </div>
                <!--导航标题外框-->
                <div class="song-wrap">
                    <!--导航标题-->
                    <ul class="song-list-ul">
                        <li
                            v-for="(item,index) of List[index]"
                            :key="index"
                            :class="['select',{'nav-active': isActive(item.path)}]"
                            @click="navClick(item.path) "
                        >
                            <i :class="`item-name-${index}`">{{item.name}}</i>
                            <div v-if="isRank(item)" class="isrank">
                                <div v-for((v,i) in 3)>
                                        <i class="singerList-rank">{{this.songList[i].rank}}</i>
                                        <i class="singerList-title">{{this.songList[i].title}}</i>
                                        <i class="singerList-singerName">{{this.songList[i].singerName}}</i>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <rotation-api
            :index="index"
            :apiGetList="apiGetList"
        />
    </div>
</template>

<script>
import RotationShow from "@/components/main/commont/rotation/RotationShow";
import RotationApi from "@/components/main/commont/rotation/RotationApi";
export default {

    props:{
        index:{
            type: Number,
            required: true,
        },
        apiGetList:{
            type: Object,
            required: true
        }
    },
    data(){
        return{
            List:[
                //歌单推荐
                [
                        {path: '/homepage/recommend',name:'为你推荐'},
                        {path: '/homepage/officialplaylist',name:'官方歌单'},
                        {path: '/homepage/lovesong',name:'情歌'},
                        {path: '/homepage/networksong',name:'网络歌曲'},
                        {path: '/homepage/classic',name:'经典'},
                        {path: '/homepage/ktv',name:'KTV热歌'},
                    ],
                //新歌首发
                [
                        {path: '/homepage/recommend',name:'最新'},
                        {path: '/homepage/officialplaylist',name:'内地'},
                        {path: '/homepage/lovesong',name:'港台'},
                        {path: '/homepage/networksong',name:'欧美'},
                        {path: '/homepage/classic',name:'韩国'},
                        {path: '/homepage/ktv',name:'日本'},
                     ],
                //精彩推荐 去掉
                //新碟首发
                [
                    {path: '/homepage/recommend',name:'内地'},
                    {path: '/homepage/officialplaylist',name:'港台'},
                    {path: '/homepage/lovesong',name:'欧美'},
                    {path: '/homepage/networksong',name:'韩国'},
                    {path: '/homepage/classic',name:'日本'},
                    {path: '/homepage/ktv',name:'其它'},
                ],
                //排行榜
                [
                    {path: '/homepage/recommend',name:'飙升'},
                    {path: '/homepage/officialplaylist',name:'热歌'},
                    {path: '/homepage/lovesong',name:'新歌'},
                    {path: '/homepage/networksong',name:'流行指数'},
                    {path: '/homepage/classic',name:'听歌识曲'},
                ],
                //MV
                [
                    {path: '/homepage/recommend',name:'精选'},
                    {path: '/homepage/officialplaylist',name:'内地'},
                    {path: '/homepage/lovesong',name:'韩国'},
                    {path: '/homepage/networksong',name:'港台'},
                    {path: '/homepage/classic',name:'欧美'},
                    {path: '/homepage/ktv',name:'日本'},
                ],
            ],
            songList:null
            // RecommendList:[]
        }
    },

    methods:{
        navClick(path){
            //派发事件 通知父组件被点击
            this.$emit('nav-click',path)
        },
        isActive(path){
            if (this.index==3){
                return false
            }
            // debugger
            if (path === this.$route.path){
                return true
            }
            if (path === '/recommend' && this.$route.path === '/homepage' ){
                return true
            }
            if (path === '/homepage/recommend' && this.$route.path === '/homepage' ){
                return true
            }
            return false
        },
        isRank(res){
            // debugger
            // console.log(this.apiGetList)
            // console.log(res)
            if (!res.song){
                return false
            }
            debugger
            this.songList = res.song.map(item=>({
                rank:item.rank,
                singerName:item.singerName,
                songId:item.songId,
                title:item.title,
            }))
            return true
        }

    },
    components:{
        RotationShow,
        RotationApi
    },
    mounted() {

    },
    created() {
        // this.fetchRecommendSwiper()
    }

}
</script>



