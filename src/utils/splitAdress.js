export const splitAddress = (address) => {
    // Normalizamos la dirección eliminando posibles espacios extra al inicio y al final
  address = address.trim();
  
  // Expresión regular para encontrar números que podrían ser el número de la calle
  const regex = /\b\d{1,5}\b/g;
  
  // Encontramos todos los números en la dirección
  const numbers = address.match(regex);
  
  if (numbers && numbers.length > 0) {
    // Tomamos el último número como el número de la calle
    const number = numbers[numbers.length - 1];
    
    // Eliminamos el número encontrado de la dirección original para obtener la calle
    const street = address.replace(new RegExp(`\\b${number}\\b`), "").trim();
    
    return { street, number };
  }

  // Si no se encuentra un número, devolvemos la dirección completa como calle y número vacío
  return { street: address, number: '' };
}