import './modalProducto.scss';
import Button from "@mui/material/Button";
import { useRef } from "react";
import { TextField, Checkbox, FormControl, FormControlLabel } from "@mui/material";
import * as Yup from 'yup';
import { useFormik } from "formik";
import axios from 'axios';
import uploadFood from '../../../assets/imgs/uploadFood.png';
import { FaEdit } from "react-icons/fa";
import StateCircle from '../stateCircle/StateCircle';
import { useProductsCategories } from '../../../context/ProductsCategoriesContext';
import { useModal } from '../../../context/ModalContext';

const ModalProduct = () => {
    const { closeModal } = useModal()
    const formRef = useRef(null);
    const { categories } = useProductsCategories();

    const { handleSubmit, handleChange, handleBlur, touched, values, errors, setFieldValue } = useFormik({
        initialValues: {
            title: '',
            category: '',
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
                const response = await fetch(uploadFood);
                const blob = await response.blob();
                image = new File([blob], 'uploadFood.png', { type: blob.type });
            } else {
                image = values.image
            }
            setFieldValue('image', image)

            formData.append('image', image);
            formData.append('title', values.title);
            formData.append('category', values.category);
            formData.append('description', values.description);
            formData.append('price', values.price);
            formData.append('discountPercentage', values.discountPercentage);
            formData.append('active', values.active);

            console.log(formData);
            try {
                await axios.post('http://localhost:8080/api/products', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                
            } catch (error) {
                console.error('Error uploading image:', error);
            }
            //console.log(values);
            //action.resetForm();
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

    return (
        <div className='modal-content-producto'>
            <h2 className="modal-title">Nuevo producto</h2>
            <form ref={formRef} onSubmit={handleSubmit} className="modal-form">
                <div className="image-upload">
                    <img src={values.image ? URL.createObjectURL(values.image) : uploadFood} alt="imagen Producto" />
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
                <div className="double-input-cotainer">
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
                        label="Descuento"
                        variant="filled"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.discountPercentage}
                        error={!!errors.discountPercentage && touched.discountPercentage}
                        helperText={errors.discountPercentage && touched.discountPercentage && errors.discountPercentage}
                    />
                </div>
                <div className="prodcut-actions">
                    <FormControl
                        error={!!errors.active && touched.active}
                        component="fieldset"
                        variant="standard"
                        className='modal-btn'
                    >
                        <FormControlLabel
                            control={
                                <Checkbox
                                    className='hidden-checkbox' // Clase para ocultar el checkbox
                                    checked={values.active}
                                    onChange={(e) => changeCheckbox(e.target.checked)}
                                    name="active"
                                />
                            }
                            label="Activo"
                        />
                        <StateCircle state={values.active} />
                    </FormControl>
                    {/* <button className='modal-btn'>Eliminar producto</button> */}
                </div>
                <div className="modal-action-btns">
                    <Button className="modal-btn-send" color='error' size={"large"} variant='contained' onClick={closeModal}>Cancelar</Button>
                    <Button type={'submit'} className="modal-btn-send" size={"large"} variant='contained'>Agregar</Button>
                </div>
            </form>
        </div>
    );
};

export default ModalProduct;
