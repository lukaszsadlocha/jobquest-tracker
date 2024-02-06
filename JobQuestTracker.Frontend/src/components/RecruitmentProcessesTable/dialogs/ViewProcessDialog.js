import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Stack, TextField } from '@mui/material';

const ViewProcessDialog = ({ open, onClose, selectedProcess }) => {
  return (
    <Dialog fullWidth open={open} onClose={onClose}>
      <DialogTitle>View Process</DialogTitle>
      <DialogContent>
        <Stack spacing={2} style={{ marginTop: 20 }}>
          <TextField InputProps={{ readOnly: true, }} label="ID" value={selectedProcess?.id} />
          <TextField InputProps={{ readOnly: true, }} label="Position" value={selectedProcess?.position} />
          <TextField InputProps={{ readOnly: true, }} label="Company" value={selectedProcess?.companyName} />
          <TextField InputProps={{ readOnly: true, }} label="Location" value={selectedProcess?.companyLocation} />
          <TextField InputProps={{ readOnly: true, }} label="Contact Person" value={selectedProcess?.contactPerson} />
          <TextField InputProps={{ readOnly: true, }} label="Contract Type" value={selectedProcess?.contractType} />
          <TextField InputProps={{ readOnly: true, }} label="Rate" value={selectedProcess?.rate} />
          <TextField InputProps={{ readOnly: true, }} label="Type of Work" value={selectedProcess?.workOfficeType} />
          <TextField InputProps={{ readOnly: true, }} label="Status" value={selectedProcess?.status} />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewProcessDialog;