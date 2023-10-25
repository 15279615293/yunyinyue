import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useNavigate } from 'react-router-dom';
import { Navigation, Pagination, EffectCreative, Autoplay } from 'swiper';
import { getBanner } from '../../../api';
import './index.css'


import 'swiper/css';
import 'swiper/css/navigation'
import 'swiper/css/pagination';
import 'swiper/css/effect-creative'
import 'swiper/css/autoplay'

export default () => {
  const navigate=useNavigate()
  const [shows, setShows] = useState(false)
  const [banner, setBanner] = useState([])
  function demo(swiper) {
    return (swiper.el.addEventListener('mouseover', function () {
      setShows(true)
    }),
      swiper.el.addEventListener('mouseout', function () {
        setShows(false)
      }))
  }
  useEffect(() => {
    getBannerList()
  }, [])
  async function getBannerList() {
    const result = await getBanner()
    if (result.data.code == 200) {
      setBanner(result.data.banners)
    }
  }
  function jump(id,type){
    if(type==1){
      navigate(`/song?id=${id}`)
    }else if(type==1000){
      navigate(`/playlist/detail?id=${id}`)
    }
  }
  return (
    <Swiper
      className='carousels'
      modules={[Navigation, Pagination, EffectCreative, Autoplay]}
      navigation={{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }}
      pagination={{
        // clickable: true
      }}
      speed={1000}//切换速度
      autoplay={{//自动切换
        delay: 2500,
        stopOnLastSlide: false,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      }}
      spaceBetween={50}
      slidesPerView={2}
      grabCursor={true}
      loop={true}
      centeredSlides={true}//为true时，当前的active slide 会居中，而不是默认状态下的居左
      effect={'creative'}
      creativeEffect={{
        prev: {
          //这里是设置当前item的前一项的具体属性
          translate: [-280, 0, 0],//偏移量
          scale: 0.8,//缩放量
          // opacity: 0.8,//透明度
          //shadow:true,//是否加阴影
        },
        next: {
          //这里是设置当前item的后一项的具体属性，同上面
          translate: [280, 0, 0],
          scale: 0.8,
          // opacity: 0.8,
          //shadow:true,
        },
        limitProgress: 1,//显示五个堆叠的最重要的这个属性，后面依次以前面属性等比配置
        shadowPerProgress: true,//是否等比配置透明度
      }}
      // onSlideChange={() => console.log('slide change')}
      onSwiper={demo}
    >
      {
        banner.map((item) => {
          return (
            <SwiperSlide key={item.imageUrl} onClick={()=>jump(item.targetId,item.targetType)}>
              <img src={item.imageUrl} alt="" />
            </SwiperSlide>
          )
        })
      }
      <div className={['swiper-button-prev', shows == false ? 'showbutton' : ''].join(' ')}></div>
      <div className={['swiper-button-next', shows == false ? 'showbutton' : ''].join(' ')}></div>
    </Swiper>
  );
};