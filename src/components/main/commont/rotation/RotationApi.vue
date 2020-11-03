<template>
    <div class="retation-api">

        <rotation-show
            :slide-list="apiGetList"

        />
    </div>
</template>

<script>
import RotationShow from "@/components/main/commont/rotation/RotationShow";
export default {
    props:{
        index:{
            type: Number,
            required: true
        }
    },
    data(){
        return {
  /*          apiSetList: {
                recommend:{
                    path:'/recommend/playlist/u'//为你推荐
                },
                official:{
                    path:'/recommend/playlist'//官方歌单
                }

            },*/
/*                [

                ['/recommend/playlist'],
                ['/songlist/list?category=148'],//情歌
                ['/songlist/list?category=146'],//网络歌曲
                ['/songlist/list?category=136'],//经典
                ['/songlist/list?category=141'],//ktv热歌
    ]*/


            apiSetList: {
                path:''
            },
            apiGetList: []
        }
    },
    components:{
        RotationShow
    },
    methods:{
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
                    this.apiSetList.path='/new/album?type=1'//新碟首发
                    break
                case 3:
                    this.apiSetList.path='/top/category?showDetail=1'//排行榜
                    break
                case 4:
                    this.apiSetList.path='/mv/list?type=0'//mv
                    break
            }

        },
        async fetchRecommendSwiper(index){
            const res = await this.$http.get(this.apiSetList.path)
            // console.log(res)
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
                    username:item.singer.name,
                    id:item.album.id,
                    // listen_num:item.listen_num,
                    type:item.type
                }))
            }
            else if (index==2){
                this.apiGetList = res.data.data.list.map(item => ({
                    img:`https://y.gtimg.cn/music/photo_new/T002R300x300M000${item.mid}.jpg`,
                    title:item.name,
                    // subtitle:item.subtitle,
                    username:item.singers.name,
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
                    // rank:item.rank,
                    // title:item.title,
                    // subtitle:item.subtitle,
                    // username:item.singername,
                    id:item.topId,
                    listen_num:item.listenNum,
                    // type:item.type
                    img:item.picUrl,

                }))
                // console.log(res)
                // console.log(this.apiGetList.map(item=>item))
            }
            else if (index==4){
                this.apiGetList = res.data.data.list.map(item => ({
                    img:item.picurl,
                    title:item.title,
                    // subtitle:item.subtitle,
                    username:item.singers.name,
                    id:item.mvid,
                    listen_num:item.playcnt,
                    type:item.type
                }))
            }

            // console.log(this.apiGetList.map(item=>item))
        },

    },
    created() {

        this.apiSet(this.index)
        this.fetchRecommendSwiper(this.index)
    },

}
</script>
