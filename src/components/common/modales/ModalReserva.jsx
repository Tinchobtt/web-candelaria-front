import './modal.scss'
import Button from "@mui/material/Button";
import {useRef} from "react";
import {TextField} from "@mui/material";
import * as Yup from 'yup';
import {useFormik} from "formik";
import { useTime } from '../../../context/TimeContext';
import { messageBuilder } from '../../../utils/messageBuilder';

const ModalReserva = ({name}) => {
    const formRef = useRef(null);
    const inputTime = useRef(null);
    const inputDate = useRef(null);
    const {checkIfOpen} = useTime()
    const today = new Date()
    today.setHours(0,0,0,0)

    const {handleSubmit, handleChange, handleBlur, touched, values, errors} = useFormik({
        initialValues: {
            name: '',
            amount: '',
            message: '',
            date: '',
            time: '',
        },
        onSubmit: (values, action)=>{
            const whatsappUrl = messageBuilder('reserva', values)

            // Ajustar la fecha para que coincida con la zona horaria local
            let selectedDate = new Date(values.date);
            selectedDate = new Date(selectedDate.getTime() + selectedDate.getTimezoneOffset() * 60000);
 
            if (!checkIfOpen(selectedDate, values.time)) {
                action.setFieldError('time', 'El local estará cerrado en la fecha y hora seleccionadas');
                return;
            }
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
                .min(today, 'La fecha no puede ser anterior al día presente')
                .typeError('Fecha no válida'),
            time: Yup.string()
                .required('Campo obligatorio')
                .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Hora no válida'),
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
                        inputRef={inputDate}
                        onClick={() => {
                            if (inputDate.current) {
                                inputDate.current.showPicker();
                            }
                        }}
                    />
                    <TextField
                        type="time"
                        name="time"
                        label="Horario"
                        variant="filled"
                        InputLabelProps={{ shrink: true }}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.time}
                        error={(!!errors.time && touched.time)}
                        helperText={errors.time && touched.time && errors.time}
                        inputRef={inputTime}
                        onClick={() => {
                            if (inputTime.current) {
                                inputTime.current.showPicker();
                            }
                        }}
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