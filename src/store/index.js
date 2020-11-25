import Vue from 'vue'
import Vuex from 'vuex'
import api from '../api/index'
Vue.use(Vuex)

//时间格式化
function timeFormat(val){
    // debugger
    let min = Math.floor(val/60)
    let s = Math.floor(val%60)
    min = min<10 ? '0'+min : min
    s = s<10 ? '0'+s : s
    return min + ':' + s

}
//歌词格式化
function formatLyric(lyric) {
  let lyrics = lyric.split("\n")
  //歌词对象
  let lyrArr = {}
  //* 贪婪匹配,有多少匹配多少
  let reg = /\[\d*:\d*\.\d*]/g
  for (let i = 0; i < lyrics.length; i++) {
    let timerRegExpArr = lyrics[i].match(reg)
    if (!timerRegExpArr) continue
    let t = timerRegExpArr[0] //数值格式,取出数据
    //取出分钟
    let min = Number(t.match(/\[\d*/).toString().slice(1))
    //取出秒
    let second = Number(t.match(/:\d*/).toString().slice(1))
    //歌词文本
    let content = lyrics[i].replace(timerRegExpArr,"")
    //处理版权问题,比如官方翻译无法获取到
    if (content){
      //计算时间
      let time = min*60+second
      //时间对应文本
      lyrArr[time] = content
    }

  }
  // debugger
  return lyrArr
}
export default new Vuex.Store({
  state: {
    cur:0,//当前展示的歌曲id
    list:[]//所有已经加载过的信息
  },
  mutations: {
    //state 原始状态
    //payload 只能传一个参数,通过解构出想要的值
    queryDataM(state,payload){
      // debugger
      let {
        songId,
        dataOfInfo,
        dataOfPlay,
        detaOfLyric,
      }=payload
      state.cur = songId
      if (dataOfInfo&&dataOfPlay&&detaOfLyric){
        // state.list.push(data)
        //...data 扩展运算符,将data复制一份,并且后面的时间interval的值为
        state.list.unshift({
          ...dataOfInfo,
          interval:timeFormat(dataOfInfo.interval),//时间
          playerUrl:dataOfPlay,//播放链接
          singerName:dataOfInfo.singer[0].name,//歌手名字
          songPic: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${dataOfInfo.album.mid}.jpg`,//歌曲图片
          detaOdLyric:detaOfLyric,
          lyric:formatLyric(detaOfLyric)
        })
// songPic =  `https://y.gtimg.cn/music/photo_new/T002R300x300M000${this.songInfoUrl.track_info.album.mid}.jpg`
      }
    }
  },
  actions: {
    //context 当前的容器包括state,commit等
       //queryDataAction(context,id){context.state}
       //直接解构赋值{state,commit}
    //想展示那首歌的信息就传递id
    async queryDataA({state,commit},songId){
      // debugger
      //校验是否存在
      let result = state.list.find(item=>{
        return item.mid===songId
      })
      if (result){
        //如果存在,执行commit方法,调用queryDataM,只改ID
        commit('queryDataM',{songId})
        return
      }
      // debugger
      //不存在,从服务器重新获取
      // result = await api.songInfo(songId)
      let resultOfSongInfo = await api.songInfo(songId)

      let resultOfSongPlayer = await api.songPlayer(songId)

      let resultOfSongLyric = await api.songLyric(songId)
      // debugger
      // console.log(resultOfSongLyric.data)
      // console.log(result)
      //拿到数据
      if (parseInt(resultOfSongInfo.data.result)===100
          &&parseInt(resultOfSongPlayer.data.result)===100
          &&parseInt(resultOfSongLyric.data.result)===100
      ){
        commit('queryDataM',{
          songId,
          dataOfInfo:resultOfSongInfo.data.data.track_info,
          dataOfPlay:(Object.values(resultOfSongPlayer.data.data))[0],
          detaOfLyric:resultOfSongLyric.data.data.lyric,
        //  (Object.values(this.songPlayerUrl))[0]
        })
      }
    }


  },
  modules: {
  }
})
