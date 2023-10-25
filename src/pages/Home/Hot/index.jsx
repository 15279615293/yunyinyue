import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getHotNav, getHotList } from '../../../api'
import HeadTitle from '../../../compontents/Title'
import './index.css'

export default function Index() {
  const navigate=useNavigate()
  const [hotNav, setHotNav] = useState([])
  const [demo] = useState(false)
  const [active, setActive] = useState(-1)
  const [playList, setPlayList] = useState([])
  const [data, setData] = useState({
    limit: 6,
    order: 'hot'
  })
  async function getNav() {
    const result = await getHotNav()
    if (result.data.code == 200) {
      setHotNav(result.data.tags)
    }
  }
  useEffect(() => {
    getNav()
  }, [])
  async function getPlayList() {
    let result = await getHotList(data)
    if (result.data.code == 200) {
      setPlayList(result.data.playlists)
    }
  }
  function navigations( { type,index, cat }) {
    if (type == 'one') {
      setActive(-1)
      setData({
        limit: 6,
        order: 'hot'
      })
    } else {
      setActive(index)
      setData({ ...data, cat })
    }
  }
  useEffect(() => {
    getPlayList()
  }, [data])
  function getDetail(id){
    navigate(`/playlist/detail?id=${id}`)
}
  return (
    <div className='hot'>
      <HeadTitle hotNav={hotNav} active={active} navigations={navigations} demo={demo} titles='热门推荐'/>
      <div className='contents'>
        {
          playList.map((item) => {
            return (
              <div className='list' key={item.id} onClick={()=>getDetail(item.id)}>
                <img src={item.coverImgUrl} alt="" />
                <p>{item.name}</p>
                <div>
                  {
                    item.tags.map((items, index) => {
                      return <span key={index}>#{items}</span>
                    })
                  }
                </div>
                <div className='number'>
                  <i className='iconfont icon-tingge'></i>
                  <span>{(item.playCount * 0.0001).toFixed(1)}万</span>
                  <span>/</span>
                  <span>{item.trackCount}首</span>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
