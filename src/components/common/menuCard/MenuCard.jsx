import './menuCard.scss'
const MenuCard = ({content}) => {
    
  return (
    <div>
        <h3>{content.category}</h3>
        {
            content.products.map( prod => (
                <>

                </>
            ))
        }
    </div>
  )
}

export default MenuCard