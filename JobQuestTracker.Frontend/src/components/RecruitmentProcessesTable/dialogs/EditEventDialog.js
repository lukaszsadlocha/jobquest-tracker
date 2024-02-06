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

const EditEventDialog = ({ open, onClose, editedProcess, setEditedProcess, onSaveChanges }) => {
  return (
    <Dialog fullWidth open={open} onClose={onClose}>
      <DialogTitle>Edit Event</DialogTitle>
      <DialogContent>
        <Stack spacing={2} style={{ marginTop: 20 }}>
          <TextField label="Event Type" value={editedProcess.recruitmentEvent}
            onChange={(e) => setEditedProcess({ ...editedProcess, recruitmentEvent: e.target.value })}
          />
          <TextField label="Meeting Host" value={editedProcess.meetingHost}
            onChange={(e) => setEditedProcess({ ...editedProcess, meetingHost: e.target.value })}
          />
          <TextField label="Notes" value={editedProcess.notes}
            onChange={(e) => setEditedProcess({ ...editedProcess, notes: e.target.value })}
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

export default EditEventDialog;
