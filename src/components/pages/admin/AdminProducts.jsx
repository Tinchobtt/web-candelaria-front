import CategoryBar from "../../common/categoryBar/CategoryBar.jsx";
import ProductList from '../../common/productsList/ProductList.jsx';
import ModalButton from '../../common/modalButton/ModalButton.jsx';
import GenericModal from '../../common/genericModal/GenericModal.jsx';
import { useProductsCategories } from "../../../context/ProductsCategoriesContext";

const AdminProducts = () => {
  const { filteredProducts: products, categories, filterProductsByCategory, actualCategory } = useProductsCategories();
  
  return (
    <>
    <CategoryBar categories={categories} filterProductsByCategory={filterProductsByCategory} actualCategory={actualCategory}/>
    <ProductList products={products} admin={true} />
    <div className="add-btn-container">
        <ModalButton name="modalProducto">Agregar producto</ModalButton>
    </div>
    <GenericModal />
    </>
  )
}

export default AdminProducts