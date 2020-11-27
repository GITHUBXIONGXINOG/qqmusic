import api from "@/api";

const actions = {
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
        //歌词
        // let dataOfSongLyrics = []

        //切割,只显示前30个
        resultOfSongList.data.data.songlist=resultOfSongList.data.data.songlist.slice(0,30)
        //获取所有歌曲id
        let songMids = ''
        // debugger
        // console.log(dataOfFirstSongMid)
        let songmid = ''
        for (let item in resultOfSongList.data.data.songlist){
            songmid = resultOfSongList.data.data.songlist[item].songmid
            songMids +=  songmid+','
            // dataOfSongLyrics.push ((await api.songLyric(songmid)).data.data.lyric)
        }
        // debugger

        // console.log(songMids)
        //id: 歌曲的 songmid，必填，多个用逗号分割
        let dataOfPlay = await api.songPlayer(songMids)
        // debugger
        // console.log(playerUrl)
        if (parseInt(resultOfSongList.data.result)===100){

            commit('queryDataM',{
                content_id,
                dataOfSongList:resultOfSongList.data.data,
                // dataOfPlay:Object.values(dataOfPlay.data.data),
                dataOfPlay:Object.values(dataOfPlay.data.data),

                dataOfFirstSongMid:resultOfSongList.data.data.songlist[0].songmid,//第一个歌曲id
                // dataOfSongLyrics
            })

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

}
export default actions


