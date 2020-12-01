import SingerInfoPage from '@/views/musicHall/singer/SingerInfoPage'
export default {
    path:'/singer',
    component:() => import('@/views/musicHall/singer/Singer'),
    children:[
        {
            path: '/infopage/:singermid',
            name: 'SingerInfoPage',
            component: SingerInfoPage,
            props: true

        },
    ]
}
