import {useState,useEffect} from 'react'
import PubSub from 'pubsub-js';
import { useNavigate } from 'react-router-dom'
import { getPlayList } from '../../api';
import { Pagination,Spin } from 'antd';
import './index.css'

export default function Index() {
    var dayjs = require('dayjs')
    const navigate=useNavigate()
    function changPage(page, pageSize){
        const result = playList.tracks.filter((item,index)=>{
          if(page==1){
            return index<20
          }else{
            return index<=page*pageSize-1 && index>=(page-1)*pageSize
          }
        })
        setTracks(result)
      }
    let getId=null
    const [playList,setPlagyList] = useState({})
    const [tracks,setTracks] = useState([])
    const [id,setId] = useState()
    useEffect(()=>{
      setTracks([])
      getId=PubSub.subscribe("getId",(_,id)=>{
        setId(id)
      })
      if(id){
        getPlayLists()
      }
    },[id])
    useEffect(()=>{
      return ()=>{
        PubSub.unsubscribe(getId)
      }
    },[])
    async function getPlayLists(){
      const result = await getPlayList(id,'-1')
      if(result.data.code==200){
        setPlagyList(result.data.playlist)
        const tra = result.data.playlist.tracks.filter((_,index)=>index<20)
        setTracks(tra)
      }
    }
    function goSong(id){
      navigate(`/song?id=${id}`)
    }
  return (
    <div className='rank-content'>
      <div className='hands'>
        <img src={playList.coverImgUrl} alt="" />
        <div className='hands-title'>
          <p className='one'>
            <span>{playList.name}</span> 
            <span>（{dayjs(playList.updateTime).format('MM') + '月' + dayjs(playList.updateTime).format('DD') + '日'}更新）</span>
          </p>
          <div className='two'>
            {
              playList.creator?<div>
              <img src={playList.creator.avatarUrl} alt="" />
              <span>{playList.creator.nickname}</span>
              <span>{dayjs(playList.createTime).format('YYYY-MM-DD')}</span>
              </div>:''
            }
            {/* {
                playList.tags?playList.tags.map((item,index)=>{
                  return (
                    <div>
                      <i key={item+dayjs().unix()}>#{item}</i>
                    </div>
                  )
                }):''
              } */}
          </div>
          <p className='three'>
            <span><i className='iconfont icon-tingge'></i>{(playList.playCount * 0.0001).toFixed(1)}万次</span>
            <span><i className='iconfont icon-shoucang'></i>{playList.subscribedCount>10000?(playList.subscribedCount * 0.0001).toFixed(1)+'万':playList.subscribedCount}</span>
            <span><i className='iconfont icon-xiaoxi'></i>{playList.commentCount>10000?(playList.commentCount * 0.0001).toFixed(1)+'万':playList.commentCount}</span>
          </p>
          <h5 className='four'>歌单简介</h5>
          <p className='five'>{playList.description}</p>
        </div>
      </div>

      
      <div className='content-list'>
        <div className='list-hands'>
          <div className='left'>
            <span>歌曲列表</span>
            <span>{playList.tracks?playList.tracks.length:0}首歌</span>
          </div>
          <div className='right'>
            <span><i className='iconfont icon-bofang'></i>播放全部</span>
            <span><i className='iconfont icon-shoucang'></i>收藏</span>
          </div>
        </div>
        <div className='list-nav colors'>
          <div>序号</div>
          <div>歌曲</div>
          <div>歌手</div>
          <div>专辑</div>
          <div>时长</div>
        </div>
          {   
          tracks.length>0? tracks.map((item,index)=>{
            return (
              <div className={['list-nav',item.fee==1?'isVip':''].join(' ')} key={item.id} onClick={()=>goSong(item.id)}>
          <div>
            <span className='hide'>{
              playList.tracks.findIndex(a=>a.id==item.id)+1
            }</span>
            <i className='iconfont icon-bofang1'></i>
          </div>
          <div>
          <span>{item.name}</span>
          {
            item.mv!==0?<i className='iconfont icon-MV1'></i>:''
          }
          {
            item.fee==1?<i className='iconfont icon-VIP'></i>:''
          }
          </div>
          <div>
            {
              item.ar.length>1? item.ar.map(items=><span key={items.id}>{items.name} / </span>):<span>{item.ar[0].name}</span>
            }
          </div>
          <div>{item.al.name}</div>
          <div>
            <span className='hide'>{dayjs(item.dt).format('mm:ss')}</span>
            <i className='iconfont icon-category-add'></i>
            <i className='iconfont icon-shoucang'></i>
          </div>
        </div>
            )
          }):<Spin size='large' style={{margin:'200px 350px'}}/>
        }

        {/* 分页 */}
        <div className='paging'>
          <Pagination 
          defaultCurrent={1} 
          total={playList.tracks?playList.tracks.length:100} 
          size="small" 
          showSizeChanger={false} 
          pageSize="20"
          onChange={changPage}
          hideOnSinglePage={true}
          />
        </div>
      </div>
      {playList.tracks?(playList.tracks.length<=20?<div className='content-botom'>登陆后查看全部歌曲</div>:''):""}
      {/* <div className='content-botom'>登陆后查看全部歌曲</div> */}
    </div>
  )
}
