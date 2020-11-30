//时间格式化
import api from "@/api";

function timeFormat(val){
    // debugger
    let min = Math.floor(val/60)
    let s = Math.floor(val%60)
    min = min<10 ? '0'+min : min
    s = s<10 ? '0'+s : s
    return min + ':' + s

}
//歌词格式化 时间
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
//歌词格式化 文本显示
function formatLyricHtml(lyric) {
    let lyrics = lyric.split("\n")
    //歌词对象
    let lyrArr = []
    //* 贪婪匹配,有多少匹配多少
    let reg = /\[\d*:\d*\.\d*]/g
    for (let i = 0; i < lyrics.length; i++) {
        let timerRegExpArr = lyrics[i].match(reg)
        if (!timerRegExpArr) continue
        let t = timerRegExpArr[0] //数值格式,取出数据
        //取出分钟
         Number(t.match(/\[\d*/).toString().slice(1))
        //取出秒
         Number(t.match(/:\d*/).toString().slice(1))
        //歌词文本
         lyrArr += lyrics[i].replace(timerRegExpArr,"") + '<br />'
    }
    // debugger
    return lyrArr
}

    //state 原始状态
//payload 只能传一个参数,通过解构出想要的值
export const queryDataSong = (state, payload)=>{
        // debugger
        let {
            songId,//歌词id
            dataOfInfo,//歌曲信息
            dataOfPlay,//播放url
            detaOfLyric,//歌词
            content_id,//歌单id
            dataOfSongList,//歌单数据
            dataOfFirstSongMid,//歌单第一个歌曲id
            dataOfSongLyrics,//歌词
            albummid,//专辑
            topId,//排行榜
        }=payload
        // state.cur = songId || content_id
        state.cur = songId || dataOfFirstSongMid
        // 歌曲
        if (dataOfInfo&&dataOfPlay&&detaOfLyric){
            // state.list.push(data)
            //...data 扩展运算符,将data复制一份,并且后面的时间interval的值为
            state.playList.unshift({
                ...dataOfInfo,
                interval:timeFormat(dataOfInfo.interval),//时间
                playerUrl:dataOfPlay,//播放链接
                singerName:dataOfInfo.singer[0].name,//歌手名字
                songPic: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${dataOfInfo.album.mid}.jpg`,//歌曲图片
                detaOdLyric:detaOfLyric,
                lyric:formatLyric(detaOfLyric),
                albumname:dataOfInfo.album.title
            })
        }
        //歌单
        else if (content_id&&dataOfSongList&&dataOfPlay){
            // debugger
            state.playList=[]
            dataOfSongList.songlist.forEach((item,index)=>{
                // console.log(dataOfSongLyrics);
                if (index<1){
                    // console.log(dataOfSongLyrics[0]);
                    state.playList.push({
                        ...item,
                        interval:timeFormat(item.interval),//时间
                        playerUrl:dataOfPlay[index],//播放链接
                        singerName:item.albumname,//歌手名字
                        songPic: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${item.albummid}.jpg`,//歌曲图片
                        lyric:formatLyric(dataOfSongLyrics[0]),
                        mid:item.songmid,
                        title:item.songname
                    })
                }else{
                    state.playList.push({
                        ...item,
                        interval:timeFormat(item.interval),//时间
                        playerUrl:dataOfPlay[index],//播放链接
                        singerName:item.albumname,//歌手名字
                        songPic: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${item.albummid}.jpg`,//歌曲图片
                        mid:item.songmid,
                        title:item.songname
                    })
                }

                // debugger

            })
            // state.list.push({...dataOfSongList.songlist})
        }
        //专辑
        else if (albummid&&dataOfSongList&&dataOfPlay){
            // debugger
            state.playList=[]
            dataOfSongList.forEach((item,index)=>{
                // console.log(dataOfSongLyrics);
                if (index<1){
                    // console.log(dataOfSongLyrics[0]);
                    state.playList.push({
                        ...item,
                        interval:timeFormat(item.interval),//时间
                        playerUrl:dataOfPlay[index],//播放链接
                        singerName:item.singer[0].name,//歌手名字
                        songPic: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${item.album.pmid}.jpg`,//歌曲图片
                        lyric:formatLyric(dataOfSongLyrics[0]),
                        mid:item.mid,
                        title:item.title
                    })
                }else{
                    state.playList.push({
                        ...item,
                        interval:timeFormat(item.interval),//时间
                        playerUrl:dataOfPlay[index],//播放链接
                        singerName:item.singer[0].name,//歌手名字
                        songPic: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${item.album.pmid}.jpg`,//歌曲图片
                        mid:item.mid,
                        title:item.title
                    })
                }

                // debugger

            })
            // state.list.push({...dataOfSongList.songlist})
        }
        //排行榜
        else if (topId&&dataOfSongList&&dataOfPlay){
            debugger
            state.playList=[]
            dataOfSongList.forEach((item,index)=>{
                // console.log(dataOfSongLyrics);
                    state.playList.push({
                        ...item,
                        interval:timeFormat(item.interval),//时间
                        playerUrl:dataOfPlay[index],//播放链接
                        singerName:item.singerName,//歌手名字
                        songPic: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${item.albumMid}.jpg`,//歌曲图片
                        mid:item.mid,
                        title:item.title
                    })
            })
            // state.list.push({...dataOfSongList.songlist})
        }
    }

