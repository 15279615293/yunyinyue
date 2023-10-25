import {useState,useEffect,useRef} from 'react'
import { useSearchParams,useNavigate } from 'react-router-dom'
import { getMvDetail,getSimiMv,getMvUrl } from '../../api'
import './index.css'

export default function Index() {
  const myVideo=useRef()
  const [search] = useSearchParams()
  const navigate=useNavigate()
  const id=search.get('id')
  const [mvDetail,setMv]=useState({})
  const [simiMv,setSimiMv]=useState([])
  async function getMv(){
    const result = await getMvDetail(id)
    if(result.data.code==200){
      setMv(result.data.data)
    }
    const result2 = await getSimiMv(id)
    if(result2.data.code==200){
      setSimiMv(result2.data.mvs)
    }
    const result3 = await getMvUrl(id)
    if(result3.data.code==200){
      myVideo.current.src=result3.data.data.url
    }
  }
  useEffect(()=>{
    getMv()
  },[id])
  function goMv(id){
    navigate(`/mvlist/mv?id=${id}`)
  }
  return (
    <div className='mv-detail'>
      <div className='mvdetail'>
        <div className='mv-video'>
          <div className='vido-title'>
            <i className='iconfont icon-MV1'></i>
            <span>{mvDetail.name}</span>
            <span>{mvDetail.artistName}</span>
          </div>
          <div className='video-content'>
            <video controls width='820px' height='458px' poster={mvDetail.cover} preload='metadata' ref={myVideo}>
              <source src='' type="video/mp4"/>
            </video>
          </div>
        </div>
        <div className='mv-introduction'>
          <div>
          <h3>MV简介</h3>
          <p>发布时间：{mvDetail.publishTime}</p>
          <p>播放量：{mvDetail.playCount>10000?(mvDetail.playCount * 0.0001).toFixed(1)+'万':mvDetail.playCount}</p>
          <p>{mvDetail.desc}</p>
          </div>
        </div>
      </div>

      <div className='similar-mv'>
        <h2 className='similar-title'>相似MV</h2>
        <div className='newmv-list'>
                {
                     simiMv.map(item => { 
                         return ( 
                            <div className='newmv-nav' key={item.id} onClick={()=>goMv(item.id)}>
                                <div className='newmv-img'>
                                    <img src={item.cover} alt="" />
                                    <i className='iconfont icon-shipinzhibo'></i>
                                </div>
                                <p>{item.name}</p>
                                <p>{item.artistName}</p>
                                <p>
                                    <i className='iconfont icon-shouye'></i>
                                    <span> {item.playCount>10000?(item.playCount * 0.0001).toFixed(1)+'万':item.playCount}</span>
                                </p>
                            </div>
                         ) 
                     })
                 } 
            </div>
      </div>
    </div>
  )
}
