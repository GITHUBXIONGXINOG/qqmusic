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
                        {path: '/recommend/playlist/u',name:'为你推荐'},
                        {path: '/recommend/playlist',name:'官方歌单'},
                        {path: '/songlist/list?category=148',name:'情歌'},
                        {path: '/songlist/list?category=146',name:'网络歌曲'},
                        {path: '/songlist/list?category=136',name:'经典'},
                        {path: '/songlist/list?category=141',name:'KTV热歌'},
                    ],
                //新歌首发
                [
                        {path: '/new/songs?type=0',name:'最新'},
                        {path: '/new/songs?type=1',name:'内地'},
                        {path: '/new/songs?type=2',name:'港台'},
                        {path: '/new/songs?type=3',name:'欧美'},
                        {path: '/new/songs?type=4',name:'韩国'},
                        {path: '/new/songs?type=5',name:'日本'},
                     ],
                //精彩推荐 去掉
                //新碟首发
                [
                    {path: '/new/album?type=1&num=20',name:'内地'},
                    {path: '/new/album?type=2&num=20',name:'港台'},
                    {path: '/new/album?type=3&num=20',name:'欧美'},
                    {path: '/new/album?type=4&num=20',name:'韩国'},
                    {path: '/new/album?type=5&num=20',name:'日本'},
                    {path: '/new/album?type=6&num=20',name:'其它'},
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
                    {path: '/new/mv?type=0',name:'精选'},
                    {path: '/new/mv?type=1',name:'内地'},
                    {path: '/new/mv?type=2',name:'韩国'},
                    {path: '/new/mv?type=3',name:'港台'},
                    {path: '/new/mv?type=4',name:'欧美'},
                    {path: '/new/mv?type=5',name:'日本'},
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
 /*       //点击切换获取地址
        clickPath(path){
            this.$emit('click-path',path)
        },*/
   /*     isActive(path){
/!*            if (this.index==3){
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
            }*!/
            return false
        },*/
/*        ClickSetFlag(clickIndex){
            // console.log(path)
            this.clickFlag=clickIndex
        },*/
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
/*window.onload=function () {
   var iList = document.querySelectorAll('.select > i')
    console.log(iList)
}*/
</script>



