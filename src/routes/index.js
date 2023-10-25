import { Navigate } from 'react-router-dom'
import Home from '../pages/Home'
import Rank from '../pages/Rank'
import PlayList from '../pages/PlayList'
import MVList from '../pages/MVList'
import Singer from '../pages/Singer'
import MyMusic from '../pages/MyMusic'
import PlayDetail from '../pages/PlayList/Detail'
import Song from '../pages/Song'
import Mv from '../pages/Mv'


export default [
    {
        path:'/home',
        element:<Home/>
    },
    {
        path:'/rank',
        element:<Rank/>
    },
    {
        path:'/playlist',
        element:<PlayList/>,
        children:[
            {
                path:'/playlist/detail',
                element:<PlayDetail/>
            }
        ]
    },
    {
        path:'/mvlist',
        element:<MVList/>,
        children:[
            {
                path:'/mvlist/mv',
                element:<Mv/>
            }
        ]
    },
    {
        path:'/singer',
        element:<Singer/>
    },
    {
        path:'/mymusic',
        element:<MyMusic/>
    },
    {
        path:'/song',
        element:<Song/>
    },
    {
        path:'/',
        element:<Navigate to='/home' />
    },
]