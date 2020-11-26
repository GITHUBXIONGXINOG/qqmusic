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

async function songUrlGet(songId) {
  // debugger
  let res = await api.songPlayer(songId)
  console.log(res)
  console.log((Object.values(res.data.data))[0])
  return (Object.values(res.data.data))[0]
}

export default new Vuex.Store({
  state: {
    cur:0,//当前展示的歌曲id
    list:[],//所有已经加载过的信息
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
        content_id,
        dataOfSongList,
      }=payload
      // state.cur = songId || content_id

      if (dataOfInfo&&dataOfPlay&&detaOfLyric){
        // state.list.push(data)
        //...data 扩展运算符,将data复制一份,并且后面的时间interval的值为
        //如果不是歌单,从头插入歌曲
       if (!content_id){
         state.cur = songId
         state.list.unshift({
           ...dataOfInfo,
           interval:timeFormat(dataOfInfo.interval),//时间
           playerUrl:dataOfPlay,//播放链接
           singerName:dataOfInfo.singer[0].name,//歌手名字
           songPic: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${dataOfInfo.album.mid}.jpg`,//歌曲图片
           detaOdLyric:detaOfLyric,
           lyric:formatLyric(detaOfLyric)
         })
       }else if(content_id){//如果是歌单,从尾插入歌曲
         state.list.push({
           ...dataOfInfo,
           interval:timeFormat(dataOfInfo.interval),//时间
           playerUrl:dataOfPlay,//播放链接
           singerName:dataOfInfo.singer[0].name,//歌手名字
           songPic: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${dataOfInfo.album.mid}.jpg`,//歌曲图片
           detaOdLyric:detaOfLyric,
           lyric:formatLyric(detaOfLyric)
         })
       }

      }

    /*  else if (content_id&&dataOfSongList){
        debugger
          state.list=[]
        dataOfSongList.songlist.forEach((item,index)=>{
          if (index<50){

            state.list.push({
              ...item,
              interval:timeFormat(item.interval),//时间
              // playerUrl:playerUrl,//播放链接

            })
          }else{
            return
          }
        })
          // state.list.push({...dataOfSongList.songlist})
      }*/
    },
    queryDataMDelete(state,payload){
      // debugger
      let {
        songId,
        result,
      }=payload
        state.list.splice(result,1 )

      let res = state.list.find(item=>{
        return item.mid===songId
      })
      if (!res){
        // let result = state.list.findIndex(item=>item.mid)
        state.cur = state.list[0].mid
      }
    },

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
    },
    //歌单
    async queryDataASongList({state,commit},content_id){
      // debugger
      //校验是否存在
      let result = state.list.find(item=>{
        return item.content_id===content_id
      })
      if (result){
        //如果存在,执行commit方法,调用queryDataM,只改ID
        commit('queryDataM',{content_id})
        return
      }
      //不存在,从服务器重新获取
      // result = await api.songInfo(songId)
      let resultOfSongList = await api.songList(content_id)

      // debugger

      if (parseInt(resultOfSongList.data.result)===100){
        for (let i in resultOfSongList.data.data.songlist){
          if (i<30){
            let item = resultOfSongList.data.data.songlist[i]
            let resultOfSongInfo=await api.songInfo(item.songmid)
            let resultOfSongPlayer = await api.songPlayer(item.songmid)
            let resultOfSongLyric = await api.songLyric(item.songmid)
            commit('queryDataM',{
              content_id,
              songId:item.songmid,
              // dataOfSongList:resultOfSongList.data.data,
              dataOfInfo:resultOfSongInfo.data.data.track_info,
              dataOfPlay:(Object.values(resultOfSongPlayer.data.data))[0],
              detaOfLyric:resultOfSongLyric.data.data.lyric,
            })
          }

        }

      }


    },

    //删除歌曲
    queryDataADelete({state,commit},songId){
      // debugger
      //校验是否存在
      // let result = state.list.splice(state.list.findIndex(item=>item.id===songId),1 )
      let result = state.list.findIndex(item=>item.mid===songId)

      if (result>=0){
        //如果存在,执行commit方法,调用queryDataM,只改ID
        commit('queryDataMDelete',{songId,result})
        return
      }

    },

  },
  modules: {
  }
})
