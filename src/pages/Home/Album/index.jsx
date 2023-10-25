import {useState,useEffect} from 'react'
import HeadTitle from '../../../compontents/Title'
import {getAlbumList} from '../../../api'
import './index.css'

export default function Index() {
  const [albumNav] = useState([
    {id:'01',name:'全部',area:'all'},
    {id:'02',name:'华语',area:'ZH'},
    {id:'03',name:'欧美',area:'EA'},
    {id:'04',name:'韩国',area:'KR'},
    {id:'05',name:'日本',area:'JP'}
  ])
  const [active, setActive] = useState(0)
  const [albumList,setAlbum] = useState([])
  const [data,setData] = useState({
    limit:12,
    area:'all'
  })
  async function getPlayList(){
    const result = await getAlbumList(data)
    if(result.data.code==200){
      setAlbum(result.data.albums)
    }   
  }
  function navigations({index,area}){
    setActive(index)
    setData({...data,area})
  }
  useEffect(()=>{
    getPlayList()
  },[data])
  return (
    <div className='album'>
      <HeadTitle hotNav={albumNav} active={active} navigations={navigations} titles='新碟上架'/>
      <div className='contents'>
        {
          albumList.map(item=>{
            return(
              <div className='nav' key={item.id}>
              <img src={item.picUrl} alt=""  className='img1'/>
               <img src="https://m2.trtst.com/assets/disc.986e5ec6.png" alt="" className='img2'/>
              <div className='texts'>
                <p>{item.name}</p>
                <p >{item.artist.name}</p>
              </div>
              <div className='labels'>{item.type}</div>
            </div>
            )
          })
        }
      </div>
    </div>
  )
}
