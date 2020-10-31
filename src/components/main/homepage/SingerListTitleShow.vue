<template>
  <div >
      <div class="singer-list-title-show" >
        <div class="song-list">
          <div class="playlistRecommendation">
            歌单推荐
          </div>
          <div class="song-wrap">
              <ul class="song-list-ul">
                <li
                    v-for="item of songList"
                    :key="item.name"
                    :class="{'nav-active': isActive(item.path)}"
                    @click="navClick(item.path) "
                >
                  {{item.name}}
                </li>
              </ul>
          </div>

        </div>
    </div>

  </div>
</template>

<script>

export default {

  data(){
    return{
      songList:[
        {path: '/homepage/recommend',name:'为你推荐'},
        {path: '/homepage/officialplaylist',name:'官方歌单'},
        {path: '/homepage/lovesong',name:'情歌'},
        {path: '/homepage/networksong',name:'网络歌曲'},
        {path: '/homepage/classic',name:'经典'},
        {path: '/homepage/ktv',name:'KTV热歌'},
      ],
    }
  },
  methods:{
    navClick(path){
      //派发事件 通知父组件被点击
      this.$emit('nav-click',path)
    },
    isActive(path){
      console.log(path)
      console.log(this.$route.path)
      debugger
      if (path === this.$route.path){
        return true
      }
      if (path === '/recommend' && this.$route.path === '/homepage' ){
        return true
      }
      if (path === '/homepage/recommend' && this.$route.path === '/homepage' ){
        return true
      }

      return false
    }
  },
  components:{

  },
  mounted() {

  }


}
</script>



