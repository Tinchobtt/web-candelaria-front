export const messageBuilder = (tipoMensaje, values, tipoPedido, metodoPago, productos, detallePedidoLink) => {
    const phoneNumber = 541125372314;
    let message = '';

    // Construcción del mensaje basado en el tipo de mensaje
    if (tipoMensaje === 'pedido') {
        message = `Hola, me llamo ${values.name}. Quiero hacer un pedido para el ${values.date} a las ${values.time} hs.`;
        message += `\nTipo de pedido: ${tipoPedido}\nMétodo de pago: ${metodoPago}`;

        if (tipoPedido === 'A domicilio') {
            message += `\nDomicilio: ${values.domicilio} ${values.domicilio_number}`;
        }

        if (productos && productos.length > 0) {
            message += `\n\nPedido:\n`;
            productos.forEach((producto) => {
                message += `• ${producto.title} - Cantidad: ${producto.quantity}\n`;
            });
        }
    } else if (tipoMensaje === 'reserva') {
        message = `Hola, me llamo ${values.name}. Quiero hacer una reserva para ${values.amount} personas para el ${values.date} a las ${values.time}.`;
    }

    if (values.message) {
        message += `\nMensaje adicional: ${values.message}`;
    }

    // Detectar si el dispositivo es móvil
    const isMobileDevice = () => {
        const userAgent = navigator.userAgent || window.opera;
        const mobileDevices = /android|iphone|ipad|ipod|blackberry|iemobile|opera mini|windows phone|webos|silk|avantgo|nokia|palm|kindle|symbian|mobile|phone/i;
        return mobileDevices.test(userAgent.toLowerCase());
    };

    const encodedMessage = encodeURIComponent(message);

    // Usar URL diferente según el dispositivo
    const whatsappUrl = isMobileDevice() 
        ? `https://wa.me/${phoneNumber}?text=${encodedMessage}` // Para móviles
        : `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`; // Para escritorio

    return whatsappUrl;
};
