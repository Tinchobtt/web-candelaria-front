import { Helmet } from 'react-helmet';
import { useCart } from '../../../context/CartContext';
import { messageBuilder } from '../../../utils/messageBuilder';
import './detallePedido.scss';
import { Button } from '@mui/material';

const DetallePedido = () => {
    const pedido = JSON.parse(localStorage.getItem('ultimoPedido'));
    const {clearCart} = useCart()
    const totalBase = pedido?.cart?.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    ) || 0;
    console.log(pedido);
    
    const envio = pedido?.response?.deliveryPaid ? 2000 : 0;
    const totalFinal = totalBase + envio;
    
    const sendMessage = () =>{
        const whatsappUrl = messageBuilder('pedido', pedido.values, pedido.tipoPedido, pedido.metodoPago, pedido.cart)
        window.open(whatsappUrl, '_blank')
        clearCart()
    }

  return (
    <>
        <Helmet>
            <title>Detalle Pedido</title>
        </Helmet>
        <div className="expandenContainer">
            <main id="main-detallePedido">
                {pedido ? (
                <div className="detallePedido-container">
                    <h2 className="detallePedido-title">Detalle Pedido</h2>
                    
                    <div className="detalle-pedido-seccion">
                        <h3>Datos del Cliente</h3>
                        <p>Nombre: {pedido.values.name}</p>

                        {pedido.tipoPedido === 'domicilio' && (
                            <p>Domicilio: {pedido.domicilio} {pedido.domicilio_number}</p>
                        )}

                        <p>Mensaje: {pedido.values.message || "-"}</p>
                        <p>Fecha: {pedido.values.date}</p>
                        <p>Hora: {pedido.values.time} hs</p>
                        <p>Tipo de Pedido: {pedido.tipoPedido}</p>
                        <p>Metodo de Pago: {pedido.metodoPago}</p>
                    </div>

                    <div className="detalle-pedido-seccion">
                    <h3>Pedido</h3>
                    {pedido.cart.map((item) => (
                        <div key={item.id} className="detalle-pedido-item">
                        <p>Producto: {item.title}</p>
                        <p>Cantidad: {item.quantity}</p>
                        <p>Precio: ${item.price}</p>
                        </div>
                    ))}
                    </div>

                    <div className="detalle-pedido-seccion resumen">
                        <h3>Resumen</h3>
                        <p>Total productos: ${totalBase.toLocaleString()}</p>
                        {envio > 0 && <p>Envío: ${envio.toLocaleString()}</p>}
                        <p>Precio final: ${totalFinal.toLocaleString()}</p>

                        {pedido.metodoPago === 'Transferencia' && (
                            <div className="datos-transferencia">
                                <h4>Datos para transferir</h4>
                                <p>CBU: 1234567890123456789012</p>
                                <p>Alias: ejemplo.transferencia</p>
                                <p>Titular: Nombre Apellido</p>
                                <span className='msg-transfer'>* Recuerde mandarnos el comprobante por WhatsApp una vez finalizada la transferencia</span>
                            </div>
                        )}
                        <Button className="btn-send" onClick={sendMessage} size={"large"} variant='contained'>Solicitar Pedido</Button>
                    </div>
                </div>
                ) : (
                <span>No se encontró el pedido.</span>
                )}
            </main>
        </div>
        </>
  )
}

export default DetallePedido;
