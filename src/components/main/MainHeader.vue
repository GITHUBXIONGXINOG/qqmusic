<template>
  <div>
      <div class="mod_header">
        <div class="main-header">
          <div class="title">
            {{ title }}
          </div>
          <div class="nav-list">
            <ul>
              <li
                  v-for="item of navList"
                  :key="item.name"
                  :class="{'nav-active': isActive(item.path)}"
                  @click="navClick(item.path) "
              >
                {{item.name }}
              </li>
            </ul>
          </div>
      </div>
      </div>
<!--      <singer-list-tile
      />-->
  </div>
</template>

<script>

export default {
  props:{
    title:{
      type:String,
      default:'Music'
    }
  },
  data(){
    return{
      navList:[
        { path:'/homepage',name:'首页'},
        { path:'/singer',name:'歌手'},
        { path:'/record',name:'新碟'},
        { path:'/rank',name:'排行榜'},
        { path:'/categoryPlaylist',name:'分类歌单'},
        { path:'/radioStation',name:'电台'},
        { path:'/mv',name:'MV'},
        { path:'/digitalAlbum',name:'数字专辑'},
        { path:'/ticketing',name:'票务'},
      ]
    }
  },
  methods:{
    navClick(path){
      //派发事件 通知父组件被点击
      this.$emit('nav-click',path)
    },
    isActive(path){
      let reg = new RegExp('^'+path+'/')
      if (this.$route.path.match(reg)){
        return true
      }
      if (path === this.$route.path ){
        return true
      }
      if (path === '/homepage' && this.$route.path === '/'){
        return true
      }
      return false
    }
  },
  created() {

  },

  components:{

  }


}
</script>


