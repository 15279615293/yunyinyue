import {useState,useEffect} from 'react'
import PubSub from 'pubsub-js'
import { getTopList } from '../../../api'
import './index.css'

export default function Index() {
  const [hands] = useState([
    {id:"001",name:"Top榜",type:'1'},
    {id:"002",name:"特色榜",type:'2'},
    {id:"003",name:"场景榜",type:'3'},
  ])
  const [handsActive,setHacti] = useState(0)
  const [topList,setTopList] = useState([])
  const [topLists,setTopLists] =useState([])
  const [contentAct,setContent] = useState(0)
  async function getTopLists(){
    const result = await getTopList()
    if(result.data.code==200){
      setTopList(result.data.list)
      const res = result.data.list.filter((item,index)=>{
        return index<=3
      })
      setTopLists(res)
      PubSub.publish('getId',result.data.list[0].id)
    }
  }
  function chooseNav(index,type){
    let result=[]
    setHacti(index)
    setContent(0)
    if(type==1){
      result=topList.filter((item,index)=>{
        return index<=3
      })
    }else if(type==2){
      result=topList.filter((item)=>{
        return item.name.includes('云音乐')
      })
    }else if(type==3){
      result=topList.filter((item,index)=>{
        return item.name.includes('云音乐')==false && index>3
      })
    }
    PubSub.publish('getId',result[0].id)
    setTopLists(result)
  }
  useEffect(()=>{
    getTopLists()
  },[])
  function changeContent(index,id){
    setContent(index)
    PubSub.publish("getId",id)
  }
  return (
    <div className='rank-navtion'>
      <div className='navtion-hands'>
        {
          hands.map((item,index)=>{
            return (
              <div 
              className={['hands-list',handsActive==index?'hadsActive':''].join(' ')} 
              key={item.id}
              onClick={()=>chooseNav(index,item.type)}
              >{item.name}</div>
            )
          })
        }
      </div>
      <div className='navtion-content'>
        {
          topLists.map((item,index)=>{
            return (
              <div 
              className={['navtion-nav',contentAct==index?'contentAct':''].join(' ')} 
              key={item.id} 
              onClick={()=>changeContent(index,item.id)}
              >
              <div className='nav-left'>
                <p>{item.name}</p>
                <p>{item.updateFrequency}</p>
              </div>
              <img src={item.coverImgUrl} alt="" />
            </div>
            )
          })
        }
      </div>
    </div>
  )
}
