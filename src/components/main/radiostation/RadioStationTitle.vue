<template>
  <div class="radio-station-title "  id="station-nav"
  >
      <div class="title-wrap"
           :class="{'isFixed':stationNavFixed,'isEnd':stationNavEnd}"
      >
          <div v-for="(item,index) in titleList" :key="index" class="title-info"
          >
            <a :href="idList[index]"
               :class="{'selectTitle':activeIndex==index}"
               @click="selectCurrentTitle(index)"
            >{{item.title}}</a>
          </div>
      </div>
  </div>
</template>

<script>
    export default {
        data(){
          return{
              titleListTemp:[],//分类标题缓存
              titleList:[],//分类标题
              stationNavFixed:false,//是否固定样式
              stationNavEnd:false,//是否最后
              activeIndex:0,//活动当前的标题
              idList:[
                  '#hot',
                  '#theme',
                  '#mood',
                  '#scenes',
                  '#genre',
                  '#language',
                  '#crowd',
                  '#instrument'
              ],//id列表
              //各个分类的top位置
              hotTop:0,
              themeTop:0,
              moodTop:0,
              scenesTop:0,
              genreTop:0,
              languageTop:0,
              crowdTop:0,
              instrumentTop:0,
              endTop:0
          }
        },
      methods:{
          async fetchApi(){
              let titleListTemp = localStorage.getItem('titleListTemp')
              if (titleListTemp){
                  titleListTemp = JSON.parse(titleListTemp)
                  if (new Date().getTime(-titleListTemp.time<30*60*1000)){
                      this.titleListTemp = titleListTemp.data
                  }
              }else {
                  // debugger
                  let urlTitle = "/api/radio/category"
                  let resTitle  = await this.$http.get(urlTitle)
                  if (parseInt(resTitle.data.result)===100){
                      this.titleListTemp = resTitle.data.data
                      localStorage.setItem(
                        'titleListTemp',
                        JSON.stringify({
                            time:new Date().getTime(),
                            data:this.titleListTemp
                        })
                      )
                  }

              }





          },
          //滚动事件
          handleScroll(){
              //条件判断 获取到dom元素才执行
              if (document.querySelector("#station-nav")){
                  let scrollTop = window.pageYOffset || document.documentElement.scrollTop
                  let offsetTop = document.querySelector("#station-nav").offsetTop+150

                  if (scrollTop>offsetTop){
                      this.stationNavFixed = true
                      if (scrollTop<=this.themeTop){
                          this.activeIndex=0
                      }else if (scrollTop>this.themeTop&&scrollTop<=this.moodTop){
                          this.activeIndex=1
                      }else if (scrollTop>this.moodTop&&scrollTop<=this.scenesTop){
                          this.activeIndex=2
                      }else if (scrollTop>this.scenesTop&&scrollTop<=this.genreTop){
                          this.activeIndex=3
                      }else if (scrollTop>this.genreTop&&scrollTop<=this.languageTop){
                          this.activeIndex=4

                      }else if (scrollTop>this.languageTop&&scrollTop<=this.crowdTop){
                          this.activeIndex=5

                      }else if (scrollTop>this.crowdTop&&scrollTop<=this.instrumentTop){
                          this.activeIndex=6

                      }else if (scrollTop>this.instrumentTop){
                          this.activeIndex=7
                          this.stationNavFixed = true
                          this.stationNavEnd = false
                          if (scrollTop>this.endTop){
                              this.stationNavFixed = false
                              this.stationNavEnd = true
                          }

                      }


                  }else  if (scrollTop<=offsetTop){
                      this.stationNavFixed = false
                  }
              }



          },
          //设置各个分类的top位置
          setTitleTop(){
              if (document.querySelector('#hot')){
                  //为了滚动到半页左右触发条件,修改高度减少400,否则原先该元素头部到顶了才会触发
                  this.hotTop = document.querySelector('#hot').offsetTop
                  this.themeTop = document.querySelector('#theme').offsetTop-400
                  this.moodTop = document.querySelector('#mood').offsetTop-400
                  this.scenesTop = document.querySelector('#scenes').offsetTop-400
                  this.genreTop = document.querySelector('#genre').offsetTop-400
                  this.languageTop = document.querySelector('#language').offsetTop-400
                  this.crowdTop = document.querySelector('#crowd').offsetTop-400
                  this.instrumentTop = document.querySelector('#instrument').offsetTop-400
                  this.endTop = this.instrumentTop+750
              }

          },
          //标题点击事件
          selectCurrentTitle(index){
              this.activeIndex=index
              this.stationNavEnd=false
          },
      },

        computed:{

        },
      created() {
          this.fetchApi()
      },
      watch:{
            //标签列表处理
          titleListTemp(){
              this.titleListTemp.forEach((item,index) => {
                  // debugger
                  //只显示前8项
                  if (item.list.length && index<this.titleListTemp.length-2){
                      this.titleList.push(item)
                  }
                  //派发
                  this.$emit('contentList',this.titleList)
              })
          },
          $route(){
              this.fetchApi()
          }

      },

      mounted() {
          //滚动监听事件
          document.addEventListener('scroll',this.handleScroll)

      },
        updated() {
            this.setTitleTop()
        },
      destroyed () {
          //离开页面移除监听事件
          window.removeEventListener('scroll', this.handleScroll)
      },
    }
</script>
