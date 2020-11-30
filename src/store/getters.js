// audio 元素
export const audio = state => state.audio
//播放状态
export const isPlay = state => state.isPlay
//当前的歌曲id
export const cur = state => state.cur
//当前歌词元素
export const currentLyric = state => state.currentLyric
//当前歌单推荐列表
export const recommendList = state => state.recommendList.find(item=>item.id===state.curRecId||null)
//当前新歌首发
export const newSongStarting = state => state.newSongStarting.find(item=>item.curNewSType===state.curNewSType||null)
//当前新碟首发
export const newRecordStarting = state => state.newRecordStarting.find(item=>item.curNewRType===state.curNewRType||null)
//歌曲详细页信息
export const songInfoPage = state => state.songInfoPages.find(item=>item.songId===state.curSongInfoId||null)
//mv推荐
export const MvRecommend = state => state.MvRecommend.find(item=>item.MvType===state.curMvType||null)
//mv播放
// export const MvList = state => state.MvList.find(item=>item.MvVid===state.curMvVid||null)
