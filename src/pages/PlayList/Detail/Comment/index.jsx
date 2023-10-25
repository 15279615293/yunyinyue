import {useState,useEffect} from 'react'
import { useSearchParams,useNavigate } from 'react-router-dom'
import { getRelatedList } from '../../../../api'
import './index.css'

export default function Index() {
    const navigate=useNavigate()
    const [related,setRelated] = useState([])
    const [search] = useSearchParams()
    const getRelated=async ()=>{
        const result = await getRelatedList(search.get('id'))
        if(result.data.code==200){
            setRelated(result.data.playlists)
        }
    }
    useEffect(()=>{
        getRelated()
    },[search.get('id')])
    const getDetail=(id)=>{
        navigate(`/playlist/detail?id=${id}`)
    }
  return (
    <div>
        <div className='detail-recommend'>
        <h3 className='detailrec-title'>相关歌单推荐</h3>
        {
            related.map(item=>{
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
  )
}
