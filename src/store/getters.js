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
