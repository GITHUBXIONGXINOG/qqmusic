<template>
    <div class="main-header">
      <div class="title">
        {{ title }}
      </div>
      <div class="nav-list">
        <ul>
          <li
              v-for="item of navList"
              :key="item.name"
          >
            {{item.name }}
          </li>
        </ul>
      </div>
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
            { path:'/',name:'排行榜'},
            { path:'/',name:'分类歌单'},
            { path:'/',name:'电台'},
            { path:'/',name:'MV'},
            { path:'/',name:'数字专辑'},
            { path:'/',name:'票务'},
          ]
        }
      }
    }
</script>
