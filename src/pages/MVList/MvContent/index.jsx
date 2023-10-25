import { useNavigate } from 'react-router-dom';
import { Spin } from 'antd';
import './index.css'

export default function Index(props) {
    const {mvList,spinning} = props
    const navigate = useNavigate()
    function goMv(id){
        navigate(`/mvlist/mv?id=${id}`)
    }
    return (
        <div className='mvcontent'>
            {
                 mvList?mvList.map(item => { 
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
                 }):<Spin size='large' style={{ margin: '150px auto' }} />
             }
             <div className='spins'><Spin size='large' spinning={spinning}/></div>
        </div>
    )
}
