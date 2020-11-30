<template>
    <div class="retation-api">
        <!--
            v-bind传递值apiGetList和index到子组件rotation-show对应的值中,rotation-show使用props接收
        -->
        <rotation-show
            :slide-list="apiGetList"
            :index="index"
        />


    </div>
</template>

<script>
import RotationShow from "@/components/main/commont/rotation/RotationShow";
import api from "@/api";
import {mapActions, mapGetters, mapMutations} from "vuex";
export default {
    props:{
        /*定义接收来自父组件的index
        * 该index由homepage传入到rotation-title,再由rotation-title传入到rotation-api中
        * */
        index:{
            type: Number,
            required: true
        },

    },
    data(){
        return {
            apiSetList: {
                path:''
            },
            apiGetList: [],

        }
    },
    components:{
        RotationShow,
        // RotationTitle
    },
    methods:{
        // ...mapActions({
        //     queryRecommendList: 'queryRecommendList'
        // }),
        //apiSet 初始化 默认地址
        apiSet(index){
            // debugger
            switch (index){
                case 0:
                    this.apiSetList.path='/api/recommend/playlist/u'//为你推荐
                    break
                case 1:
                    this.apiSetList.path='/api/new/songs?type=0'//新歌首发
                    break
                case 2:
                    this.apiSetList.path='/api/new/album?type=1&num=20'//新碟首发
                    break
                case 3:
                    this.apiSetList.path='/api/top/category?showDetail=1'//排行榜
                    break
                case 4:
                    this.apiSetList.path='/api/new/mv?type=0'//mv
                    break
            }

        },
        //默认初始化输出
        async fetchRecommendSwiper(index){
            const res = await this.$http.get(this.apiSetList.path)

          /*  debugger
            console.log(res)*/
            /*对应不同api的保存数据*/
            if (index==0){
                // debugger
                let recommentForU = localStorage.getItem('recommentForU')
                if (recommentForU){
                    recommentForU = JSON.parse(recommentForU)
                    if (new Date().getTime()-recommentForU.time<30*60*1000){
                        this.apiGetList = recommentForU.data
                    }else {
                        let res = await this.$http.get(this.apiSetList.path)
                        if (parseInt(res.data.result)===100){
                            this.apiGetList=res.data.data.list
                            localStorage.setItem(
                              'recommentForU',
                              JSON.stringify({
                                  time:new Date().getTime(),
                                  data:res.data.data.list
                              })
                            )
                        }
                    }
                }else {
                    let res = await this.$http.get(this.apiSetList.path)
                    if (parseInt(res.data.result)===100){
                        this.apiGetList=res.data.data.list
                        localStorage.setItem(
                          'recommentForU',
                          JSON.stringify({
                              time:new Date().getTime(),
                              data:res.data.data.list
                          })
                        )
                    }
                }

            }
            //新歌首发
            else if (index==1){
                this.apiGetList = res.data.data.list.map(item => ({
                    id:item.album.id,
                    img:`https://y.gtimg.cn/music/photo_new/T002R300x300M000${item.album.pmid}.jpg`,
                    title:item.title,
                    singer:item.singer[0].name,
                    // listen_num:item.listen_num,
                    type:item.type,
                    mid:item.mid
                }))
                // debugger
                // console.log(this.apiGetList.map(item=>item))

            }
            //新碟首发
            else if (index==2){
                this.apiGetList = res.data.data.list.map(item => ({
                    id:item.id,
                    img:`https://y.gtimg.cn/music/photo_new/T002R300x300M000${item.photo.pic_mid}.jpg`,
                    title:item.name,
                    singer:item.singers[0].name,
                    type:item.type,
                    albummid:item.mid,
                }))
            }
            //排行榜
            else if (index==3){
                let path = [62,26,27,4,67]
                //62 飙升榜,26 热歌榜,27 新歌榜,4 流行指数榜,67
                let list = []
                path.map(async (item)=>{
                    // debugger
                    let res =  await api.rankList(item,3)
                    // console.log(res.data.data.list)
                    list.push(res.data.data)
                    if (list.length===path.length){
                        this.apiGetList = list.map(item=>({
                            topId:item.id,
                            img:item.info.picUrl,
                            label:item.info.title,
                            song:item.list,
                            listen_num:item.listenNum,
                        }))
                        // console.log( this.apiGetList)
                    }
                })
            }
            //mv
            else if (index==4){
                this.apiGetList = res.data.data.list.map(item => ({
                    img:item.picurl,//图片
                    title:item.mvtitle,//标题
                    singer:item.singername,//歌手
                    listen_num:item.listennum,//播放量
                    type:item.mvtitle//种类
                }))

            }

        },

        //点击歌单地址后输出
        async  clickPath(path,index){
            // debugger
            let res = []
            this.apiGetList=[]
            // console.log(res)
            /*对应不同api的保存数据*/
            //歌单推荐
            if (index==0){
                // debugger


                //为你推荐
                if (path=='u'){
                    let recommentForU = localStorage.getItem('recommentForU')
                    if (recommentForU){
                        recommentForU = JSON.parse(recommentForU)
                        if (new Date().getTime()-recommentForU.time<30*60*1000){
                            this.apiGetList = recommentForU.data
                        }else {
                            let res = await api.recommendForU()
                            if (parseInt(res.data.result)===100){
                                this.apiGetList=res.data.data.list
                                localStorage.setItem(
                                  'recommentForU',
                                  JSON.stringify({
                                      time:new Date().getTime(),
                                      data:res.data.data.list
                                  })
                                )
                            }
                        }
                    }else {
                        let res = await api.recommendForU()
                        if (parseInt(res.data.result)===100){
                            this.apiGetList=res.data.data.list
                            localStorage.setItem(
                              'recommentForU',
                              JSON.stringify({
                                  time:new Date().getTime(),
                                  data:res.data.data.list
                              })
                            )
                        }
                    }
                }
                //其它分类推荐
                else {
                    await this.$store.dispatch('queryRecommendList',path)
                    // debugger
                    // console.log(this.recommendList)
                    // this.apiGetList.push(this.recommendList)
                    for (let i in  this.recommendList){
                        this.apiGetList.push(this.recommendList[i])
                    }
                    //去掉最后的id
                    this.apiGetList.pop()
                }


            }
            else if (index==1){
                // debugger
                await this.$store.dispatch('queryNewSongStarting',path)
                // debugger
                // console.log(this.recommendList)
                // this.apiGetList.push(this.recommendList)
                // debugger
                for (let i in  this.newSongStarting){
                    this.apiGetList.push(this.newSongStarting[i])
                }
                //去掉最后的id
                this.apiGetList.pop()
                // console.log(this.apiGetList)


            }//新歌首发
            else if (index==2){
                await this.$store.dispatch('queryNewRecordStarting',path)
                // debugger
                for (let i in  this.newRecordStarting){
                    this.apiGetList.push(this.newRecordStarting[i])
                }
                //去掉最后的id
                this.apiGetList.pop()

            }//新碟首发
            else if (index==3){
                // debugger
                this.apiGetList = res.data.data[0].list.map(item => ({
                    label:item.label,
                    song:item.song,
                    // id:item.topId,
                    singer:item.listenNum,
                    // type:item.type
                    img:item.picUrl,
                    topId:item.topId
                }))
                // console.log(this.apiGetList)
            }//排行榜
            else if (index==4){
                await this.$store.dispatch('queryDataMvRecommend',path)
                // debugger
                for (let i in  this.MvRecommend){
                    this.apiGetList.push(this.MvRecommend[i])
                }
                //去掉最后的id
                this.apiGetList.pop()



/*                this.apiGetList = res.data.data.list.map(item => ({
                    img:item.picurl,
                    title:item.mvtitle,
                    // subtitle:item.subtitle,
                    singer:item.singername,
                    id:item.mvid,
                    listen_num:item.listennum,
                    type:item.mvtitle
                }))*/
            }//mv



        }

    },
    computed:{
      ...mapGetters([
        "recommendList",//歌单推荐
        "newSongStarting",//新歌首发
        "newRecordStarting",//新碟首发
        "MvRecommend",//mv推荐
      ])
    },
    created() {

        this.apiSet(this.index)
        this.fetchRecommendSwiper(this.index)
    },
    watch:{
        $route(){
            this.$nextTick(()=>{
                this.fetchRecommendSwiper(this.index)
            })
        },
        index(val){
            this.$nextTick(()=>{
                this.fetchRecommendSwiper(val)
            })
        }
    },
    mounted() {
        // console.log(this.$store.state)
    }

}
</script>
