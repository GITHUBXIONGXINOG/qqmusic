<template>
  <div>
      <div class="mod_header">
        <div class="main-header">
          <div class="main_header_wrap">
              <img src="../../../public/img/logo.png" alt="logo" class="log_img">
              <img src="../../../public/img/mark_1.png" class="mark_img">
              <div v-for="(item,index) in titleAll" :key="index" class="title">
                  <a href="javascript:;">{{item}}</a>
              </div>
              <div class="searchInput">
                  <div class="searchAndIcon">
                      <input type="text" placeholder="搜索音乐、MV、歌单、用户">
                      <a href="javascript:;" class="iconfont searchIcon">
                          <i></i>
                      </a>
                  </div>
              </div>
              <div class="userSet">
                  <div class="login">
                    <a href="javascript:;">登录</a>
                  </div>
                  <div class="openVipPosition">
                      <div class="openVip">
                           <a href="javascript:;">开通VIP</a>
                           <img src="../../../public/img/箭头下.svg" alt="">
                           <img src="../../../public/img/箭头上.svg" alt="">
                      </div>
                  </div>

                  <div class="reCharge">
                    <a href="javascript:;">充值</a>
                  </div>

              </div>

          </div>

          <div class="nav-list">
            <ul>
              <li
                  v-for="item of navList"
                  :key="item.name"
                  :class="['select',{'nav-active': isActive(item.path)}]"
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
      ],
      titleAll:['音乐馆','我的音乐','客户端','开放平台','VIP']
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


