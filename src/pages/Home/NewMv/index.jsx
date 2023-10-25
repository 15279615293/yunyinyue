import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import HeadTitle from '../../../compontents/Title'
import { getNewMvList } from '../../../api'
import './index.css'

export default function Index() {
    const navigate=useNavigate()
    const [NewMv] = useState([
        { id: '001', name: '全部' },
        { id: '002', name: '内地' },
        { id: '003', name: '港台' },
        { id: '004', name: '欧美' },
        { id: '005', name: '日本' },
        { id: '006', name: '韩国' }
    ])
    const [active, setActive] = useState(0)
    const [newMv, setNewMv] = useState([])
    const [data, setData] = useState({
        limit: 10,
        area: '全部'
    })
    async function getNewMv() {
        const result = await getNewMvList(data)
        if (result.data.code == 200) {
            setNewMv(result.data.data)
        }
    }
    function navigations({index,cat}){
        setActive(index)
        setData({...data,area:cat})
      }
    useEffect(() => {
        getNewMv()
    }, [data])
    function goMv(id){
        navigate(`/mvlist/mv?id=${id}`)
      }
    return (
        <div className='newmv'>
            <HeadTitle active={active} hotNav={NewMv} titles='最新MV' navigations={navigations}/>
            <div className='newmv-list'>
                {
                    newMv.map(item => {
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
                                    <span> {(item.playCount * 0.0001).toFixed(1)}万</span>
                                </p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
