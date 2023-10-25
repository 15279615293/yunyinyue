import React from 'react'
import './index.css'

export default function Index() {
  return (
    <div className='heads'>
      <div className='search'>
      <input type="text" placeholder='请输入歌名、歌词、歌手或专辑' /><span>搜索</span>
      </div>
    </div>
  )
}
