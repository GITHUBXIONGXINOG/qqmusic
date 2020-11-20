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
              <div class="searchInput" id="searchInput">
                  <div class="searchAndIcon">
                      <input type="text" placeholder="搜索音乐、MV、歌单、用户"
                        @focus="isShowHot=true"
                        @click.stop="fetchApi()"
                        v-model="inputSearch"
                        @keyup.enter="searchSong(inputSearch)"
                      >
                      <!--搜索按钮-->
                      <a href="javascript:;" class="iconfont searchIcon"
                         @mousedown.stop="searchSong(inputSearch)"
                        >
                          <i></i>
                      </a>

                  </div>
                  <div class="searchPanel" v-show="isShowHot">
                      <!--热搜-->
                      <ul class="hotSearch-ul">
                          <li v-for="(item,index) in hotSearch" v-show="index<5" :key="index"
                              class="hotSearch-li"
                              @click.stop="searchSong(item.name)"
                          >

                              <i class="hotSearch-rank">{{index+1}}</i>
                              <span class="hotSearch-name">
                                  <a href="javascript:;">{{item.name}}</a>
                              </span>
                              <span class="hotSearch-number">
                                   {{item.number}}
                              </span>


                          </li>
                      </ul>
                      <!--搜索历史-->
                      <div class="searchHistory">
                          <nav class="history-title">
                              <i class="content">搜索历史</i>
                              <a href="javascript:;" class="iconfont icon-lajixiangzizhi"
                                @click="deleteAll"
                              ></a>
                          </nav>
                          <div v-for="(item,index) in searchHistory" :key="index" class="history-list">
                              <a href="javascript:;">{{item}}</a>
                              <span class="iconfont icon-cuowu" @click="deleteOne(index)"></span>
                          </div>
                      </div>
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
        // { path:'/ticketing',name:'票务'},
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
        isShowHot:false,//展示热搜词
        hotSearch:[],//热搜词列表
        inputSearch:'',//搜索
        searchHistory:[],//搜索历史
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
    },
      async fetchApi(){
        let urlHot =  '/api/search/hot'
           const resHot = await this.$http.get(urlHot)
          // debugger
          // console.log(resHot.data.data)
          this.hotSearch = resHot.data.data.map(item=>({
              name:item.k,
              number:this.numToTenThousand(item.n)
          }))
          // console.log(this.hotSearch)

      },
      //转换位数
      numToTenThousand(num){
          if (num < 10000){
              return num
          }
          let res = num / 10000
          //  toFixed 四舍五入 保留指定小数位数
          return res.toFixed(1)+'万'
      },
      //搜索
      searchSong(item){
        // debugger
        //通过传入的数据作为输入数据
        if ( this.inputSearch!=item){
            // console.log(item)
            this.inputSearch=item
        }
        //通过双向数据绑定inputSearch获取搜索数据
        // 正则表达式,存在的历史不再次记录
          const reg = new RegExp(`^${this.inputSearch}$`)
          let flag = true;
          this.searchHistory.forEach(item=>{
              if (item.match(reg)){
                 flag = false
              }
          })
          if (flag&&this.inputSearch){
              this.searchHistory.push(this.inputSearch)
          }
          //只保留最新的5个记录
          if ( this.searchHistory.length>5){
              this.deleteOne(0)
          }
      },
      //删除一项
      deleteOne(index){
        this.searchHistory.splice(index,1)
      },
      //删除所有历史记录
      deleteAll(){
        this.searchHistory=[]
      }
  },
  created() {

  },

  components:{
  },
    watch:{
/*        inputSearch(val){

        }*/
    },
    mounted() {
      document.addEventListener('click',e=>{
            const searchBox = document.getElementById('searchInput')
          if (searchBox){
              if (!searchBox.contains(e.target)){
                  this.isShowHot=false
              }
          }
      })
    }


}
</script>


