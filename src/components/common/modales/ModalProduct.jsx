import './modalProducto.scss'
import Swal from 'sweetalert2'
import Button from "@mui/material/Button"
import { useEffect, useRef } from "react"
import { TextField } from "@mui/material"
import * as Yup from 'yup'
import { useFormik } from "formik"
import defaultProdImg from '/imagenes/defaultProdImg.png'
import { FaEdit } from "react-icons/fa"
import StateCircle from '../stateCircle/StateCircle'
import { useProductsCategories } from '../../../context/ProductsCategoriesContext'
import { useModal } from '../../../context/ModalContext'
import { createProduct, deleteProduct, updateProduct } from '../../../services/productService'
import { scrollToTop } from '../../../utils/scrollToTop'

const ModalProduct = ({ data }) => {
    const { closeModal } = useModal()
    const formRef = useRef(null)
    const { categories, products, setProducts, filterProductsByCategory } = useProductsCategories()
    
    const { handleSubmit, handleChange, handleBlur, touched, values, errors, setFieldValue,setTouched  } = useFormik({
        initialValues: {
            title: '',
            category: '',
            description: '',
            price: '',
            discountPercentage: 0,
            active: true,
            menu: true,
            takeAway: true,
            image: null
        },
        validationSchema: Yup.object().shape({
            title: Yup.string()
                .required('Campo obligatorio')
                .max(30, 'El nombre no puede tener más de 30 caracteres'),
            category: Yup.string()
                .required('Campo obligatorio'),
            description: Yup.string()
                .max(100, 'La descripcion no puede tener mas de 100 caracteres'),
            price: Yup.number()
                .typeError('El precio debe ser un número')
                .positive('El precio debe ser un valor positivo')
                .required('Campo obligatorio'),
            discountPercentage: Yup.number()
                .required('Campo obligatorio')
                .typeError('El descuento debe ser un número')
                .min(0, 'El descuento no puede ser menor que 0')
                .max(100, 'El descuento no puede ser mayor que 100'),
            active: Yup.boolean()
        }),
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
            
            formData.append('image', image)
            formData.append('title', values.title)
            formData.append('category', values.category)
            formData.append('description', values.description)
            formData.append('price', values.price)
            formData.append('discountPercentage', values.discountPercentage)
            formData.append('active', values.active)
            formData.append('menu', values.menu)
            formData.append('takeAway', values.takeAway)

            if (data) { 
                try{
                    const response = await updateProduct(data.id, formData);
                    if(response.status === 200){
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Producto actualizado",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        const updatedProducts = products.map(prod => prod.id === data.id ? response.data : prod)
                        setProducts(updatedProducts)
                    }else{
                        Swal.fire({
                            position: "center",
                            icon: "error",
                            title: response.data.message,
                            confirmButtonText: 'Cerrar',
                            confirmButtonColor: '#1975d1'
                        });
                    }
                }catch(error){
                    if (error.response.status === 413) {
                        Swal.fire({
                            position: "center",
                            icon: "error",
                            title: "El archivo es demasiado grande",
                            confirmButtonText: 'Cerrar',
                            confirmButtonColor: '#1975d1'
                        });
                    } else {
                        Swal.fire({
                            position: "center",
                            icon: "error",
                            title: error.response.data.message,
                            confirmButtonText: 'Cerrar',
                            confirmButtonColor: '#1975d1'
                        });
                    }
                }
            }else {
                try{
                    const response = await createProduct(formData);
                    if(response.status === 200){
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Producto creado",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        setProducts([...products, response.data])
                    }else{
                        Swal.fire({
                            position: "center",
                            icon: "error",
                            title: response.data.message,
                            confirmButtonText: 'Cerrar',
                            confirmButtonColor: '#1975d1'
                        });
                    }
                }catch(error){
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: error.response.data.message,
                        confirmButtonText: 'Cerrar',
                        confirmButtonColor: '#1975d1'
                    });
                }
            }
            filterProductsByCategory('todos')
            scrollToTop()
            action.resetForm();
            closeModal();
        },
    })

    const handleIconClick = () => {
        document.getElementById('file-input').click();
    }

    const handleFileChange = (event) => {
        const file = event.currentTarget.files[0];
        
        const maxSize = 7 * 1024 * 1024; // 7MB
    
        if (file && file.size > maxSize) {
            closeModal()
            Swal.fire({
                position: "center",
                icon: "error",
                title: "El tamaño de la imagen no puede exceder los 7MB",
                confirmButtonText: 'Cerrar',
                confirmButtonColor: '#1975d1'
            })
            return;
        }
    
        setFieldValue('image', file);
    }

    const changeCheckbox = (checkbox, value) => {
        setFieldValue(checkbox, value)
    }

    const deleteProd = (id) => {
        closeModal()
        Swal.fire({
            title: "Deseas eliminar el producto?",
            confirmButtonColor: '#D32F2F',
            showCancelButton: true,
            confirmButtonText: "Eliminar",
            reverseButtons: true,
        }).then( async (result) => {
        if (result.isConfirmed) {
            try{
                const response = await deleteProduct(id)
                
                if(response.status === 200){
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "El producto se eliminó correctamente",
                        showConfirmButton: false,
                        timer: 1000
                    });
                    const updatedProducts = products.map(prod => prod.id === data.id ? response.data : prod)
                    setProducts(updatedProducts)
                    filterProductsByCategory('todos')
                    scrollToTop()
                }else{
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: response.message,
                        confirmButtonText: 'Cerrar'
                    });
                }
            }catch(error){
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: error.response.message,
                    confirmButtonText: 'Cerrar',
                    confirmButtonColor: '#1975d1'
                })
            }
            const updatedProducts = products.filter(product => product.id !== id)
            setProducts(updatedProducts)

        } else if (result.isDismissed) {
            Swal.fire({
                position: "center",
                icon: "warning",
                title: "Operación cancelada",
                showConfirmButton: false,
                timer: 1000
            });
        }
        });
    }

    const discount = () => {
        if(data.actualPrice !== data.price){
            return Math.round((data.price - data.actualPrice) * 100 / data.price)
        }else{
            return 0
        }
    }
    
    useEffect(() => {
        if (data) {
            setFieldValue('title', data.title || '')
            setFieldValue('category', data.category || '')
            setFieldValue('description', data.description || '')
            setFieldValue('price', data.price || '')
            setFieldValue('discountPercentage', discount() )
            setFieldValue('active', data.active !== undefined ? data.active : true)
            setFieldValue('menu', data.menu !== undefined ? data.menu : true)
            setFieldValue('takeAway', data.takeAway !== undefined ? data.takeAway : true)
            setFieldValue('image', data.image || null)

            fetch(data.image)
            .then(response => response.blob())
            .then(blob => {
                let image = new File([blob], `${data.title}`, { type: blob.type })
                setFieldValue('image', image)
            })
            .catch(error => {
                setFieldValue('image', null)
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
                <div className="select-container">
                    <select
                        name="category"
                        className='input-select'
                        value={values.category}
                        onChange={(e) => {
                            setFieldValue('category', e.target.value);
                            if (e.target.value === "") setTouched({ ...touched, category: true })
                            else setTouched({ ...touched, category: false });
                        }}
                    >
                        <option value="" disabled>Categoría</option>
                        {categories.map(category => (
                            <option value={category.name} key={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    {errors.category && touched.category &&
                        <span>{errors.category}</span>
                    }
                </div>
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
                    <div className="prodcut-actions-column">
                        <div className="checkbox-container">
                            <input type="checkbox" name="menu" id="check-menu"  onChange={(e) => changeCheckbox("menu",!values.menu)} checked={values.menu}/>
                            <label htmlFor="check-menu">Menú</label>
                        </div>
                        <div className="checkbox-container">
                            <input type="checkbox" name="takeAway" id="check-ecom" onChange={(e) => changeCheckbox("takeAway",!values.takeAway)} checked={values.takeAway}/>
                            <label htmlFor="check-ecom">Take away</label>
                        </div>
                    </div>
                    <div className="prodcut-actions-column">
                        <label type='button' className="product-action-btn activo-btn" htmlFor="active-checkbox">
                                <input
                                    id="active-checkbox"
                                    type="checkbox"
                                    checked={values.active}
                                    onChange={(e) => changeCheckbox("active", !values.active)}
                                    name="active"
                                />
                                Activo
                            <StateCircle state={values.active} />
                        </label>
                        {
                            data && <button type="button" className='product-action-btn delete-prod-btn' onClick={() => deleteProd(data.id)}>Eliminar producto</button>
                        }
                    </div>
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
