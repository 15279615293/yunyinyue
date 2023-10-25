import { useState, useEffect } from 'react'
import debounce from "lodash/debounce";
import { Outlet,useLocation } from 'react-router-dom';
import { getNewMvList } from '../../api'
import MvContent from './MvContent'
import './index.css'

export default function Index() {
  const x = useLocation()
  const [page, setPage] = useState(0)
  const [navigations, setNav] = useState([
    { id: "010", name: '排序', t: "1", specification: [{ id: "011", name: '上升最快', isActive: '1' }, { id: "012", name: '最新', isActive: '0' }] },
    {
      id: "020", name: '区域', t: "2", specification: [
        { id: "021", name: '全部', isActive: '1' }, { id: "022", name: '内地', isActive: '0' },
        { id: "023", name: '港台', isActive: '0' }, { id: "024", name: '欧美', isActive: '0' },
        { id: "025", name: '日本', isActive: '0' }, { id: "026", name: '韩国', isActive: '0' }
      ]
    },
    {
      id: "030", name: '类型', t: "3", specification: [
        { id: "031", name: '全部', isActive: '1' }, { id: "032", name: '官方版', isActive: '0' },
        { id: "033", name: '原生', isActive: '0' }, { id: "034", name: '现场版', isActive: '0' },
        { id: "035", name: '网易出品', isActive: '0' }
      ]
    }
  ])
  const [data, setData] = useState({
    limit: 36,
    offset: 0
  })
  const [mv, setMv] = useState({})
  const [spins,setSpins] = useState(false)
  const chooseType = (parent, child) => {
    const index = navigations.findIndex(item => item.id == parent.id)
    const indexs = navigations[index].specification.findIndex(item => item.id == child.id)
    const newNavs = navigations[index].specification.map(item => {
      return { ...item, isActive: 0 }
    })
    const demo = { ...navigations[index], specification: newNavs }
    setNav(navigations => {
      navigations.splice(index, 1)
      navigations.splice(index, 0, demo)
      navigations[index].specification[indexs].isActive = 1
      return navigations
    })

    setMv({})
    if (parent.t == 1) {
      setData({ ...data, order: child.name })
    } else if (parent.t == 2) {
      setData({ ...data, area: child.name })
    } else if (parent.t == 3) {
      setData({ ...data, type: child.name })
    }
  }
  async function getMvList() {
    const result = await getNewMvList(data)
    if (result.data.code == 200) {
      setMv(result.data)
    }
  }
  useEffect(() => {
    getMvList()
  }, [data])

  //触底加载下一页
  useEffect(() => {
    window.scrollTo(0,1)
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
    if (scrollTop + windowHeight >= scrollHeight - 400) {
      console.log('触底了')
      // const pages = total?(total%48==0?total/48:Math.ceil(total/48)):0
      // console.log(mv.count)
      // if(page<pages){
      setPage(page => page + 1)
      // }
    }
  }, 1500)
  useEffect(() => {
    if (page > 0) {
      getPlayLists()
    }
  }, [page])
  async function getPlayLists() {
    setSpins(true)
    const result = await getNewMvList({ ...data, offset: page * 36 })
    if (result.data.code == 200) {
      mv.data = [...mv.data, ...result.data.data]
      setMv({...mv,data:mv.data})
      setSpins(false)
    }
  }
  return (
    <div>
      {
      x.pathname=='/mvlist'?(
        <div className='mvlist'>
        <MvContent mvList={mv.data} spinning={spins}/>
        <div className="mvlist-right">
          {
            navigations.map(item => {
              return (
                <div className='mvlist-type' key={item.id}>
                  <h3>{item.name}</h3>
                  <div className='mvlist-span'>
                    {
                      item.specification.map(items => {
                        return (
                          <span key={items.id} onClick={() => chooseType(item, items)} className={items.isActive == 1 ? 'spanActive' : ''}>{items.name}</span>
                        )
                      })
                    }
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
      ):<Outlet/>
    }
    </div>
  )
}
