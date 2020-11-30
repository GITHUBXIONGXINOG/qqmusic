import axios from 'axios'
const api = {
    //歌曲信息
    songInfo(songId){
        return axios.get('/api/song',{
            params:{
                songmid:songId
            }
        })
    },
    //歌词
    songLyric(songId){
        return axios.get('/api/lyric',{
            params:{
                songmid:songId
            }
        })
    },
    //播放链接
    songPlayer(songId){
        return axios.get('/api/song/urls',{
            params:{
                id:songId
            }
        })
    },
    //歌单
    songList(content_id){
        return axios.get('/api/songlist',{
            params:{
                id:content_id
            }
        })
    },
    //专辑
    albumList(albummid){
        return axios.get('/api/album/songs',{
            params:{
                albummid:albummid
            }
        })
    },
    //添加到歌单 登录权限
    addSongList(mid,dirid){
        debugger
        let type = Object.prototype.toString.call(mid)
        let mids = ''
        if (type==='[object Array]'){

            mid.forEach(item=>{
                mids += item + ','
            })
        }

        let res = axios.get('/api/songlist/add',{
            params:{
                mid:mid,
                dirid:dirid
            }
        })

        return res
        /*
        *
        * {"result":301,"errMsg":"先登录！"}
        * */
    },
    //下载
    downSongs(mid,type){
        return axios.get('/api/song/url',{
            params:{
                id:mid,
                type:type || 128,
                isRedirect:0
            }
        })

    },
    //推荐歌单
    //为你推荐歌单
    recommendForU(){
        return axios.get('/api/recommend/playlist/u')
    },
    //按分类推荐歌单
    recommendPlayList(id,pageNo,pageSize){
        return axios.get('/api/recommend/playlist',{
            params:{
                id,
                pageNo:pageNo || 1,
                pageSize:pageSize || 20
            }
        })
    },
    //新歌首发
    newSongStarting(type){
        return axios.get('/api/new/songs',{
            params:{
                type //type: 地区分类，默认为 0 // 0: 最新 1：内地，2：港台，3：欧美，4：韩国，5：日本
            }
        })
    },
    //新碟首发
    newRecordStarting(type,num){
        return axios.get('/api/new/album',{
            params:{
                type, //type: 地区分类，默认为 1 // 1：内地，2：港台，3：欧美，4：韩国，5：日本，6：其他
                num:num || 11,//默认 10
            }
        })
    },
    //排行榜
    rankList(id,pageSize){
        return axios.get('/api/top',{
            params:{
                id: id,//榜单id 62 飙升榜,26 热歌榜,27 新歌榜,4 流行指数榜,67 听歌识曲榜
                pageSize: pageSize || 100
            }
        })
    },
    //相关热门歌单
    RelatedSongList(id){
        return axios.get('/api/song/playlist',{
            params:{
                id, //歌曲songid
            }
        })
    },
    //相关MV
    RelatedMV(id){
        return axios.get('/api/song/mv',{
            params:{
                id, //歌曲songid
            }
        })
    },
    //相关评论
    RelatedComment(id,pageNo,type){
        return axios.get('/api/comment',{
            params:{
                id, //歌曲songid
                pageNo:pageNo||1,//页数
                type:type||1,// 默认 0 // 0：获取最新评论，1：获取热评
            }
        })
    },
    //mv推荐
    MvRecommend(type){
        return axios.get('/api/new/mv',{
            params:{
                type:type||0, //type: 地区分类，默认为 0, 0: 精选 1：内地，2：港台，3：欧美，4：韩国，5：日本
            }
        })
    },
    //mv播放
    MvPlaying(vid){
        return axios.get('/api/mv/url',{
            params:{
                id:vid||0, //id: 视频的 vid , 必填，多个用,分割
            }
        })
    },
    //mv信息
    MvInfo(vid){
        return axios.get('/api/mv',{
            params:{
                id:vid||0, //id: 视频的 vid , 必填，多个用,分割
            }
        })
    },
}
export default api
