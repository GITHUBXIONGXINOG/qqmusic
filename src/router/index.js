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
import MvPlayer from '@/views/musicHall/playrer/MvShowPage'
import Error from '@/components/Error.vue'
import SongInfoPage from "@/views/musicHall/infopage/SongInfoPage";
import SingerInfoPage from "@/views/musicHall/singer/SingerInfoPage";
export default new VueRouter({
    // meta: {
    //     keepAlive: true // true需要缓存，false不需要缓存
    // },
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
                {
                    path: '/songinfo/:songId',
                    name: 'SongInfo',
                    component: SongInfoPage,
                    props: true
                },
                {
                    path: '/mvplayer/:vid',
                    name: 'MvPlayer',
                    component: MvPlayer,
                    props: true

                },
                {
                    path: '/singerinfopage/:singermid',
                    name: 'SingerInfoPage',
                    component: SingerInfoPage,
                    props: true

                },


            ]
        },
        {
            path: '/player/:songId',
            name: 'Player',
            component: Player,
            props: true

        },

        {
            path:'*',
            component:Error
        }

  ],
    scrollBehavior(to, from, saveTop) {
        if (saveTop) {
            return saveTop;
        } else {
            return { x: 0, y: 0 }
        }
    },

})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

