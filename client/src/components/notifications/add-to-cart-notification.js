import React from 'react'
import Modal from 'react-modal'
import { Grid } from '@mui/material'

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  }

const AddToCartNotification = ({closeModal, modalIsOpen}) => {

    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Added To Cart Notification Modal"
        >
            <Grid container direction="column" justifyContent="center" alignItems="center">
                <Grid item>
                    <h2>Item(s) has been added to cart!</h2>
                </Grid>
                <Grid item>
                    <button onClick={closeModal}>Continue shopping!</button>
                </Grid>
            </Grid>
        </Modal>
    )
}

export default AddToCartNotification