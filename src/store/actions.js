import api from "@/api";

const actions = {


    //想展示那首歌的信息就传递id
    async queryDataSong({state,commit}, songId){
        // debugger
        //校验是否存在
        let result = state.playList.find(item=>{
            return item.mid===songId
        })
        if (result){
            //如果存在,执行commit方法,调用queryDataM,只改ID
            commit('queryDataSong',{songId})
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
            commit('queryDataSong',{
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
        let result = state.playList.find(item=>{
            return item.content_id===content_id
        })
        if (result){
            //如果存在,执行commit方法,调用queryDataM,只改ID
            commit('queryDataSong',{content_id})
            return
        }
        //不存在,从服务器重新获取
        // result = await api.songInfo(songId)
        let resultOfSongList = await api.songList(content_id)
        //歌词
        let dataOfSongLyrics = []

        //切割,只显示前30个
        resultOfSongList.data.data.songlist=resultOfSongList.data.data.songlist.slice(0,35)
        //获取所有歌曲id
        let songMids = ''
        // debugger
        // console.log(dataOfFirstSongMid)
        let songmid = ''

        for (let item in resultOfSongList.data.data.songlist){
            songmid = resultOfSongList.data.data.songlist[item].songmid
            songMids +=  songmid+','
            // dataOfSongLyrics.push ((await api.songLyric(item)).data.data.lyric)
        }
        //为了性能,默认只加载前5个歌曲的歌词

        // debugger
       let firstSongMid =  resultOfSongList.data.data.songlist[0].songmid
        dataOfSongLyrics.push ((await api.songLyric(firstSongMid)).data.data.lyric)
        // debugger

        // console.log(songMids)
        //id: 歌曲的 songmid，必填，多个用逗号分割
        let dataOfPlay = await api.songPlayer(songMids)
        // debugger
        // console.log(playerUrl)
        if (parseInt(resultOfSongList.data.result)===100){

            commit('queryDataSong',{
                content_id,
                dataOfSongList:resultOfSongList.data.data,
                // dataOfPlay:Object.values(dataOfPlay.data.data),
                dataOfPlay:Object.values(dataOfPlay.data.data),

                dataOfFirstSongMid:firstSongMid,//第一个歌曲id
                dataOfSongLyrics
            })

        }


    },

    //首页歌单推荐
    async queryRecommendList({state,commit},id){
        // debugger
        //校验是否存在
        let result = state.recommendList.find(item=>{
            return item.id===id
        })
        if (result){
            //如果存在,执行commit方法,调用queryData,只改id
            commit('queryRecommendList',{id})
            return
        }
        else {
            let resOfSongRecommendList = await api.recommendPlayList(id)
            if (parseInt(resOfSongRecommendList.data.result)===100){
                commit('queryRecommendList',{
                    id,
                    list:resOfSongRecommendList.data.data.list
                })

            }
        }
    },

    //新歌首发
    async queryNewSongStarting({state,commit},type){
        // debugger
        //校验是否存在
        let result = state.newSongStarting.find(item=>{
            return item.curNewSType===type
        })
        if (result){
            //如果存在,执行commit方法,调用queryData,只改id
            commit('queryNewSong',{type})
            return
        }
        else {
            let resOfNewSongStarting = await api.newSongStarting(type)
            if (parseInt(resOfNewSongStarting.data.result)===100){
                commit('queryNewSong',{
                    type,//地区
                    list:resOfNewSongStarting.data.data.list,
                })

            }
        }
    },

    //新碟首发
    async queryNewRecordStarting({state,commit},type){
        // debugger
        //校验是否存在
        let result = state.newSongStarting.find(item=>{
            return item.curNewRType===type
        })
        if (result){
            //如果存在,执行commit方法,调用queryData,只改id
            commit('newRecordStarting',{type})
            return
        }
        else {
            debugger
            let resOfNewRecordStarting = await api.newRecordStarting(type)
            if (parseInt(resOfNewRecordStarting.data.result)===100){
                commit('queryNewRecord',{
                    type,//地区
                    list:resOfNewRecordStarting.data.data.list,
                })

            }
        }
    },

    //专辑
    async queryDataAlbum({state,commit},albummid){
        // debugger
        //校验是否存在
        let result = state.playList.find(item=>{
            return item.albummid===albummid
        })
        if (result){
            //如果存在,执行commit方法,调用queryDataM,只改ID
            commit('queryDataSong',{albummid})
            return
        }
        //不存在,从服务器重新获取
        // result = await api.songInfo(songId)
        let resultOfSongList = await api.albumList(albummid)
        //歌词
        let dataOfSongLyrics = []

        //切割,只显示前30个
        // resultOfSongList.data.data.songlist=resultOfSongList.data.data.songlist.slice(0,35)
        //获取所有歌曲id
        let songMids = ''
        // debugger
        // console.log(dataOfFirstSongMid)
        let songmid = ''

        for (let item in resultOfSongList.data.data.list){
            songmid = resultOfSongList.data.data.list[item].mid
            songMids +=  songmid+','
            // dataOfSongLyrics.push ((await api.songLyric(item)).data.data.lyric)
        }


        // debugger
        let firstSongMid =  resultOfSongList.data.data.list[0].mid
        dataOfSongLyrics.push ((await api.songLyric(firstSongMid)).data.data.lyric)
        // debugger

        // console.log(songMids)
        //id: 歌曲的 songmid，必填，多个用逗号分割
        let dataOfPlay = await api.songPlayer(songMids)
        // debugger
        // console.log(playerUrl)
        if (parseInt(resultOfSongList.data.result)===100){

            commit('queryDataSong',{
                albummid,
                dataOfSongList:resultOfSongList.data.data.list,
                // dataOfPlay:Object.values(dataOfPlay.data.data),
                dataOfPlay:Object.values(dataOfPlay.data.data),

                dataOfFirstSongMid:firstSongMid,//第一个歌曲id
                dataOfSongLyrics
            })

        }


    },

    //排行榜queryDataRank
    async queryDataRank({state,commit},topId){
        // debugger
        //校验是否存在
        let result = state.playList.find(item=>{
            return item.topId===topId
        })
        // console.log(result)
        if (result){
            //如果存在,执行commit方法,调用queryDataM,只改ID
            commit('queryDataSong',{topId})
            return
        }
        //不存在,从服务器重新获取
        // result = await api.songInfo(songId)
        let resultOfSongList = await api.rankList(topId)
        // console.log(resultOfSongList)
        //歌词
        let dataOfSongLyrics = []

        //获取所有歌曲id
        let songMids = ''
        let songmid = ''

        for (let item in resultOfSongList.data.data.list){
            songmid = resultOfSongList.data.data.list[item].mid
            songMids +=  songmid+','
            // dataOfSongLyrics.push ((await api.songLyric(item)).data.data.lyric)
        }


        // debugger
        let firstSongMid =  resultOfSongList.data.data.list[0].mid
        dataOfSongLyrics.push ((await api.songLyric(firstSongMid)).data.data.lyric)
        // debugger

        // console.log(songMids)
        //id: 歌曲的 songmid，必填，多个用逗号分割
        let dataOfPlay = await api.songPlayer(songMids)
        // debugger
        // console.log(playerUrl)
        if (parseInt(resultOfSongList.data.result)===100){

            commit('queryDataSong',{
                topId,
                dataOfSongList:resultOfSongList.data.data.list,
                // dataOfPlay:Object.values(dataOfPlay.data.data),
                dataOfPlay:Object.values(dataOfPlay.data.data),

                dataOfFirstSongMid:firstSongMid,//第一个歌曲id
                dataOfSongLyrics
            })

        }


    },

    //歌曲详细页
    async queryDataSongInfo({state,commit},songId){
        // debugger
        let result = state.playList.find(item=>{
            return item.songId===songId
        })
        // console.log(result)
        if (result){
            //如果存在,执行commit方法,调用queryDataM,只改ID
            commit('queryDataSongInfo',{songId})
            return
        }
        //不存在,从服务器重新获取
        //歌曲信息
        let resultOfSongInfo = await api.songInfo(songId)
        //歌词
        let resultOfSongLyrics = await api.songLyric(songId)

        //用于查询关联的歌曲id
        let songid = resultOfSongInfo.data.data.track_info.id
        //相关热门歌单
        let resultOfRelatedSongList = await api.RelatedSongList(songid)
        //相关MV
        let resultOfRelatedMV = await api.RelatedMV(songid)
        //评论
        let resultOfRelatedComment = await api.RelatedComment(songid)



        if (parseInt(resultOfSongInfo.data.result)===100){
            commit('queryDataSongInfo',{
                songId,//用于查询歌曲信息
                songid,//用于查询歌曲关联信息
                dataOfSongInfo:resultOfSongInfo.data,//歌曲信息
                dataOfRelatedSongList:resultOfRelatedSongList.data.data,//相关歌单
                dataOfRelatedMV:resultOfRelatedMV.data.data,//相关mv
                dataOfRelatedComment:resultOfRelatedComment.data,//相关评论
                dataOfSongLyrics:resultOfSongLyrics.data.data.lyric,//歌词
            })

        }

    },
    //详细页评论页数更改
    async queryDataSongInfoCommendPage({state,commit},page){
        // debugger
        // console.log(state.songInfoPages);
        let index = state.songInfoPages.findIndex(item=>item.songId===state.curSongInfoId)
        let songid =0
        if (index>=0){
            songid = state.songInfoPages[index].songid
        }
        //评论
        let resultOfRelatedComment = await api.RelatedComment(songid,page)

        if (parseInt(resultOfRelatedComment.data.result)===100){
            commit('queryDataSongInfo',{
                dataOfRelatedComment:resultOfRelatedComment.data,
            })

        }

    },

    //mv
    async queryDataMvRecommend({state,commit},type){
        // debugger
        //校验是否存在
        let result = state.MvRecommend.find(item=>{
            return item.curMvType===type
        })
        if (result){
            //如果存在,执行commit方法,调用queryData,只改id
            commit('queryMvRecommend',{type})
            return
        }
        else {
            // debugger
            let resOfMvRecommend = await api.MvRecommend(type)
            if (parseInt(resOfMvRecommend.data.result)===100||parseInt(resOfMvRecommend.data.resultL)===100){
                commit('queryMvRecommend',{
                    type,//地区
                    list:resOfMvRecommend.data.data.list,
                })

            }
        }
    },
    //mv播放
    async queryDataMvPlayer({state,commit},vid){
        debugger
        //校验是否存在
        let result = state.MvList.find(item=>{
            return item.curMvVid===vid
        })
        if (result){
            //如果存在,执行commit方法,调用queryData,只改id
            commit('queryMvPlaying',{vid})
            return
        }
        else {
            debugger
            let resOfMvPlaying = await api.MvPlaying(vid)
            let resOfMvInfo = await api.MvInfo(vid)
            if (parseInt(resOfMvPlaying.data.result)===100||parseInt(resOfMvPlaying.data.resultL)===100){
                commit('queryMvPlaying',{
                    vid,//地区
                    dataOdMvPlaying:resOfMvPlaying.data.data,
                    dataOfMvInfo:resOfMvInfo.data.data
                })

            }
        }
    },

}
export default actions




