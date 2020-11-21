<template>
    <div class="search-content">
        <!--种类-->
        <ul class="search-type-ul">
            <li v-for="(item,index) in typeList" :key="index"
                :class="activeIndex.t==item.t ? 'selectType' : 'normalType'"
                @click="clickType(item.t)"
            >
                <a href="javascript:;">{{item.name}}</a>
            </li>

        </ul>
        <!--用户操作-->
        <ul class="userOpera">
            <a :href="`${userOperaUrl[index]}`" v-for="(item,index) in userOperating" :key="index"
               v-show="activeIndex.t==0">
                <span :class="['iconfont ',`${iconList[index]}`]"></span>
                <span>
                        {{item}}
                    </span>
            </a>
        </ul>

        <song-list
            :setContentList="contentList"
            :setContentType="activeIndex.t"
        />

    </div>
</template>

<script>
    import SongList from '@/components/main/commont/SongList'
    export default {
        props:{
            setSearchWord:{
                type: String
            }
        },
        data(){
            return{
                typeList:[
                    {
                        name:'单曲',
                        t:0
                    },
                    {
                        name:'专辑',
                        t:8
                    },
                    {
                        name:'MV',
                        t:12
                    },
                    {
                        name:'歌单',
                        t:2
                    },
                    {
                        name:'歌词',
                        t:7
                    },






                ],//种类列表
                userOperating:['播放全部','添加到','下载','批量操作'],//用户操作
                userOperaUrl:[
                    'javascript:;',
                    'javascript:;',
                    'javascript:;',
                    'javascript:;',
                ],//操作对应的链接
                iconList:[
                    'icon-bofang2',
                    'icon-jiatianjiakuangxuanduoxuan-8',
                    'icon-xiazai',
                    'icon-piliangxiugai',
                ],//操作对应的图标
                activeIndex:{
                    key:'',//关键词
                    pageNo:1,//页码
                    pageSize:20,//一页返回数量
                    t:0//搜索类型
                },//当前活动种类
                contentList:[],//内容列表
                songOperatingShow:'',//显示操作标识
                operatingList:[
                    'bofang2',
                    'jia',
                    'xiazai',
                    'fenxiang'
                ],//用户歌曲操作图标
                labelList:[],//歌曲页面总标题
                labelListOfSong:[
                    '歌曲',
                    '歌手',
                    '专辑',
                    '时长'
                ],//歌曲页面总标题-单曲
                labelListOfAlbum:[
                    '专辑',
                    '歌手',
                    '发行时间'
                ],//歌曲页面总标题-专辑
                labelListOfSongList:[
                    '歌单',
                    '创建人',
                    '收听'
                ],//歌曲页面总标题-歌单

            }
        },
        methods:{
            async fetchSearchApi(params){
                // debugger
              let url = '/api/search'
                if (!params){
                    params = this.activeIndex
                }
                const res = await this.$http.get(url,{params})
                this.contentList = res.data.data.list
                // if (res.data.data){
                //     this.contentList = res.data.data.list
                // }
                // debugger
                // console.log(this.contentList)

            },
            //类型点击
            clickType(t){
                // debugger
             /*   if (t!=this.activeIndex.t){

                }*/
                this.activeIndex.t = t
                this.fetchSearchApi()


            },
            //悬浮显示切换
            OperateChange(index){
                if (index){
                    this.songOperatingShow=index
                }else{
                    this.songOperatingShow=''
                }
            },
            setFormatForSongList(){
                // debugger
                // console.log(this.activeIndex)
                // console.log(this.$route.query.inputSearch);
                this.activeIndex.key=this.$route.query.inputSearch
            }

        },
        computed:{
            //时间计算
            songTime(){
                return function (interval) {
                    //分
                    let m = Math.floor(interval/60)
                    //秒
                    let s = interval%60
                    //将变量转换为字符串
                    m += ''
                    s += ''
                    //如果只有一位数,前面增加一个0
                    m = (m.length==1) ? '0'+m : m
                    s = (s.length==1) ? '0'+s : s
                    return m+':'+s
                }
            },
        },
        watch:{
            //监听路由
            $route:{
                handler:function (val,oldVal) {
                    if (val.path=='/search'){
                        // debugger
                        this.activeIndex.key = val.query.inputSearch
                        this.fetchSearchApi(this.activeIndex)
                        // console.log(this.activeIndex)
                    }
                },
                //深度监听
                deep:true
            },



        },
        created() {
            this.setFormatForSongList()
            this.fetchSearchApi()
        },

        components:{
            SongList
        }
    }
</script>
