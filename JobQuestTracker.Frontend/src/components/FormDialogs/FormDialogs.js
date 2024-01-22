import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const columns = [
    { field: 'position', headerName: 'Position', width: 150, type: "text"},
    { field: 'companyName', headerName: 'Company', width: 150, type: "text"},
    { field: 'companyLocation', headerName: 'Location', width: 150, type: "text"},
    { field: 'contactPerson', headerName: 'Contact person', width: 150, type: "text"},
    { field: 'contractType', headerName: 'Contract Type', width: 150, type: "text"  },
    { field: 'rate', headerName: 'Rate', width: 130, type: "number"   },
    { field: 'workOfficeType', headerName: 'Type', width: 130, type: "text"},
    { field: 'status', headerName: 'Status', width: 150, type: "text"   }
];

  return (
    <React.Fragment>
      <Button variant="contained" onClick={handleClickOpen}>
        Add
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle>New Recruitment Processes</DialogTitle>
        <DialogContent>
            {columns.map(column =>(
                <TextField  id={column.field} name={column.field} label={column.headerName} type={column.type} fullWidth variant="standard" required/>
             ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Subscribe</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}