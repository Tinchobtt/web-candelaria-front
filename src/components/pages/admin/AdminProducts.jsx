import CategoryBar from "../../common/categoryBar/CategoryBar.jsx";
import ProductList from '../../common/productsList/ProductList.jsx';
import ModalButton from '../../common/modalButton/ModalButton.jsx';
import GenericModal from '../../common/genericModal/GenericModal.jsx';
import { useProductsCategories } from "../../../context/ProductsCategoriesContext";

const AdminProducts = () => {
  const { filteredProducts: products, isLoading } = useProductsCategories();

  return (
    <>
    <CategoryBar />
    <ProductList products={products} admin={true} isLoading={isLoading}/>
    <div className="add-btn-container">
        <ModalButton name="modalProducto">Agregar producto</ModalButton>
    </div>
    <GenericModal />
    </>
  )
}

export default AdminProducts