import './index.css'

export default function Index(props) {
  
   const {hotNav,active,navigations,demo,titles} = props
    function getNavigations({ type,index, cat,area }){
        navigations({ type,index, cat,area })
    }
  return (
    <div className='h-heads'>
        <p>{titles}</p>
        {
          demo==false?<span className={active == -1 ? 'spanactive' : ''} onClick={() => getNavigations({type:'one'})}>为您推荐</span>:""
        }
        {
          hotNav.map((item, index) => {
            return <span className={active == index ? 'spanactive' : ''} key={item.id} onClick={() => getNavigations( { type:'two',index, cat: item.name,area:item.area })}>{item.name}</span>
          })
        }
      </div>
  )
}
