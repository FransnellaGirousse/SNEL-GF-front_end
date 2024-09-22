import React, { useState } from 'react';

const Approval = ({ actionLabel, onConfirm }) => {
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleConfirm = () => {
    onConfirm();
    handleClose();
  };

  return (
    <div>
      <button onClick={handleShow}>
        {actionLabel || 'Action'}
      </button>

      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h3>Confirmation</h3>
            <p>Êtes-vous sûr de vouloir effectuer cette action ?</p>
            <button onClick={handleConfirm} style={styles.confirmButton}>Confirmer</button>
            <button onClick={handleClose} style={styles.cancelButton}>Annuler</button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '5px',
    textAlign: 'center',
  },
  confirmButton: {
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    margin: '10px',
    cursor: 'pointer',
  },
  cancelButton: {
    backgroundColor: 'gray',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    margin: '10px',
    cursor: 'pointer',
  },
};

export default Approval;
