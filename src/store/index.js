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
      let {songId,dataOfInfo,dataOfPlay}=payload
      state.cur = songId
      if (dataOfInfo&&dataOfPlay){
        // state.list.push(data)
        //...data 扩展运算符,将data复制一份,并且后面的时间interval的值为
        state.list.unshift({
          ...dataOfInfo,
          interval:timeFormat(dataOfInfo.interval),
          playerUrl:dataOfPlay
        })

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

      // console.log(result)
      //拿到数据
      if (parseInt(resultOfSongInfo.data.result)===100&&parseInt(resultOfSongPlayer.data.result)===100){
        commit('queryDataM',{
          songId,
          dataOfInfo:resultOfSongInfo.data.data.track_info,
          dataOfPlay:(Object.values(resultOfSongPlayer.data.data))[0]
        //  (Object.values(this.songPlayerUrl))[0]
        })
      }
    }


  },
  modules: {
  }
})
