import axios from 'axios'
const api = {
    songInfo(songId){
        return axios.get('/api/song',{
            params:{
                songmid:songId
            }
        })
    }
}
export default api