export const  queryDataMDelete = (state,songId) =>{
        // debugger
        let index = state.playList.findIndex(item=>item.mid===songId)
     if (index>=0){//找到该歌曲
         state.playList.splice(index,1 )//删除该歌曲

         //判断当前的歌曲id还在不在state里面,在的话不用处理
         let res = state.playList.find(item=>{
             return item.mid===state.cur
         })
         //如果不再的话说明删除的是当前播放的歌曲,重新赋值cur,后面的上来一位
         if (!res){
             // let result = state.list.findIndex(item=>item.mid)
             if (state.playList[index]){
                 state.cur = state.playList[index].mid
             }else if (state.playList[index-1]){
                 state.cur = state.playList[index-1].mid

             }else{
                 state.cur=''
             }
         }
     }

    }


// 获取 audio 元素
export const getAudio = (state, audio) => {
    state.audio = audio
}
//是否播放标识
export const isPlayMutation = (state, payload) => {
    state.isPlay = payload
}

export const setCurrentMid = (state,payload) =>{
    state.cur = payload
}
export const setCurrentLyric = (state,payload) =>{
    state.currentLyric = payload
}
// 设置播放列表
export const setPlayList = (state,payload)=>{
    state.playList = payload
}

//清空列表
export const deleteAllSongList = (state) =>{
    state.cur=0,
    state.playList=[],
    state.isPlay=false,
    state.audio=null
}
//删除选中歌曲
export const deleteSelectSong = (state,payload) =>{
    // console.log(payload)
    payload.forEach(mid=>{
        queryDataMDelete(state,mid)
    })
}
//存入歌词
export const addLyric = (state,payload) =>{
    let {songmid,lyrArr} = payload
    // debugger
    let index = state.playList.findIndex(item=>{
        return item.mid===songmid
    })
    if (index){
        state.playList[index].lyric=lyrArr
    }
}

//前一首歌曲
export const preSong = (state,order) =>{
    let index = state.playList.findIndex(item=>{
        return item.mid === state.cur
    })
    let songId = ''
    //列表长度,默认能取值长度-1
    let len = state.playList.length-1
    //顺序播放,播放完后停止
    if (order===0) {
        if (index > 0) {
            songId = state.playList[index-1].mid
        } else {//第一项
            songId = state.cur
        }
    }
    //随机播放
    else if(order===1){
        debugger
        //生成一个不大于列表长度的随机math
        let math = 0
        //大于1个歌曲
        if (len){
            do{
                math = Math.floor(Math.random()*len)

            }while (math==index)
        }else {
            math=0
        }
        songId = state.playList[math].mid
    }
    //单曲循环
    else if (order===2){
        songId = state.cur
    }
    //列表循环
    else if (order===3){
        if (index>1){
            songId = state.playList[index-1].mid
        }else {//最后一项
            songId = state.playList[len].mid
        }
    }

    state.cur=songId
}
//后一首歌曲
export const nextSong = (state,order) =>{
    let index = state.playList.findIndex(item=>{
        return item.mid === state.cur
    })
    let songId = ''
    //列表长度,默认能取值长度-1
    let len = state.playList.length-1
    //顺序播放,播放完后停止
    if (order===0) {
        if (index < len) {
            songId = state.playList[index + 1].mid
        } else {//最后一项
            songId = state.cur
        }
    }
    //随机播放
    else if(order===1){
        //生成一个不大于列表长度的随机math
        let math = 0
        if (len){
            do{
                //Math.random取值[0,1),所以要+1
                math = Math.floor(Math.random()*(len+1))

            }while (math==index)
        }else {
            math = 0
        }

            songId = state.playList[math].mid
    }
    //单曲循环
    else if (order===2){
        songId = state.cur
    }
    //列表循环
    else if (order===3){
        if (index<state.playList.length-1){
            songId = state.playList[index+1].mid
        }else {//最后一项
            songId = state.playList[0].mid
        }
    }

    state.cur=songId
}

