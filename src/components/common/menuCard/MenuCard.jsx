import './menuCard.scss'
const MenuCard = ({content}) => {
    
  return (
    <div>
        <h3>{content.category}</h3>
        {content.products.map( prod => (
          <p key={prod.id}></p>
        ))}
    </div>
  )
}

export default MenuCard