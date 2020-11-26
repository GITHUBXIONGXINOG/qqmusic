import axios from 'axios'
const api = {
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

}
export default api