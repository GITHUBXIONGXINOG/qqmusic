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
                        <!--@click绑定点击事件,调用navClick方法,把此时的地址传递给navClick-->
                        <!--isAcive判断选中-->
                        <li
                            v-for="(item,n) of List[index]"
                            :key="n"
                            :class="['select']"
                            @click="navClick(item.path,index,n)"
                        >
                            <i :class="[`item-name-${n}`,{'nav-active':isClickFlag(n)}]"
                        >
                                {{item.name}}
                            </i>
                            <!--排行榜-->
                            <div v-if="isRank(item)" class="isrank">
                                <div v-for((v,i) in 3)>
                                        <i class="singerList-rank">{{this.songList[i].rank}}</i>
                                        <i class="singerList-title">{{this.songList[i].title}}</i>
                                        <i class="singerList-singerName">{{this.songList[i].singerName}}</i>
                                </div>
                            </div>
                        </li>
                        <!--播放全部-->
                        <div class="playAll" v-if="index==1">
                            <a href="javascript:;" class="playAllWrap">

                                <div class="playInfoWrap">
                                    <svg class="icon bofang1" aria-hidden="true">
                                        <use xlink:href="#icon-bofang1"></use>
                                    </svg>
                                    <i>
                                        播放全部
                                    </i>
                                </div>
                            </a>
                        </div>
                    </ul>
                </div>
            </div>
        </div>

        <!--调用rotation-api子组件
            使用:index传递index给子组件,子组件在props中定义index接收
            该index由homepage传入到rotation-title,再由rotation-title传入到rotation-api中
            clickPath将点击的请求地址传入api
            在父组件tilte里声明ref属性和对应的名字(这里定义的是api),
            这样就可以通过this.$refs.api.属性名或
            this.$refs.api.方法名 来调子组件的数据或方法
        -->
        <rotation-api
            :index="index"
            ref="api"
        />
    </div>
</template>

<script>
import RotationShow from "@/components/main/commont/rotation/RotationShow";
import RotationApi from "@/components/main/commont/rotation/RotationApi";
import api from "@/api";
export default {
    /*
    * rotation-tile是父组件homepage的子组件
    * 子组件使用props定义接收父组件传递的值
    * 定义接收index,index是首页的循环值,每个index代表首页的一个轮播图组件部分,由homepage传入
    * */
    props:{

        index:{
            type: Number,
            required: true,
        },

    },
    data(){
        return{
            List:[
                //歌单推荐
                [
                        {path: 'u',name:'为你推荐'},
                        {path: '3317',name:'官方歌单'},
                        {path: '71',name:'情歌'},
                        {path: '3056',name:'网络歌曲'},
                        {path: '59',name:'经典'},
                        {path: '64',name:'KTV热歌'},
                    ],
                //新歌首发
                [
                        {path: '0',name:'最新'},
                        {path: '1',name:'内地'},
                        {path: '2',name:'港台'},
                        {path: '3',name:'欧美'},
                        {path: '4',name:'韩国'},
                        {path: '5',name:'日本'},
                     ],
                //精彩推荐 去掉
                //新碟首发
                [
                    {path: '1',name:'内地'},
                    {path: '2',name:'港台'},
                    {path: '3',name:'欧美'},
                    {path: '4',name:'韩国'},
                    {path: '5',name:'日本'},
                    {path: '6',name:'其它'},
                ],
                //排行榜
                [
                    {path: '62',name:'飙升'},
                    {path: '26',name:'热歌'},
                    {path: '27',name:'新歌'},
                    {path: '4',name:'流行指数'},
                    {path: '67',name:'听歌识曲'},
                ],
                //MV
                [
                    {path: '/api/new/mv?type=0',name:'精选'},
                    {path: '/api/new/mv?type=1',name:'内地'},
                    {path: '/api/new/mv?type=2',name:'韩国'},
                    {path: '/api/new/mv?type=3',name:'港台'},
                    {path: '/api/new/mv?type=4',name:'欧美'},
                    {path: '/api/new/mv?type=5',name:'日本'},
                ],
            ],
            songList:null,
            // RecommendList:[]
            clickFlag:0,
            clickPath:[],
        }
    },

    methods:{
        /*在本子组件中navClick函数被调用后,通过this.$emit派发事件,
        * 第一个为该派发事件的名字nav-click
        * 第二个为传递的值path
        * 在这里打包成nav-click函数,里面有点击获取到的地址path,父组件homepage通过@获取该函数
        * */
        navClick(path,index,clickIndex){
            //派发事件 通知父组件被点击
            this.$emit('nav-click',path)
            //将点击的地址保存到clickPath
            // debugger
            // this.clickPath=path
            this.$refs.api.clickPath(path,index)
            this.clickFlag=clickIndex
         },

        isClickFlag(flag){
           return  flag==this.clickFlag ? true :false
        },

        isRank(res){
            // debugger
            // console.log(this.apiGetList)
            // console.log(res)
            if (!res.song){
                return false
            }
            // debugger
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



