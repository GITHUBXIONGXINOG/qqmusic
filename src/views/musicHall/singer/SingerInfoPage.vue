<template>
    <div class="singer-info-page">
        {{singermid}}
        <img :src="`http://y.gtimg.cn/music/photo_new/T001R150x150M000${singermid}.webp`" alt="">
        {{ desc}}
        <singer-info-show />
    </div>
</template>

<script>
    import SingerInfoShow from "@/components/main/singer/SingerInfoShow";
    import api from "@/api";
    export default {
        props:{
            singermid:{
                type:[String,Number],
                require:true
            }
        },
        data(){
            return{
                desc:"",//介绍
                basicList:[],//基本信息
                otherList:[],//其它信息
                singerid:0,//歌手id
                followers:'',//关注人数
                hotSongs:[],//热门歌曲
                albumList:[],//专辑
                singerName:'',//歌手名字
                mvList:[],//mv
                songTotal:0,//总共歌曲
                albumTotal:0,//总共专辑
                mvTotal:0,//总共mv
                simSinger:[],//相似歌手
            }
        },
        methods:{
          async fetchSingerInfo(){
              let res = await api.SingerIntroduction(this.singermid)
              let resOfFollowers = await api.SingerFollowers(this.singermid)
              let resOfHot = await api.SingerHotSong(this.singermid)
              let resOfAlbum = await api.SingerAlbum(this.singermid)
              let resOfMv = await api.SingerMv(this.singermid)
              let resOfSim = await api.SingerSimilar(this.singermid)
              debugger
              console.log(res)
              if (res&&resOfFollowers){
                  this.desc = res.data.data.desc//介绍
                  this.basicList = res.data.data.basic.item//基本信息
                  this.otherList = res.data.data.other.item//其它信息
                  this.singerid = res.data.data.id//歌手id
                  this.followers = this.numToTenThousand(resOfFollowers.data.response.num)//关注人数
                  this.hotSongs = resOfHot.data.data.list//热门歌曲
                  this.songTotal = resOfHot.data.data.total//歌曲总数
                  this.albumList = resOfAlbum.data.data.list//专辑
                  this.albumTotal = resOfAlbum.data.data.total//专辑总数
                  this.singerName = resOfAlbum.data.data.name//歌手名字
                  this.mvList = resOfMv.data.data.list//mv
                  this.mvTotal =resOfMv.data.data.total//mv总数
                  this.simSinger = resOfSim.data.data.list//相似歌手
              }
          } ,
            //转换位数
            numToTenThousand(num){
                if (num < 10000){
                    return num
                }
                let res = num / 10000
                //  toFixed 四舍五入 保留指定小数位数
                return res.toFixed(1)+'万'
            },
        },
        created() {
            this.fetchSingerInfo()
        },
        components:{
            SingerInfoShow
        }

    }

</script>
