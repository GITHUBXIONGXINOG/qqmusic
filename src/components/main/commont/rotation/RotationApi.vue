<template>
    <div class="retation-api">
        <!--
            v-bind传递值apiGetList和index到子组件rotation-show对应的值中,rotation-show使用props接收
        -->
        <rotation-show
            :slide-list="apiGetList"
            :index="index"
        />
<!--
        <rotation-title
            @click-path="fetchClickPath"
            :index="index"
            />
-->

    </div>
</template>

<script>
// import RotationTitle from "@/components/main/commont/rotation/RotationTitle";
import RotationShow from "@/components/main/commont/rotation/RotationShow";
export default {
    props:{
        /*定义接收来自父组件的index
        * 该index由homepage传入到rotation-title,再由rotation-title传入到rotation-api中
        * */
        index:{
            type: Number,
            required: true
        },
/*        clickPath:{
            type: String,
            default: 'clickPath'
        }*/
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
        //apiSet 初始化 默认地址
        apiSet(index){
            // debugger
            switch (index){
                case 0:
                    this.apiSetList.path='/recommend/playlist/u'//为你推荐
                    break
                case 1:
                    this.apiSetList.path='/new/songs?type=0'//新歌首发
                    break
                case 2:
                    this.apiSetList.path='/new/album?type=1&num=20'//新碟首发
                    break
                case 3:
                    this.apiSetList.path='/top/category?showDetail=1'//排行榜
                    break
                case 4:
                    this.apiSetList.path='/new/mv?type=0'//mv
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
                this.apiGetList = res.data.data.list.map(item => ({
                    img:item.cover,
                    title:item.title,
                    username:item.username,
                    id:item.content_id,
                    listen_num:item.listen_num,
                    type:item.type
                }))
            }
            else if (index==1){
                this.apiGetList = res.data.data.list.map(item => ({
                    img:`https://y.gtimg.cn/music/photo_new/T002R300x300M000${item.album.pmid}.jpg`,
                    title:item.title,
                    subtitle:item.subtitle,
                    username:item.singer[0].name,
                    id:item.album.id,
                    // listen_num:item.listen_num,
                    type:item.type
                }))
                // debugger
                // console.log(this.apiGetList.map(item=>item))

            }
            else if (index==2){
                this.apiGetList = res.data.data.list.map(item => ({
                    img:`https://y.gtimg.cn/music/photo_new/T002R300x300M000${item.mid}.jpg`,
                    title:item.name,
                    // subtitle:item.subtitle,
                    username:item.singers[0].name,
                    id:item.id,
                    // listen_num:item.listen_num,
                    type:item.type
                }))
            }
            else if (index==3){//排行榜

                // console.log(res.data)
                // debugger
                // console.log(res.data.data)
                // console.log(res.data.data[0].list.map(item=>item))
                this.apiGetList = res.data.data[0].list.map(item => ({
                    label:item.label,
                    song:item.song,
                    id:item.topId,
                    listen_num:item.listenNum,
                    // type:item.type
                    img:item.picUrl,

                }))
               // debugger
  /*               console.log(res)*/
                // console.log(this.apiGetList.map(item=>item))
            }
            else if (index==4){
                this.apiGetList = res.data.data.list.map(item => ({
                    img:item.picurl,
                    title:item.mvtitle,
                    // subtitle:item.subtitle,
                    username:item.singername,
                    id:item.mvid,
                    listen_num:item.listennum,
                    type:item.mvtitle
                }))
/*                debugger
                console.log(res)
                console.log(this.apiGetList.map(item=>item))*/
            }


        },

        //点击歌单地址后输出
        async  clickPath(path,index){
            // debugger
            // console.log(path)
            // console.log(index)
            const res = await this.$http.get(path)

            // console.log(res)
            //   debugger
              // console.log(res)
            /*对应不同api的保存数据*/
            if (index==0){
                this.apiGetList = res.data.data.list.map(item => ({
                    img:item.cover || item.cover_url_medium || item.imgurl || item.imgurl,
                    title:item.title || item.dissname,
                    id:item.content_id || item.dissid,
                    listen_num:item.listen_num || item.access_num || item.listennum,
                }))
/*                debugger
                console.log(this.apiGetList.map(item=>item))*/
            }
            else if (index==1){
                this.apiGetList = res.data.data.list.map(item => ({
                    img:`https://y.gtimg.cn/music/photo_new/T002R300x300M000${item.album.pmid}.jpg`,
                    title:item.title,
                    subtitle:item.subtitle,
                    username:item.singer[0].name,
                    id:item.album.id,
                    // listen_num:item.listen_num,
                    type:item.type
                }))
                // debugger
                // console.log(this.apiGetList.map(item=>item))

            }
            else if (index==2){
                this.apiGetList = res.data.data.list.map(item => ({
                    img:`https://y.gtimg.cn/music/photo_new/T002R300x300M000${item.mid}.jpg`,
                    title:item.name,
                    // subtitle:item.subtitle,
                    username:item.singers[0].name,
                    id:item.id,
                    // listen_num:item.listen_num,
                    type:item.type
                }))
            }
            else if (index==3){//排行榜

                // console.log(res.data)
                // debugger
                // console.log(res.data.data)
                // console.log(res.data.data[0].list.map(item=>item))
                this.apiGetList = res.data.data[0].list.map(item => ({
                    label:item.label,
                    song:item.song,
                    id:item.topId,
                    listen_num:item.listenNum,
                    // type:item.type
                    img:item.picUrl,

                }))
                // debugger
                /*               console.log(res)*/
                // console.log(this.apiGetList.map(item=>item))
            }
            else if (index==4){
                this.apiGetList = res.data.data.list.map(item => ({
                    img:item.picurl,
                    title:item.mvtitle,
                    // subtitle:item.subtitle,
                    username:item.singername,
                    id:item.mvid,
                    listen_num:item.listennum,
                    type:item.mvtitle
                }))
                /*                debugger
                                console.log(res)
                                console.log(this.apiGetList.map(item=>item))*/
            }



        }

    },
    created() {

        this.apiSet(this.index)
        this.fetchRecommendSwiper(this.index)
    },
    watch(){

    }

}
</script>
