import './modalReserva.scss'
import Button from "@mui/material/Button";
import {useRef} from "react";
import {TextField} from "@mui/material";
import * as Yup from 'yup';
import {useFormik} from "formik";

const ModalReserva = ({name}) => {
    const formRef = useRef(null);
    const {handleSubmit, handleChange, handleBlur, touched, values, errors} = useFormik({
        initialValues: {
            name: '',
            amount: '',
            message: '',
            date: '',
            time: '',
        },
        onSubmit: (values, action)=>{
            const message = `Hola, me llamo ${values.name}. Quiero hacer una reserva de ${values.amount} para el ${values.date} a las ${values.time}. Mensaje adicional: ${values.message}`;
            const phoneNumber = 541125372314
            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `whatsapp://send?phone=${phoneNumber}&text=${encodedMessage}`;
            window.open(whatsappUrl, '_blank');
            action.resetForm();
        },
        //VALIDACIONES
        validationSchema: Yup.object().shape({
            name: Yup.string()
                .required('Campo obligatorio')
                .max(30, 'El nombre no puede tener más de 30 caracteres'),
            amount: Yup.number()
                .required('Campo obligatorio')
                .positive('El monto debe ser un número positivo'),
            message: Yup.string(),
            date: Yup.date()
                .required('Campo obligatorio')
                .typeError('Fecha no válida'), // Esto captura errores si la fecha no es válida
            time: Yup.string()
                .required('Campo obligatorio')
                .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Hora no válida'), // Verifica el formato HH:mm
        }),
    })

    return (
        <div className='modal-content'>
            <h2 className="modal-title">Tu Reserva de {name}</h2>
            <form ref={formRef} onSubmit={handleSubmit} className="modal-form" >
                <TextField
                    type="text"
                    name="name"
                    label="Nombre"
                    variant="filled"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    error={(!!errors.name && touched.name)}
                    helperText={errors.name && touched.name && errors.name}
                />
                <TextField
                    type="number"
                    name="amount"
                    label="Cantidad de personas"
                    variant="filled"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.amount}
                    error={!!(errors.amount && touched.amount)}
                    helperText={errors.amount && touched.amount && errors.amount}
                />
                <TextField
                    type="text"
                    name="message"
                    label="Nota"
                    variant="filled"
                    multiline
                    maxRows={3}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.message}
                    error={!!(errors.message && touched.message)}
                    helperText={errors.message && touched.message && errors.message}
                />
                <div className="date-hour-container">
                    <TextField
                        type="date"
                        name="date"
                        label="Fecha"
                        variant="filled"
                        InputLabelProps={{ shrink: true }}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.date}
                        error={(!!errors.date && touched.date)}
                        helperText={errors.date && touched.date && errors.date}
                    />
                    <TextField
                        type="time"
                        name="time"
                        label="Fecha"
                        variant="filled"
                        InputLabelProps={{ shrink: true }}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.time}
                        error={(!!errors.time && touched.time)}
                        helperText={errors.time && touched.time && errors.time}
                    />
                </div>
                <span>Se redirigirá a WhatsApp para notificar al establecimiento.
                    Su solicitud será respondida a la brevedad.
                </span>
                <Button type={'submit'} className="modal-btn-send" size={"large"} variant='contained'>Enviar</Button>
            </form>
        </div>
    )
}

export default ModalReserva