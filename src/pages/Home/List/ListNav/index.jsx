import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getPlayList } from '../../../../api'
import './index.css'

export default function Index(props) {
  const {id} = props
  var dayjs = require('dayjs')
    const [playList, setList] = useState({})
    useEffect(() => {
        getList()
    }, [])
    async function getList() {
        const result = await getPlayList(id, '8')
        if (result.data.code == 200) {
            setList(result.data.playlist)
        }
    }
    const navigate=useNavigate()
    const goSong=(id)=>{
      navigate(`/song?id=${id}`)
    }
  return (
    <div className='list'>
      <p className='texts'>{playList.name}</p>
      <div className='list-time'>
        <span>最近更新:</span>
        <span>{dayjs(playList.updateTime).format('MM') + '月' + dayjs(playList.updateTime).format('DD') + '日'}</span>
        {/* <span>(刚刚更新)</span> */}
      </div>
      <div className='listnav'>
        {
          playList.tracks ? playList.tracks.slice(0, 5).map(item => {
            return (
              <div className='list-nav' key={item.id} onClick={()=>goSong(item.id)}>
                <img src={item.al.picUrl} alt="" />
                <div>
                  <p>{item.al.name}</p>
                  <p>{item.ar[0].name}</p>
                </div>
                <div className='icons'>
                  <button title='添加到列表'><i className='iconfont icon-category-add'></i></button>
                  <button title='添加到收藏'><i className='iconfont icon-folder-add'></i></button>
                </div>
              </div>
            )
          }) : ''
        }
      </div>
    </div>
  )
}
