import { useState, useEffect, useRef } from 'react'
import { Slider, ConfigProvider } from 'antd';
import PubSub from 'pubsub-js';
import './index.css'

export default function Index() {
    var dayjs = require('dayjs')
    const myAudio = useRef()
    const [modes] = useState([
        { id: '001', name: 'iconfont icon-xunhuanbofang' },
        { id: '002', name: 'iconfont icon-danquxunhuan' },
        { id: '003', name: 'iconfont icon-24gl-shuffle' }
    ])
    const [showMode, setmodes] = useState('iconfont icon-xunhuanbofang')
    const [isShow, setShow] = useState({
        mode: false,
        playList: false,
        isPlay: false,
        noticePlay:false
    })
    const [play,setPlay] =useState({
        playProgress:0,
        songTime:0//音乐当前播放时间
    })
    const [volum, setVolum] = useState()
    const [detail, setDetail] = useState([])
    const [songUrl, setUrl] = useState([])
    function changeMode(name) {
        setmodes(name)
        setShow({ ...isShow, mode: !isShow.mode })
    }
    function show(e) {
        // e.stopPropagation()
        setShow({ ...isShow, mode: !isShow.mode })
    }
    function changeVolume(value) {
        setVolum(value)
    }
    function showPlay(e) {
        // e.stopPropagation()
        setShow({ ...isShow, playList: !isShow.playList })
    }
    useEffect(() => {
        // window.addEventListener("click", (e) => {
        //     setShow({ ...isShow, mode: false })
        //     setShow({ ...isShow, playList: false })
        // })
        PubSub.subscribe("getUrl", (_, value) => {
            setUrl(value.songUrl)
            detail.push(value.songDetail)
            setDetail([...detail])
            setShow({...isShow,noticePlay:value.noticePlay})
            console.log(value)
        })
    }, [])
    useEffect(() => {
        console.log(detail)
    }, [detail])
    function playSong(e) {
        var timer =null
        setShow({ ...isShow, isPlay: !isShow.isPlay })
        if (isShow.isPlay == false) {
            myAudio.current.play()
            timer=setInterval(()=>{
                setPlay({...play,playProgress: myAudio.current.currentTime*100/myAudio.current.duration,songTime:myAudio.current.currentTime})
            },1)
        } else {
            myAudio.current.pause()
            clearInterval(timer)
        }
    }
    function changeTime(value){
        myAudio.current.currentTime=value*myAudio.current.duration/100
        setPlay({...play,playProgress:value,songTime:myAudio.current.currentTime})
    }
    useEffect(()=>{
        if(isShow.noticePlay==true){
            playSong()
        }
    },[isShow.noticePlay])
    return (
        <div className='bar'>
            <div className='progress'>
                <ConfigProvider theme={{ token: { colorPrimary: '#ff641e', }, }}>
                    <Slider 
                    min={0} max={100} 
                    style={{ width: '100%', margin: "0px", padding: '0px' }} 
                    tooltip={{formatter: null}}
                    onChange={changeTime}
                    value={play.playProgress}
                />
                </ConfigProvider>
            </div>
            <div className='bar-datail'>
                <div className='bar-left'>
                    <img src={detail[0] ? detail[0].al.picUrl : ''} alt="" />
                    <div className='barleft-name'>
                        <div>{detail[0] ? detail[0].name : ''}</div>
                        <div>
                            {
                                detail[0] ? (detail[0].ar.length > 1 ? detail[0].ar.map(items => <span key={items.id}>{items.name} / </span>) : detail[0].ar[0].name) : ''
                            }
                        </div>
                    </div>
                    <p>
                        <span>{dayjs.unix(play.songTime).format('mm:ss')}</span>
                        <span> / {detail[0] ? dayjs(detail[0].dt).format('mm:ss') : ""}</span>
                    </p>
                </div>


                <div className='bar-center'>
                    <i className='iconfont icon-ziyuan1'></i>
                    {isShow.isPlay == false ? <i className='iconfont icon-bofang' onClick={playSong}></i> : <i onClick={playSong} className='iconfont icon-24gf-pause2'></i>}
                    <i className='iconfont icon-ziyuan'></i>
                    <audio src={songUrl[0] ? songUrl[0].url : ''} ref={myAudio}></audio>
                </div>


                <div className='bar-right'>
                    {
                        volum == 0 ? <i className='iconfont icon-shengyinjingyin'></i> : <i className='iconfont icon-shengyinkai'></i>
                    }
                    <ConfigProvider theme={{ token: { colorPrimary: '#ff641e', }, }}>
                        <Slider defaultValue={100} min={0} max={100} style={{ width: '150px', }} onChange={changeVolume} />
                    </ConfigProvider>
                    {
                        isShow.mode == true ? (
                            <div className='playmode'>
                                {
                                    modes.map(item => {
                                        return <i key={item.id} className={item.name} onClick={() => changeMode(item.name)}></i>
                                    })
                                }
                            </div>
                        ) : ''
                    }
                    <i className={showMode} onClick={show}></i>
                    <i className='iconfont icon-bofangliebiao' onClick={showPlay}></i>

                    {/* 播放列表 */}
                    {
                        isShow.playList == true ?
                            <div className='bar-playlist'>
                                <div className='playlist-hands'>
                                    <div>
                                        <span>播放列表</span>
                                        <span>（共0首）</span>
                                    </div>
                                    <div>
                                        <i className='iconfont icon-icon'></i>
                                        <span>清空列表</span>
                                    </div>
                                </div>
                                <div className='playlist-list'>
                                    <div className='play-nav'>
                                        <div>序号</div>
                                        <div>歌曲</div>
                                        <div>歌手</div>
                                        <div>时长</div>
                                    </div>
                                    {
                                        detail.map((item,index) => {
                                            return (
                                                <div className='play-nav' key={item.id}>
                                                    <div>{index+1}</div>
                                                    <div>{item.name}</div>
                                                    <div>
                                                        {item.ar.length > 1 ? item.ar.map(items => <span key={items.id}>{items.name} / </span>) : item.ar[0].name}
                                                    </div>
                                                    <div>{dayjs(item.dt).format('mm:ss')}</div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div> : ''
                    }
                </div>
            </div>
        </div>
    )
}
