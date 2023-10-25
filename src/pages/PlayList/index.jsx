import { useState, useEffect } from 'react'
import { Outlet ,useLocation} from 'react-router-dom'
import { getCatList } from '../../api'
import PlayContent from './PlayContent'
import './index.css'

export default function Index() {
  const x = useLocation()
  const [catList, setCat] = useState({})
  const [isShow, setShow] = useState(-1)
  const [catActive, setCatActive] = useState('')
  const [activess, setActivess] = useState('')
  const [a, setA] = useState(-1)
  async function getCat() {
    const result = await getCatList()
    if (result.data.code == 200) {
      setCat(result.data)
    }
  }
  useEffect(() => {
    getCat()
  }, [])
  function show(index) {
    if (index == isShow) {
      setShow(-1)
    } else {
      setShow(index)
    }
  }
  function changeActive(name) {
    setCatActive(name)
    setActivess('')
  }
  function actives(name, num) {
    setCatActive(name)
    setActivess(name)
    setShow(-1)
    setA(num)
  }
  function clearsNames(cat) {
    setCatActive(cat)
    setActivess(cat)
  }
  return (
    <div>
    {
      x.pathname=='/playlist'?
      <div className='playlist'>
      <div className='classification'>

        <div className='classification-list'>
          <div className='list-title'>{catList.categories ? catList.categories[0] : ""}</div>
          <div className='classificationnav'>
            {
              catList.sub ? catList.sub.filter(item => item.category == 0).map(item => {
                return <div className='classification-nav' key={item.name} onClick={() => { changeActive(item.name) }}><span className={item.name == catActive ? 'catActive' : ''}>{item.name}</span></div>
              }) : []
            }
          </div>
        </div>


        <div className='classification-list'>
          <div className='list-title'>{catList.categories ? catList.categories[1] : ""}</div>
          <div className='classificationnav'>
            {
              catList.sub ? catList.sub.filter(item => item.category == 1).filter((_, index) => index < 8).map(item => {
                return <div className='classification-nav' key={item.name} onClick={() => { changeActive(item.name) }}><span className={item.name == catActive ? 'catActive' : ''}>{item.name}</span></div>
              }) : []
            }
            {
              activess ? (a == 0 ? <div className='classification-nav' onClick={() => { show('0') }}><span className={activess == catActive ? 'catActive' : ''}>{activess}</span></div> : <div className='classification-nav' onClick={() => { show('0') }}>更多<i className='iconfont icon-icchevronmore'></i></div>) :
                <div className='classification-nav' onClick={() => { show('0') }}>更多<i className='iconfont icon-icchevronmore'></i></div>
            }
          </div>
          <div className={['classification-show', isShow == 0 ? 'isShow' : ''].join(' ')}>
            {
              catList.sub ? catList.sub.filter(item => item.category == 1).filter((_, index) => index >= 8).map(item => {
                return <span key={item.name} onClick={() => { actives(item.name, '0') }} className={item.name == catActive ? 'catActive' : ''}>{item.name}</span>
              }) : []
            }
          </div>
        </div>


        <div className='classification-list'>
          <div className='list-title'>{catList.categories ? catList.categories[2] : ""}</div>
          <div className='classificationnav'>
            {
              catList.sub ? catList.sub.filter(item => item.category == 2).filter((_, index) => index < 8).map(item => {
                return <div className='classification-nav' key={item.name} onClick={() => { changeActive(item.name) }}><span className={item.name == catActive ? 'catActive' : ''}>{item.name}</span></div>
              }) : []
            }
            {
              activess ? (a == 1 ? <div className='classification-nav' onClick={() => { show('1') }}><span className={activess == catActive ? 'catActive' : ''}>{activess}</span></div> : <div className='classification-nav' onClick={() => { show('1') }}>更多<i className='iconfont icon-icchevronmore'></i></div>) :
                <div className='classification-nav' onClick={() => { show('1') }}>更多<i className='iconfont icon-icchevronmore'></i></div>
            }
          </div>
          <div className={['classification-show', isShow == 1 ? 'isShow' : ''].join(' ')}>
            {
              catList.sub ? catList.sub.filter(item => item.category == 2).filter((_, index) => index >= 8).map(item => {
                return <span key={item.name} onClick={() => { actives(item.name, '1') }} className={item.name == catActive ? 'catActive' : ''}>{item.name}</span>
              }) : []
            }
          </div>
        </div>


        <div className='classification-list'>
          <div className='list-title'>{catList.categories ? catList.categories[3] : ""}</div>
          <div className='classificationnav'>
            {
              catList.sub ? catList.sub.filter(item => item.category == 3).filter((_, index) => index < 8).map(item => {
                return <div className='classification-nav' key={item.name} onClick={() => { changeActive(item.name) }}><span className={item.name == catActive ? 'catActive' : ''}>{item.name}</span></div>
              }) : []
            }
            {
              activess ? (a == 2 ? <div className='classification-nav' onClick={() => { show('2') }}><span className={activess == catActive ? 'catActive' : ''}>{activess}</span></div> : <div className='classification-nav' onClick={() => { show('2') }}>更多<i className='iconfont icon-icchevronmore'></i></div>) :
                <div className='classification-nav' onClick={() => { show('2') }}>更多<i className='iconfont icon-icchevronmore'></i></div>
            }
          </div>
          <div className={['classification-show', isShow == 2 ? 'isShow' : ''].join(' ')}>
            {
              catList.sub ? catList.sub.filter(item => item.category == 3).filter((_, index) => index >= 8).map(item => {
                return <span key={item.name} onClick={() => { actives(item.name, '2') }} className={item.name == catActive ? 'catActive' : ''}>{item.name}</span>
              }) : []
            }
          </div>
        </div>


        <div className='classification-list'>
          <div className='list-title'>{catList.categories ? catList.categories[5] : ""}</div>
          <div className='classificationnav'>
            {
              catList.sub ? catList.sub.filter(item => item.category == 4).filter((_, index) => index < 8).map(item => {
                return <div className='classification-nav' key={item.name} onClick={() => { changeActive(item.name) }}><span className={item.name == catActive ? 'catActive' : ''}>{item.name}</span></div>
              }) : []
            }
            {
              activess ? (a == 3 ? <div className='classification-nav' onClick={() => { show('3') }}><span className={activess == catActive ? 'catActive' : ''}>{activess}</span></div> : <div className='classification-nav' onClick={() => { show('3') }}>更多<i className='iconfont icon-icchevronmore'></i></div>) :
                <div className='classification-nav' onClick={() => { show('3') }}>更多<i className='iconfont icon-icchevronmore'></i></div>
            }
          </div>
          <div className={['classification-show', isShow == 3 ? 'isShow' : ''].join(' ')}>
            {
              catList.sub ? catList.sub.filter(item => item.category == 4).filter((_, index) => index >= 8).map(item => {
                return <span key={item.name} onClick={() => { actives(item.name, '3') }} className={item.name == catActive ? 'catActive' : ''}>{item.name}</span>
              }) : []
            }
          </div>
        </div>
      </div>

      <PlayContent cat={catActive || activess} clearsNames={clearsNames} />
    </div>:<Outlet/>
    }
    </div>
    
    
  )
}
