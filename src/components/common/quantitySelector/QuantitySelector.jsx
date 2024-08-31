import './quantitySelector.scss'
import { useCart } from "../../../context/CartContext"
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const QuantitySelector = ({ item }) => {
    const { changeQuantity, deleteFromCart } = useCart();
    
    const handleDecrement = () => {
      if (item.quantity > 1) {
        changeQuantity(item.id, false);
      }
    };
  
    const handleIncrement = () => {
      changeQuantity(item.id, true);
    };
  
    return (
      <div className='quantity-selector'>
        {item.quantity > 1 ? (
          <button onClick={handleDecrement}><FaMinus size={'22px'}/></button>
        ) : (
          <button onClick={() => deleteFromCart(item.id)}><MdDelete size={'24px'}/></button>
        )}
        <span>{item.quantity}</span>
        <button onClick={handleIncrement}><FaPlus size={'22px'} /></button>
      </div>
    );
  };

export default QuantitySelector