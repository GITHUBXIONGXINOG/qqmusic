import { createRouter, createWebHashHistory } from 'vue-router'

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


const routes = [
  {
    path:'/',
    component:Main,
    children:[
      {path: '',component: Homepage},
      {path: 'homepage',component:Homepage},
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

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
