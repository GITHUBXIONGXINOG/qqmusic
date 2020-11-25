import Vue from 'vue'
import Vuex from 'vuex'
import api from '../api/index'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cur:0,//当前展示的歌曲id
    list:[]//所有已经加载过的信息
  },
  mutations: {
    //state 原始状态
    //payload 只能传一个参数,通过解构出想要的值
    queryDataM(state,payload){
      let {songId,data}=payload
      state.cur = parseInt(songId)
      if (data){
        state.list.push(data)

      }
    }
  },
  actions: {
    //context 当前的容器包括state,commit等
       //queryDataAction(context,id){context.state}
       //直接解构赋值{state,commit}
    //想展示那首歌的信息就传递id
    async queryDataA({state,commit},songId){
      //校验是否存在
      let result = state.list.find(item=>{
        return parseInt(item.songId)===parseInt(songId)
      })
      if (result){
        //如果存在,执行commit方法,调用queryDataM,只改ID
        commit('queryDataM',{songId})
        return
      }
      //不存在,从服务器重新获取
      result = await api.songInfo(songId)
      //拿到数据
      if (parseInt(result.data.result)===100){
        commit('queryDataM',{
          songId,
          data:result.data.data
        })

      }

    }
  },
  modules: {
  }
})
