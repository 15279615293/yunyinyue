import React, { useState,useEffect } from 'react'
import { useRoutes,useNavigate,useLocation } from 'react-router-dom'
import routes from '../../routes'
import Heads from '../Heads'
import Bar from '../Bar'
import "./index.css"

export default function Index() {
  const element = useRoutes(routes)
  const navigate = useNavigate()
  const [listNav] = useState([
    { id: '001', name: '首页', icons: 'iconfont icon-shouyefill',paths:'/home' },
    { id: '002', name: '排行榜', icons: 'iconfont icon-paihangbang',paths:'/rank' },
    { id: '003', name: '歌单', icons: 'iconfont icon-gedan',paths:'/playlist' },
    { id: '004', name: 'MV', icons: 'iconfont icon-MV',paths:'/mvlist' },
    { id: '005', name: '歌手', icons: 'iconfont icon-geshou',paths:'/singer' },
    { id: '006', name: '我的音乐', icons: 'iconfont icon-caidan',paths:'/mymusic' },
  ])
  const [actives,setActive] = useState(0)
  const routePath= useLocation()
  const name =routePath.pathname
  useEffect(()=>{
    const index = listNav.findIndex((item)=>{
      return name==item.paths
    })
    setActive(index)
  },[name])
  function addActive(paths,index){
    setActive(index)
    navigate(paths)
  }
  return (
    <div style={{display:'flex'}}>
      <div className='navigation'>
      <img src="data:image/jpeg;base64,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" alt="" />
      <div className='navigation-list'>
        {
          listNav.map((item,index) => {
            return (
              <div className={['list-nav',actives==index?'active':''].join(' ')} key={item.id} onClick={()=>addActive(item.paths,index)}>
                <i className={item.icons}></i>
                <span>{item.name}</span>
              </div>
            )
          })
        }
      </div>
    </div>
    <div className='rightrouter'>
      <Heads/>
      {element}
    </div>
    <Bar/>
    </div>
  )
}
