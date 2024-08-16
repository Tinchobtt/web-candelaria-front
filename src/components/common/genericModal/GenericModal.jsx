import React from 'react';

const GenericModal = ({ show, onClose, children }) => {
  if (!show) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <button onClick={onClose}>Cerrar</button>
        {children}
      </div>
    </div>
  );
};

export default GenericModal;