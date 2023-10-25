import { useState, useEffect } from 'react'
import { Carousel } from 'antd';
import { getStationList,getArtistList } from '../../../api'
import './index.css'

export default function Index() {
  const [station, setStation] = useState([])
  const [artist,setArtist] = useState([])
  useEffect(() => {
    getStation()
    getArtist()
  }, [])
  async function getStation() {
    const result = await getStationList(6)
    if (result.data.code == 200) {
      setStation(result.data.djRadios)
    }
  }
  async function getArtist(){
    const result = await getArtistList(36)
    if(result.data.code==200){
      setArtist(result.data.artists)
    }
  }
  return (
    <div className='station-out'>
      <div className='station'>
        <h3 className='titles'>热门电台</h3>
        <div className='station-list'>
          {
            station.map(item => {
              return (
                <div className='station-nav' key={item.id}>
                  <img src={item.picUrl} alt="" />
                  <div className='texts'>
                    <p>
                      <i className='iconfont icon-luyinjishouyinjidiantai'></i>
                      <span className='tls'>{item.name}</span>
                    </p>
                    <p>{item.rcmdtext}</p>
                    <p>
                      <span>共{item.programCount}期</span>
                      <span>订阅{(item.subCount * 0.0001).toFixed(1)}万次</span>
                    </p>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
      <div className='arts'>
        <h3 className='titles'>热门歌手</h3>
        <div className='station-list'>
          <Carousel className='carousel' rows={3} slide='img' slidesPerRow={4} autoplay autoplaySpeed={5000}>
            {
              artist.map(item=>{
                return(
                  <img key={item.id} src={item.picUrl} alt="" />
                )
              })
            }
          </Carousel>
        </div>
      </div>
    </div>
  )
}
