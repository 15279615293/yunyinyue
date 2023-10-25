import {useState,useEffect} from 'react'
import { useSearchParams,useNavigate} from 'react-router-dom'
import { Spin } from 'antd';
import PubSub, { publish } from 'pubsub-js';
import { getSimiSong,getSimiPlay,getSongDetail,getLyric,getSongUrl } from '../../api'
import './index.css'

export default function Index() {
    var dayjs = require('dayjs')
    const navigate=useNavigate()
    const [search,setsearch]=useSearchParams()
    const id=search.get('id')
    const [play,setPlay] = useState(false)
    const [simiSong,setSimiSong] = useState([])
    const [simiPlay,setSimiPlay] = useState([])
    const [songDetail,setSong] = useState({})
    const [songUrl,setSongUrl] = useState([])
    const [lyrics,setLyric] = useState('')
    function plays(){
        setPlay(!play)
    }
    function goSong(id){
        setLyric('')
        setsearch(`id=${id}`)
    }
    function getDetail(id){
        navigate(`/playlist/detail?id=${id}`)
    }
    async function getsimi(){
        const result = await getSimiSong(id)
        if(result.data.code==200){
            setSimiSong(result.data.songs)
        }
        const result2 = await getSimiPlay(id)
        if(result2.data.code==200){
            setSimiPlay(result2.data.playlists)
        }
        const result3 = await getSongDetail(id)
        if(result3.data.code==200){
            setSong(result3.data.songs[0])
        }
        const result4 = await getLyric(id)
        if(result4.data.code==200){
            const newRes=result4.data.lrc.lyric.replace(/(\n)/g,'<br/>').replace(/\[.*?\]/g,'')
            setLyric(newRes)
        }
        const result5 = await getSongUrl(id)
        if(result5.data.code==200){
            setSongUrl(result5.data.data)
        }
    }
    useEffect(()=>{
        getsimi()
    },[id])
    function playSong(){
        PubSub.publish('getUrl',{songUrl,songDetail,noticePlay:true})
    }
  return (
    <div className='song'>
        <div className='song-detail'>
            <div className='songdetail'>
                <h3 className='songname'>{songDetail?songDetail.name:''}</h3>
                <p className='songatr'>
                    {
                        songDetail.ar?(songDetail.ar.length>1? songDetail.ar.map(items=><span key={items.id}>{items.name} / </span>):songDetail.ar[0].name):''
                    }
                </p>
                <div className='songdata'>
                    <span>专辑: </span>
                    <span>{songDetail.al?songDetail.al.name:''}</span>
                    <span>发行时间：</span>
                    <span>{dayjs(songDetail.publishTime).format('MM月DD日 HH:mm')}</span>
                </div>
                <div className='songdetail-bottom'>
                    <div>
                        <i className='iconfont icon-bofang'></i>
                        <span onClick={playSong}>立即播放</span>
                    </div>
                    <div>
                        <i className='iconfont icon-shoucang'></i>
                        <span>收藏</span>
                    </div>
                    <div>
                        <i className='iconfont icon-xiaoxi'></i>
                        <span>评论</span>
                    </div>
                </div>
            </div>
            <div className='songdetail'>
                <h3 className='songdetail-title'>相似歌曲</h3>
                {
                    simiSong.map(item=>{
                        return (
                    <div className='similarsong' key={item.id} onClick={()=>goSong(item.id)}>
                    <div className='similarsong-left'>
                        <p>{item.name}</p>
                        <p>
                            {
                                item.artists.length>1? item.artists.map(items=><span key={items.id}>{items.name} / </span>):item.artists[0].name
                            }
                        </p>
                    </div>
                    <div className='similarsong-right'>
                        <i className='iconfont icon-bofang'></i>
                        <i className='iconfont icon-category-add'></i>
                    </div>
                </div>
                        )
                    })
                }
            </div>
        </div>



        <div className='song-lyrics'>
            <h5 className='lyrics-title'>歌词</h5>
            {
                lyrics?<div className='lyrics-box' dangerouslySetInnerHTML={{__html:lyrics}}></div>: 
                <Spin size='large' style={{ margin: '300px auto' }} />
            }
        </div>


        <div className='song-relate'>
            <div className='songrelate imgList'>
                <img className={['one',play==true?'playsongs':''].join(' ')} src="data:image/png;base64,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" alt="" />
                <img className={['two',play==true?'playsong':''].join(' ')} onClick={plays} src="https://m2.trtst.com/assets/disc.986e5ec6.png" alt="" />
                <img className={['three',play==true?'playsong':''].join(' ')} src={songDetail.al?songDetail.al.picUrl:''} onClick={plays} alt="" />
            </div>
            <div className='songrelate'>
            <h3 className='songrelate-title'>包含这首歌的歌单</h3>
            {
                simiPlay.map(item=>{
                    return (
                    <div className='detailrec-list' key={item.id} onClick={()=>getDetail(item.id)}>
                    <img src={item.coverImgUrl} alt="" />
                    <div>
                        <p>{item.name}</p>
                        <p>By.{item.creator.nickname}</p>
                    </div>
                </div>
                    )
                })
            }
            </div>
        </div>
    </div>
  )
}
