import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const DeleteProcessDialog = ({ open, onClose, onDeleteConfirm }) => {
  return (
    <Dialog fullWidth open={open} onClose={onClose}>
      <DialogTitle>Delete Process</DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to delete this process?</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onDeleteConfirm} startIcon={<DeleteIcon />} color="error">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteProcessDialog;
