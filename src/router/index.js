import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

//导入子路由
import Main from '@/views/Main'
import Homepage from '@/views/Homepage'
import Singer from '@/views/Singer'
import Record from '@/views/Record'
import Rank from '@/views/Rank'
import CategoryPlaylist from '@/views/CategoryPlaylist'
import RadioStation from '@/views/RadioStation'
import Mv from '@/views/Mv'
import DigitalAlbum from '@/views/DigitalAlbum'
import Ticketing from '@/views/Ticketing'
// import SingerListTitle from '@/views/SingerListTitle'
import Classic from '@/views/homepage/Classic'
import Ktv from '@/views/homepage/Ktv'
import Lovesong from '@/views/homepage/Lovesong'
import Networksong from '@/views/homepage/Networksong'
import Officialplaylist from '@/views/homepage/Officialplaylist'
import Recommend from '@/views/homepage/Recommend'


const routes = [
  {
    path:'/',
    component:Main,
    //Main路由的子路由
    children:[
      {path: '',component: Homepage},
      {path: 'homepage',component:Homepage,children:[
          {path: '',component:Recommend},
          {path: 'classic',component:Classic},
          {path: 'ktv',component:Ktv},
          {path: 'lovesong',component:Lovesong},
          {path: 'networksong',component:Networksong},
          {path: 'officialplaylist',component:Officialplaylist},
          {path: 'recommend',component:Recommend},

        ]},
      {path: 'singer',component:Singer},
      {path: 'record',component:Record},
      {path: 'rank',component:Rank},
      {path: 'categoryPlaylist',component:CategoryPlaylist},
      {path: 'radioStation',component:RadioStation},
      {path: 'mv',component:Mv},
      {path: 'digitalAlbum',component:DigitalAlbum},
      {path: 'ticketing',component:Ticketing},
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
