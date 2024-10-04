import './modal.scss'
import { MdKeyboardArrowDown } from "react-icons/md";
import Button from "@mui/material/Button";
import {useRef, useState} from "react";
import {Accordion, AccordionDetails, AccordionSummary, Box, TextField, Typography} from "@mui/material";
import * as Yup from 'yup';
import {useFormik} from "formik";
import { useTime } from '../../../context/TimeContext';
import { splitAddress } from '../../../utils/splitAdress';
import { useCart } from '../../../context/CartContext';
import { messageBuilder } from '../../../utils/messageBuilder';
import { getAddress } from '../../../services/addressService';
import { useModal } from '../../../context/ModalContext';
import { useNavigate } from 'react-router-dom';

const ModalPedido = () => {
    const formRef = useRef(null);
    const inputTime = useRef(null);
    const inputDate = useRef(null);
    const {checkIfOpen} = useTime()
    const {cart, clearCart} = useCart()
    const { closeModal } = useModal()
    const navigate = useNavigate()
    const today = new Date();
    today.setHours(0,0,0,0);

    const [tipoPedido, setTipoPedido] = useState(null);
    const [tipoPedidoHelper, setTipoPedidoHelper] = useState('');
    
    const [metodoPago, setMetodoPago] = useState(null);
    const [metodoPagoHelper, setMetodoPagoHelper] = useState(null);

    const [expandedPedido, setExpandedPedido] = useState(false);
    const [expandedMetodoPago, setExpandedMetodoPago] = useState(false);

    const handleSelectPedido = (event) => {
        setTipoPedido(event);   
        setExpandedPedido(false); 
        setTipoPedidoHelper('')

        if (event === 'Retiro en el local') {
            setFieldValue('domicilio', '');
        }
    };

    const handleSelectMetodoPago = (event) => {
        setMetodoPago(event);
        setExpandedMetodoPago(false); 
        setMetodoPagoHelper('')
    };

    const finishOrder = (action, whatsappUrl) => {
        window.open(whatsappUrl, '_blank');
        action.resetForm();
        closeModal()
        clearCart()
        navigate('/')
    }

    const {handleSubmit, handleChange, handleBlur, touched, values, errors, setFieldValue} = useFormik({
        initialValues: {
            name: '',
            domicilio: '',
            message: '',
            date: '',
            time: '',
        },
        onSubmit: async (values, action) => {
            const whatsappUrl = messageBuilder('pedido', values, tipoPedido, metodoPago, cart)
 
            let selectedDate = new Date(values.date);
            selectedDate = new Date(selectedDate.getTime() + selectedDate.getTimezoneOffset() * 60000);

            // Obtener la hora actual
            const now = new Date();
            const currentDay = now.toDateString();
            const selectedDay = selectedDate.toDateString();
            const selectedTime = values.time;

            // Verificar si es hoy y si la hora ya ha pasado
            if (currentDay === selectedDay) {
                const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
                
                if (selectedTime < currentTime) {
                    action.setFieldError('time', 'La hora seleccionada ya ha pasado. Por favor elige un horario futuro.');
                    return;
                }
            }

            if (!checkIfOpen(values.date, values.time)) {
                action.setFieldError('time', 'El local estará cerrado en la fecha y hora seleccionadas');
                return;
            }
            
            if(!tipoPedido){
                setTipoPedidoHelper('Campo obligatorio')
                return
            }
            if(!metodoPago){
                setMetodoPagoHelper('Campo obligatorio')
                return
            }
            
            if (tipoPedido === 'A domicilio') {
                action.setSubmitting(true);
                try {
                    const { street, number } = splitAddress(values.domicilio);
                    const response = await getAddress(street, number);
                    
                    if (response.valid) {
                        action.setSubmitting(false);
                        finishOrder(action, whatsappUrl)
                    }else{
                        action.setFieldError('domicilio', 'Domicilio fuera de rango');
                        action.setSubmitting(false);
                    }
                } catch (error) {
                    action.error('Error verificando el domicilio:', error);
                    action.setFieldError('domicilio', 'Domicilio fuera de rango');
                    action.setSubmitting(false);
                    return;
                }
            }else{
                finishOrder(action, whatsappUrl)
            }
        },
        // VALIDACIONES
        validationSchema: Yup.object().shape({
            name: Yup.string()
                .required('Campo obligatorio')
                .max(30, 'El nombre no puede tener más de 30 caracteres'),
            domicilio: Yup.string()
                .test('required', 'Campo obligatorio', function (value) {
                    if (tipoPedido === 'A domicilio') {
                        return !!value;
                    }
                    return true;
                }),
            message: Yup.string(),
            date: Yup.date()
                .required('Campo obligatorio')
                .min(today, 'La fecha no puede ser anterior al día presente')
                .typeError('Fecha no válida'),
            time: Yup.string()
                .required('Campo obligatorio')
                .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Hora no válida'),
        }),
    });

    return (
        <div className='modal-content'>
            <h2 className="modal-title">Tu Pedido</h2>
            <form ref={formRef} onSubmit={handleSubmit} className="modal-form">
                <div style={{width: '100%', marginBottom: '1rem'}}>
                    <Accordion 
                        sx={{width: '100%', borderRadius: '5px'}}
                        expanded={expandedPedido} 
                        onChange={() => setExpandedPedido(!expandedPedido)}
                    >
                        <AccordionSummary expandIcon={<MdKeyboardArrowDown size={'1.5rem'} />}>
                            <Typography sx={{ color: '#666666' }}>{tipoPedido ? tipoPedido : 'Tipo de pedido'}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box display="flex" flexDirection="column">
                                <Button 
                                    variant="text"
                                    onClick={() => handleSelectPedido('A domicilio')}
                                    sx={{
                                        justifyContent: 'flex-start',
                                        color: tipoPedido === 'A domicilio' ? 'black' : '#666666',
                                        fontWeight: tipoPedido === 'A domicilio' ? 'bold' : 'normal',
                                        textTransform: 'none',
                                        padding: '8px 0',
                                    }}
                                >
                                    A domicilio
                                </Button>
                                <Button 
                                    variant="text"
                                    onClick={() => handleSelectPedido('Retiro en el local')}
                                    sx={{
                                        justifyContent: 'flex-start',
                                        color: tipoPedido === 'Retiro en el local' ? 'black' : '#666666',
                                        fontWeight: tipoPedido === 'Retiro en el local' ? 'bold' : 'normal',
                                        textTransform: 'none',
                                        padding: '8px 0',
                                    }}
                                >
                                    Retiro en el local
                                </Button>
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                    <p className="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium MuiFormHelperText-contained css-1wc848c-MuiFormHelperText-root" style={{alignSelf: 'start'}}>
                        {tipoPedidoHelper}
                    </p>
                </div>
                {
                    tipoPedido === 'A domicilio' && (
                        <TextField
                            type="text"
                            name="domicilio"
                            label="Domicilio"
                            variant="filled"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.domicilio}
                            error={(!!errors.domicilio && touched.domicilio)}
                            helperText={errors.domicilio && touched.domicilio && errors.domicilio}
                        />
                    )
                }
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
                 <div style={{width: '100%', marginBottom: '1rem'}}>
                    <Accordion 
                        sx={{width: '100%', borderRadius: '5px'}}
                        expanded={expandedMetodoPago} 
                        onChange={() => setExpandedMetodoPago(!expandedMetodoPago)}
                    >
                        <AccordionSummary expandIcon={<MdKeyboardArrowDown size={'1.5rem'} />}>
                            <Typography sx={{ color: '#666666' }}>{metodoPago ? metodoPago : 'Metodo de pago'}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box display="flex" flexDirection="column">
                                <Button 
                                    variant="text"
                                    onClick={() => handleSelectMetodoPago('Tarjeta debito/credito')}
                                    sx={{
                                        justifyContent: 'flex-start',
                                        color: metodoPago === 'Tarjeta debito/credito' ? 'black' : '#666666',
                                        fontWeight: metodoPago === 'Tarjeta debito/credito' ? 'bold' : 'normal',
                                        textTransform: 'none',
                                        padding: '8px 0',
                                    }}
                                >
                                    Tarjeta debito/credito
                                </Button>
                                <Button 
                                    variant="text"
                                    onClick={() => handleSelectMetodoPago('Efectivo')}
                                    sx={{
                                        justifyContent: 'flex-start',
                                        color: metodoPago === 'Efectivo' ? 'black' : '#666666',
                                        fontWeight: metodoPago === 'Efectivo' ? 'bold' : 'normal',
                                        textTransform: 'none',
                                        padding: '8px 0',
                                    }}
                                >
                                    Efectivo
                                </Button>
                                <Button 
                                    variant="text"
                                    onClick={() => handleSelectMetodoPago('Mercado Pago')}
                                    sx={{
                                        justifyContent: 'flex-start',
                                        color: metodoPago === 'Mercado Pago' ? 'black' : '#666666',
                                        fontWeight: metodoPago === 'Mercado Pago' ? 'bold' : 'normal',
                                        textTransform: 'none',
                                        padding: '8px 0',
                                    }}
                                >
                                    Mercado Pago
                                </Button>
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                    <p className="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium MuiFormHelperText-contained css-1wc848c-MuiFormHelperText-root" style={{alignSelf: 'start'}}>
                        {metodoPagoHelper}
                    </p>
                 </div>
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
                <span>
                    Se redirigirá a WhatsApp para notificar al establecimiento.
                    Su solicitud será respondida a la brevedad.
                </span>
                <Button type={'submit'} className="modal-btn-send" size={"large"} variant='contained'>Enviar</Button>
            </form>
        </div>
    );
}

export default ModalPedido

const messageBuild = (values) =>{
    const message = `Hola, me llamo ${values.name}. Quiero hacer un pedido para el ${values.date} a las ${values.time} hs.\nMensaje adicional: ${values.message}\nPedido: `

    const phoneNumber = 541125372314;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;

    return encodeURIComponent(whatsappUrl)
}