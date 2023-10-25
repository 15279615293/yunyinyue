import { useState, useEffect } from 'react'
import { Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import debounce from "lodash/debounce";
import { getHotList } from '../../../api'
import './index.css'

export default function Index(props) {
    const navigate = useNavigate()
    const { cat, clearsNames } = props
    const [playActive, setActi] = useState(0)
    const [play] = useState([
        { id: '01', name: '热门', order: 'hot' },
        { id: '02', name: '最新', order: "new" }
    ])
    let [playList, setPlayList] = useState({})
    const [data, setData] = useState({
        limit: 48,
        order: 'hot',
        offset: 0
    })
    const [page, setPage] = useState(0)
    const [spins,setSpins] = useState(false)
    function choodeCat(index, order) {
        setActi(index)
        setData({ ...data, order })
    }
    async function getPlayList() {
        setPlayList([])
        const result = await getHotList(data)
        if (result.data.code == 200) {
            setPlayList(result.data.playlists)
        }
    }
    useEffect(() => {
        getPlayList()
    }, [data])
    useEffect(() => {
        if (cat) {
            setData({ ...data, cat })
        }
    }, [cat])
    function clearCat() {
        setData({ ...data, cat: '' })
        clearsNames("")
    }
    //触底加载下一页
    useEffect(() => {
        window.addEventListener("scroll", scrollBottom)
        return () => window.removeEventListener("scroll", scrollBottom)
    }, [])
    const scrollBottom = debounce(function () {
        let scrollTop =
            document.documentElement.scrollTop || document.body.scrollTop;
        let windowHeight =
            document.documentElement.clientHeight || document.body.clientHeight;
        let scrollHeight =
            document.documentElement.scrollHeight || document.body.scrollHeight;
        if (scrollTop + windowHeight >= scrollHeight - 300) {
            console.log('触底了')
            // const pages = total?(total%48==0?total/48:Math.ceil(total/48)):0
            // console.log(total)
            // if(page<pages){
                setPage(page => page + 1)
            // }
        }
    }, 1000)
    useEffect(() => {
        if(page>0){
            getPlayLists()
        }
    }, [page])
    async function getPlayLists() {
        setSpins(true)
        const result = await getHotList({...data,offset:page*48})
        if (result.data.code == 200) {
            playList= [...playList,...result.data.playlists]
            setPlayList(playList)
            setSpins(false)
        }
    }
    const goDetail=(id)=>{
        navigate(`/playlist/detail?id=${id}`)
    }
    return (
        <div className='playcontent'>
            <div className='playcontent-hands'>
                {
                    cat ? (<h2>
                        <i>{cat}</i>
                        <i className='iconfont icon-cuowuguanbiquxiao' onClick={clearCat}></i>
                    </h2>) : <h2><i>全部歌单</i></h2>
                }
                {
                    play.map((item, index) => {
                        return <span className={playActive == index ? 'playActive' : ''} onClick={() => choodeCat(index, item.order)} key={item.id}>{item.name}</span>
                    })
                }
            </div>
            <div className='playcontent-content'>
                <div className='contents'>
                    {
                        playList.length>0 ? playList.map((item) => {
                            return (
                                <div className='list' key={item.id} onClick={()=>goDetail(item.id)}>
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
                        }): <Spin size='large' style={{ margin: '150px auto' }} />
                    }
                    <div className='spins'><Spin size='large' spinning={spins}/></div>
                </div>
            </div>
        </div>
    )
}
