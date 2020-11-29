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

    }
}
export default api
