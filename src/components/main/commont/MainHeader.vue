<!--头部公共组件-->
<template>
  <div class="outer_header">
      <div class="mod_header">
        <div class="main-header">
          <div class="main_header_wrap">
              <img src="../../../../public/img/logo.png" alt="logo" class="log_img">
              <img src="../../../../public/img/mark_1.png" class="mark_img">
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
                  <div v-for="(item,index) in selectBox" :key="index"
                        :class="`select-box-${index}`"
                  >
                      <ul href="javascript:;" >
                          <a href="javascript:;">
                              {{item}}
                              <svg class="icon triangle-down" aria-hidden="true">
                                  <use xlink:href="#icon-sanjiaoxing2"></use>
                              </svg>
                              <svg class="icon triangle-up" aria-hidden="true">
                                  <use xlink:href="#icon-sanjiaoxing"></use>
                              </svg>
                              <div class="select-box-wrap">
                                  <li v-for="(i,j) in BoxContent" :key="j"
                                      :class="`box-content-${index}-${j}`">
<!--                                      <a href="javascript:;">{{j}}</a>-->
                                      <a href="javascript:;">{{i[index]}}</a>

                                      <!--    <li>{{i[index]}}</li>-->
                                  </li>
                              </div>
                          </a>


                      </ul>
                  </div>
              </div>
          </div>
          <div class="nav-list"> <!--导航栏:首页,歌手..-->
            <ul>
              <li
                  v-for="item of navList"
                  :key="item.name"
                  :class="['select',{'nav-active': isActive(item.path)}]"
                  @click="navClick(item) "
              >
                {{item.name }}
              </li>
            </ul>
          </div>
      </div>
      </div>

  </div>


</template>

<script>
export default {
  props:{

  },
  data(){
    return{
        titleAll:[
            '音乐馆','我的音乐','客户端','开放平台','VIP'
        ],
        navList:[
        { path:'/homepage',name:'首页'},
        { path:'/singer',name:'歌手'},
        { path:'/newrecord',name:'新碟'},
        { path:'/rank',name:'排行榜'},
        { path:'/categoryplaylist',name:'分类歌单'},
        { path:'/radiostation',name:'电台'},
        { path:'/mv',name:'MV'},
        { path:'/digitalalbum',name:'数字专辑'},
        { path:'/ticketing',name:'票务'},
      ],
        selectBox:[
            '开通vip',
            '充值'
        ],
        BoxContent:[
            [
                '开通绿钻豪华版',
                '开通付费包'
            ],
            [
                '购买乐币',
                '充值饭票'
            ]
        ],


    }
  },
  methods:{
    navClick(item){
      //派发事件 通知父组件被点击
      this.$emit('nav-click',item.path)
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


