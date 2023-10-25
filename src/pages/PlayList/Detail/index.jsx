import {useEffect} from 'react'
import { useSearchParams } from 'react-router-dom'
import PubSub from 'pubsub-js';
import DetailContent from '../../../compontents/DetailContent'
import DetailComment from './Comment'
import './index.css'

export default function Index() {
  const [search,setSearch] = useSearchParams()
  const id=search.get('id')
  useEffect(()=>{
    PubSub.publish('getId',id)
  },[id])
  return (
    <div className='playdetail'>
      <DetailContent/>
      <DetailComment/>
    </div>
  )
}
