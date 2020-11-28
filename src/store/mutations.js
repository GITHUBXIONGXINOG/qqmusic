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
        }=payload
        // state.cur = songId || content_id
        state.cur = songId || dataOfFirstSongMid
        // debugger
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
    }
 export const  queryDataMDelete = (state,payload) =>{
        // debugger
        let {
            songId,
            result,
        }=payload
        state.playList.splice(result,1 )

        let res = state.playList.find(item=>{
            return item.mid===songId
        })
        if (!res){
            // let result = state.list.findIndex(item=>item.mid)
            state.cur = state.playList[0].mid
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