//首页歌单推荐
export const queryRecommendList = (state,payload) =>{
    // debugger
    let {
        id,//歌单id
        list,//数据
    } = payload
    //当前的id

    state.curRecId = id
    //如果list存在,说明传入了数据进行存储
    if (list){
        list.forEach(item=>{
            item.imgUrl=item.cover_url_small||item.cover_url_medium
            item.content_id=item.tid
            item.listen_num=item.access_num
        })

        state.recommendList.push({
            ...list,
            id,
        })

    }
}

//新歌首发
export const queryNewSong = (state,payload) =>{
    // debugger
    let {
        type,//地区
        list,//数据
    } = payload
    //当前的id

    state.curNewSType = type
    //如果list存在,说明传入了数据进行存储
    if (list){
        list.forEach(item=>{
            item.imgUrl=`https://y.gtimg.cn/music/photo_new/T002R300x300M000${item.album.pmid}.jpg`
            item.singer=item.singer[0].name
            item.id=item.album.id
        })

        state.newSongStarting.push({
            ...list,
            curNewSType:state.curNewSType,
        })

    }
}

//新碟首发
export const queryNewRecord = (state,payload) =>{
    // debugger
    let {
        type,//地区
        list,//数据
    } = payload
    //当前的id

    state.cueNewRType = type
    //如果list存在,说明传入了数据进行存储
    if (list){
        debugger
        list.forEach(item=>{
            item.imgUrl=`https://y.gtimg.cn/music/photo_new/T002R300x300M000${item.mid}.jpg`
            item.singer=item.singers[0].name
            item.title=item.name
            item.albummid=item.mid
        })
        state.newRecordStarting.push({
            ...list,
            cueNewRType:state.cueNewRType,
        })

    }
}

//歌曲详细页
export const queryDataSongInfo = (state, payload)=>{
    // debugger
    let {
        songId,//歌曲id
        songid,//歌曲关联id
        dataOfSongInfo,//歌曲信息
        dataOfRelatedSongList,//相关歌单
        dataOfRelatedMV,//相关mv
        dataOfRelatedComment,//相关评论
        dataOfSongLyrics,//歌词
    }=payload
    // state.cur = songId || content_id
    if (songId){
        state.curSongInfoId = songId
    }
    // 歌曲
    if (songId&&dataOfSongInfo){
        state.songInfoPages.push({
            songId,//歌曲id
            songid,//歌曲关联id
            imgUrl:`https://y.gtimg.cn/music/photo_new/T002R300x300M000${dataOfSongInfo.data.track_info.album.pmid}.jpg` ,
            title: dataOfSongInfo.data.track_info.title,//歌名
            singer: dataOfSongInfo.data.track_info.singer,//歌手
            album: dataOfSongInfo.data.track_info.album.title,//专辑
            genre:dataOfSongInfo.data.info.genre||null,//流派
            pub_time:dataOfSongInfo.data.info.pub_time.content[0].value||null,//发行时间
            lan:dataOfSongInfo.data.info.lan.content[0].value||null,//语种
            company:dataOfSongInfo.data.info.company.content[0].value||null,//唱片公司
            lyric:formatLyricHtml(dataOfSongLyrics),//歌词
            commend:dataOfRelatedComment,//评论
            RelatedSongList:dataOfRelatedSongList,//相关歌单
            RelatedMV:dataOfRelatedMV,//相关mv
        })
    }
    //评论修改
    else if (dataOfRelatedComment){
        // debugger
        let index = state.songInfoPages.findIndex(item=>item.songId==state.curSongInfoId)
        state.songInfoPages[index].commend=dataOfRelatedComment
    }

}
