import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  TextField,
} from '@mui/material';

const AddEventDialog = ({ open, onClose, onAddEvent, newEvent, setNewEvent }) => {
  return (
    <Dialog fullWidth open={open} onClose={onClose}>
      <DialogTitle>Add Event</DialogTitle>
      <DialogContent>
        <Stack spacing={2} style={{ marginTop: 20 }}>
          <TextField
            label="Event Type"
            value={newEvent.recruitmentEvent}
            onChange={(e) => setNewEvent({ ...newEvent, recruitmentEvent: e.target.value })}
          />
          <TextField
            label="Meeting Host"
            value={newEvent.meetingHost}
            onChange={(e) => setNewEvent({ ...newEvent, meetingHost: e.target.value })}
          />
          <TextField
            label="Notes"
            value={newEvent.notes}
            onChange={(e) => setNewEvent({ ...newEvent, notes: e.target.value })}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onAddEvent}>Add Event</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEventDialog;