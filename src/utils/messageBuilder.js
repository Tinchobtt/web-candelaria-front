export const messageBuilder = (tipoMensaje, values, tipoPedido, metodoPago, productos) => {
    const phoneNumber = 541125372314;
    let message = '';

    if (tipoMensaje === 'pedido') {
        message = `Hola, me llamo ${values.name}. Quiero hacer un pedido para el ${values.date} a las ${values.time} hs.\nMensaje adicional: ${values.message}\nTipo de pedido: ${tipoPedido}\nMétodo de pago: ${metodoPago}`;

        if (productos && productos.length > 0) {
            message += `\n\nPedido:\n`;
            productos.forEach((producto, index) => {
                message += `${index + 1}. ${producto.title} - Cantidad: ${producto.quantity}\n`;
            });
        }
    } else if (tipoMensaje === 'reserva') {
        message = `Hola, me llamo ${values.name}. Quiero hacer una reserva para ${values.amount} personas para el ${values.date} a las ${values.time}.\nMensaje adicional: ${values.message}`;
    }

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;

    return whatsappUrl;
}