export default {
    path:'/homepage',
    component:() => import('@/views/musicHall/homepage/Homepage'),
    redirect:'/homepage/recommend',
    children:[
        {path: '',component:()=>import('@/views/musicHall/homepage/Recommend')},
        {path: 'recommend',component:()=>import('@/views/musicHall/homepage/Recommend')},
        {path: 'classic',component:()=>import('@/views/musicHall/homepage/Classic')},
        {path: 'ktv',component:()=>import('@/views/musicHall/homepage/Ktv')},
        {path: 'lovesong',component:()=>import('@/views/musicHall/homepage/Lovesong')},
        {path: 'networksong',component:()=>import('@/views/musicHall/homepage/Networksong')},
        {path: 'officialplaylist',component:()=>import('@/views/musicHall/homepage/Officialplaylist')},
    ]
}
