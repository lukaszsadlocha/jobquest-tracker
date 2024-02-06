import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  TextField,
} from '@mui/material';

const EditProcessDialog = ({ open, onClose, editedProcess, setEditedProcess, onSaveChanges }) => {
  return (
    <Dialog fullWidth open={open} onClose={onClose}>
      <DialogTitle>Edit Process</DialogTitle>
      <DialogContent>
        <Stack spacing={2} style={{ marginTop: 20 }}>
          <TextField
            disabled
            label="ID"
            value={editedProcess.id}
          />
          <TextField
            label="Position"
            value={editedProcess.position}
            onChange={(e) => setEditedProcess({ ...editedProcess, position: e.target.value })}
          />
          <TextField
            label="Company"
            value={editedProcess.companyName}
            onChange={(e) => setEditedProcess({ ...editedProcess, companyName: e.target.value })}
          />
          <TextField
            label="Location"
            value={editedProcess.companyLocation}
            onChange={(e) => setEditedProcess({ ...editedProcess, companyLocation: e.target.value })}
          />
          <TextField
            label="Contact Person"
            value={editedProcess.contactPerson}
            onChange={(e) => setEditedProcess({ ...editedProcess, contactPerson: e.target.value })}
          />
          <TextField
            label="Contract Type"
            value={editedProcess.contractType}
            onChange={(e) => setEditedProcess({ ...editedProcess, contractType: e.target.value })}
          />
          <TextField
            label="Rate"
            value={editedProcess.rate}
            onChange={(e) => setEditedProcess({ ...editedProcess, rate: e.target.value })}
          />
          <TextField
            label="Type of Work"
            value={editedProcess.workOfficeType}
            onChange={(e) => setEditedProcess({ ...editedProcess, workOfficeType: e.target.value })}
          />
          <TextField
            label="Status"
            value={editedProcess.status}
            onChange={(e) => setEditedProcess({ ...editedProcess, status: e.target.value })}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onSaveChanges}>Save Changes</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProcessDialog;
