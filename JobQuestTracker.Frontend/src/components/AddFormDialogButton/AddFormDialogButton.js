import * as React from 'react';
import Button from '@mui/material/Button';
import FormDialog from '../../components/AddFormChat/AddFomChat';

export default function AddFormDialogButton({onProcessAdded}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    onProcessAdded();
  };

  return (
<React.Fragment>
    <Button onClick={handleClickOpen} variant="contained">Add</Button>
    <FormDialog open={open} onClose={handleClose} />
</React.Fragment>

  );
}