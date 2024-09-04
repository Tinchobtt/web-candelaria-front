import { formattedPrice } from '../../../utils/numberFormater'
import './menuCard.scss'

const MenuCard = ({content}) => {    
  return (
    <div className='menu-card'>
        <h3 className='menu-category'>{content.category}</h3>
        <div className="menu-products-container">
        {content.products.map( prod => (
            <div key={prod.id} className='menu-product'>
                <span className='menu-prod-title'>{prod.title}</span>
                <span className='menu-line-dotted'></span>
                <span className='menu-prod-price'>{formattedPrice(prod.actualPrice)}</span>
            </div>
        ))}
        </div>
    </div>
  )
}

export default MenuCard