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
                            v-for="item of List[index]"
                            :key="item.name"
                            :class="['select',{'nav-active': isActive(item.path)}]"
                            @click="navClick(item.path) "
                        >
                            {{item.name}}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {

    props:{
        index:{
            type: Number,
            required: true,
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
                //精彩推荐
                [],
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
                    {path: '/homepage/recommend',name:'热歌'},
                    {path: '/homepage/officialplaylist',name:'新歌'},
                    {path: '/homepage/lovesong',name:'流行指数'},
                    {path: '/homepage/networksong',name:'欧美'},
                    {path: '/homepage/classic',name:'韩国'},
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
        }
    },

    methods:{
        navClick(path){
            //派发事件 通知父组件被点击
            this.$emit('nav-click',path)
        },
        isActive(path){
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

    },
    components:{

    },
    mounted() {

    }

}
</script>



