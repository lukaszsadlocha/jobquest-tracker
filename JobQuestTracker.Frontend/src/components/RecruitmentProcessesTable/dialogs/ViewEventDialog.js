import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Stack, TextField } from '@mui/material';

const ViewEventDialog = ({ open, onClose, selectedEvent }) => {
  return (
    <Dialog fullWidth open={open} onClose={onClose}>
      <DialogTitle>View Event</DialogTitle>
      <DialogContent>
        <Stack spacing={2} style={{ marginTop: 20 }}>
          <TextField InputProps={{ readOnly: true, }} label="Event Type" value={selectedEvent?.recruitmentEvent} />
          <TextField InputProps={{ readOnly: true, }} label="Meeting Host" value={selectedEvent?.meetingHost} />
          <TextField InputProps={{ readOnly: true, }} label="Notes" value={selectedEvent?.notes} />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewEventDialog;
