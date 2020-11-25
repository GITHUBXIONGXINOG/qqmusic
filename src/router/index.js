import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

//导入子路由
import Main from '@/views/Main'
import Homepage from '@/views/musicHall/homepage/Homepage'
import Singer from './musichall/singer'
import NewRecord from './musichall/newrecord'
import Rank from './musichall/rank'
import CategoryPlaylist from './musichall/categoryplaylist'
import RadioStation from './musichall/radiostation'
import Mv from './musichall/mv/'
import DigitalAlbum from './musichall/digitalablum'
import Search from '@/views/musicHall/search/Search'
import Player from '@/views/musicHall/playrer/PlayerPage'
export default new VueRouter({
  mode:'history',
  base:process.env.BASE_URL,
    routes:[
        { path:'/',
            component:Main,
            redirect:'/homepage',
            children:[
                { path:'',component:Homepage,redirect:'/homepage'},
                { path:'/homepage',component:Homepage},
                // Homepage,
                Singer,
                CategoryPlaylist,
                NewRecord,
                Rank,
                RadioStation,
                Mv,
                DigitalAlbum,
                // Ticketing,
                {
                    path: '/search',
                    name: 'search',
                    component: Search,
                },

            ]
        },
        {
            path: '/player/:songId',
            // path: '/player',
            name: 'Player',
            component: Player,
            props: true

        }

  ]

})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

