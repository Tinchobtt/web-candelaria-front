import './modalProducto.scss';
import Swal from 'sweetalert2'
import Button from "@mui/material/Button";
import { useEffect, useRef } from "react";
import { TextField } from "@mui/material";
import * as Yup from 'yup';
import { useFormik } from "formik";
import defaultProdImg from '../../../assets/imgs/defaultProdImg.png';
import { FaEdit } from "react-icons/fa";
import StateCircle from '../stateCircle/StateCircle';
import { useProductsCategories } from '../../../context/ProductsCategoriesContext';
import { useModal } from '../../../context/ModalContext';
import { createProduct, deleteProduct, updateProduct } from '../../../services/productService';

const ModalProduct = ({ data }) => {
    const { closeModal } = useModal()
    const formRef = useRef(null);
    const { categories, products, setProducts } = useProductsCategories(); 

    const { handleSubmit, handleChange, handleBlur, touched, values, errors, setFieldValue } = useFormik({
        initialValues: {
            title: '',
            category: 'Entradas',
            description: '',
            price: '',
            discountPercentage: '',
            active: true,
            image: null
        },
        onSubmit: async (values, action) => {
            const formData = new FormData();
            let image;
            
            if (!values.image) {
                const response = await fetch(defaultProdImg);
                const blob = await response.blob();
                image = new File([blob], 'default.png', { type: blob.type });
            }else{
                image = values.image
            }
            
            formData.append('image', image);
            formData.append('title', values.title);
            formData.append('category', values.category);
            formData.append('description', values.description);
            formData.append('price', values.price);
            formData.append('discountPercentage', values.discountPercentage);
            formData.append('active', values.active);

            if (data) {                
                const product = await updateProduct(data.id, formData);
                const updatedProducts = products.map(prod => prod.id === data.id ? product.data : prod)
                setProducts(updatedProducts)
            } else {
                const product = await createProduct(formData);
                setProducts([...products, product.data])
            }

            action.resetForm();
            closeModal();
        },
        validationSchema: Yup.object().shape({
            title: Yup.string()
                .required('Campo obligatorio')
                .max(30, 'El nombre no puede tener más de 30 caracteres'),
            category: Yup.string(),
            description: Yup.string()
                .required('Campo obligatorio')
                .max(100, 'La descripcion no puede tener mas de 100 caracteres'),
            price: Yup.number()
                .typeError('El precio debe ser un número')
                .positive('El precio debe ser un valor positivo')
                .required('Campo obligatorio'),
            discountPercentage: Yup.number()
                .typeError('El descuento debe ser un número')
                .min(0, 'El descuento no puede ser menor que 0')
                .max(100, 'El descuento no puede ser mayor que 100'),
            active: Yup.boolean()
        }),
    });

    const handleIconClick = () => {
        document.getElementById('file-input').click();
    };

    const handleFileChange = (event) => {
        setFieldValue('image', event.currentTarget.files[0]);
    };

    const changeCheckbox = (value) => {
        setFieldValue('active', value);
    };

    const deleteProd = (id) => {
        closeModal()
        Swal.fire({
            title: "Deseas eliminar el producto?",
            confirmButtonColor: '#D32F2F',
            showCancelButton: true,
            confirmButtonText: "Eliminar",
            reverseButtons: true,
        }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                position: "center-center",
                icon: "success",
                title: "El producto se eliminó correctamente",
                showConfirmButton: false,
                timer: 1000
            });
            deleteProduct(id)
            const updatedProducts = products.filter(product => product.id !== id)
            setProducts(updatedProducts)

        } else if (result.isDismissed) {
            Swal.fire({
                position: "center-center",
                icon: "warning",
                title: "Operación cancelada",
                showConfirmButton: false,
                timer: 1000
            });
        }
        });
    }

    useEffect(() => {
        if (data) {
            setFieldValue('title', data.title || '');
            setFieldValue('category', data.category || '');
            setFieldValue('description', data.description || '');
            setFieldValue('price', data.price || '');
            setFieldValue('discountPercentage', data.actualPrice !== data.price ? data.actualPrice : 0 );
            setFieldValue('active', data.active !== undefined ? data.active : true);
            setFieldValue('image', data.image || null);

            fetch(data.image)
            .then(response => response.blob())
            .then(blob => {
                let image = new File([blob], `${data.title}`, { type: blob.type });
                setFieldValue('image', image);
            })
            .catch(error => {
                setFieldValue('image', null);
            });
        }
    }, [data]);

    const imageSrc = values.image 
    ? (typeof values.image === 'object' ? URL.createObjectURL(values.image) : values.image) 
    : defaultProdImg;

    return (
        <div className='modal-content-producto'>
            <h2 className="modal-title">{data? 'Editar producto' : 'Nuevo producto'}</h2>
            <form ref={formRef} onSubmit={handleSubmit} className="modal-form">
                <div className="image-upload">
                <img src={imageSrc} alt="Imagen Producto" />
                    <input
                        id='file-input'
                        type="file"
                        name="image"
                        onChange={handleFileChange}
                        accept="image/*"
                    />
                    <div className="editImg" onClick={handleIconClick}>
                        <FaEdit className='editIcon' />
                    </div>
                </div>
                <TextField
                    id='input-name'
                    type="text"
                    name="title"
                    label="Nombre"
                    variant="filled"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.title}
                    error={!!errors.title && touched.title}
                    helperText={errors.title && touched.title && errors.title}
                />
                <select
                    name="category"
                    className='input-select'
                    value={values.category}
                    onChange={(e) => setFieldValue('category', e.target.value)}
                >
                    {categories.map(category => (
                        <option value={category.name} key={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
                <TextField
                    className='input-description'
                    type="text"
                    name="description"
                    label="Descripcion"
                    variant="filled"
                    multiline
                    maxRows={3}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                    error={!!errors.description && touched.description}
                    helperText={errors.description && touched.description && errors.description}
                />
                <div className="double-input-container">
                    <TextField
                        type="number"
                        name="price"
                        label="Precio"
                        variant="filled"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.price}
                        error={!!errors.price && touched.price}
                        helperText={errors.price && touched.price && errors.price}
                    />
                    <TextField
                        type="number"
                        name="discountPercentage"
                        label="Descuento %"
                        variant="filled"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.discountPercentage}
                        error={!!errors.discountPercentage && touched.discountPercentage}
                        helperText={errors.discountPercentage && touched.discountPercentage && errors.discountPercentage}
                    />
                </div>
                <div className="prodcut-actions">
                    <label type='button' className="product-action-btn activo-btn" htmlFor="active-checkbox">
                            <input
                                id="active-checkbox"
                                type="checkbox"
                                checked={values.active}
                                onChange={(e) => changeCheckbox(!values.active)}
                                name="active"
                            />
                            Activo
                        <StateCircle state={values.active} />
                    </label>
                    {
                        data && <button type="button" className='product-action-btn delete-prod-btn' onClick={() => deleteProd(data.id)}>Eliminar producto</button>
                    }
                </div>
                <div className="modal-action-btns">
                    <Button className="modal-btn-send" color='error' size={"large"} variant='contained' onClick={closeModal}>Cancelar</Button>
                    <Button type={'submit'} className="modal-btn-send" size={"large"} variant='contained'>{data ? 'Editar' : 'Agregar'}</Button>
                </div>
            </form>
        </div>
    );
};

export default ModalProduct;
