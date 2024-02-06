import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Collapse,
  Box,
  Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import ViewProcessDialog from './dialogs/ViewProcessDialog';
import EditProcessDialog from './dialogs/EditProcessDialog';
import DeleteProcessDialog from './dialogs/DeleteProcessDialog';
import ViewEventDialog from './dialogs/ViewEventDialog';
import EditEventDialog from './dialogs/EditEventDialog';
import DeleteEventDialog from './dialogs/DeleteEventDialog';
import AddEventDialog from './dialogs/AddEventDialog';

const RecruitmentProcessesTable = ({ apiUrl }) => {
  const [data, setData] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);
    
  //dialogs process
  const [editedProcess, setEditedProcess] = 
  useState({id: '', position: '', companyName: '', companyLocation: '', contactPerson: '', contractType: '', rate: '', workOfficeType: '', status: '',});

  const [viewProcessDialogOpen, setViewProcessDialogOpen] = useState(false);
  const [editProcessDialogOpen, setEditProcessDialogOpen] = useState(false);
  const [deleteProcessDialogOpen, setDeleteProcessDialogOpen] = useState(false);

  //dialogs event
  const [newEvent, setNewEvent] = useState({ id:'', recruitmentProcessId: '', recruitmentEvent: '', meetingHost: '', notes: ''});

  const [AddEventDialogOpen, setAddEventDialogOpen] = useState(false);
  const [viewEventDialogOpen, setViewEventDialogOpen] = useState(false);
  const [editEventDialogOpen, setEditEventDialogOpen] = useState(false);
  const [deleteEventDialogOpen, setDeleteEventDialogOpen] = useState(false);

  const [selectedProcess, setSelectedProcess] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [refreshProcesses, setRefreshProcesses] = useState(0);

  useEffect(() => {
    // Fetch data from the API endpoint
    fetch(`${apiUrl.API_URL}/recruitmentProcesses`)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching data', error));
  }, [refreshProcesses]);

  const handleExpandRow = (rowId) => {
    setExpandedRow((prevRow) => (prevRow === rowId ? null : rowId));
  };

  const handleViewProcess = (process) => {
    setSelectedProcess(process);
    setViewProcessDialogOpen(true);
  };

  const handleEditProcess = (process) => {
    setSelectedProcess(process);
    setEditedProcess(process);
    setEditProcessDialogOpen(true);
  };

  const handleSaveChanges = () => {
    // Send PUT request to update the process
    fetch(`${apiUrl.API_URL}/recruitmentProcesses/${editedProcess.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedProcess),
    })
      .then((response) => response.json())
      .then((updatedProcess) => {
        // Handle success (e.g., update state, close dialog)
        console.log(`Updated Process ${updatedProcess.id}`);
        handleCloseDialogs();
        setRefreshProcesses((r) => r + 1);
      })
      .catch((error) => console.error('Error updating process', error));
  };

  const handleDeleteProcess = (process) => {
    setSelectedProcess(process);
    setDeleteProcessDialogOpen(true);
  };

  const handleViewEvent = (event) => {
    setSelectedEvent(event);
    setViewEventDialogOpen(true);
  };

  const handleEditEvent = (event) => {
    setSelectedEvent(event);
    setEditedProcess(event);
    setEditEventDialogOpen(true);
  };

  const handleSaveChangesEvent = () => {
    // Send PUT request to update the event
    fetch(`${apiUrl.API_URL}/recruitmentEvents/${editedProcess.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedProcess),
    })
      .then((response) => response.json())
      .then((updatedEvent) => {
        // Handle success (e.g., update state, close dialog)
        console.log(`Updated Event ${updatedEvent.id}`);
        handleCloseDialogs();
      })
      .catch((error) => console.error('Error updating event', error));
  };

  const handleDeleteEvent = (event) => {
    setSelectedEvent(event);
    setDeleteEventDialogOpen(true);
  };

  const handleCloseDialogs = () => {
    setViewProcessDialogOpen(false);
    setEditProcessDialogOpen(false);
    setDeleteProcessDialogOpen(false);
    setViewEventDialogOpen(false);
    setEditEventDialogOpen(false);
    setDeleteEventDialogOpen(false);
    setAddEventDialogOpen(false);
  };

  const handleDeleteProcessConfirm = () => {
    // Send DELETE request for the selected process
    fetch(`${apiUrl.API_URL}/recruitmentProcesses/${selectedProcess.id}`, {
      method: 'DELETE',
    })
      .then(() => {
        // Handle success (e.g., update state, close dialog)
        console.log(`Deleted Process ${selectedProcess.id}`);
        handleCloseDialogs();
        setRefreshProcesses((r) => r + 1);
      })
      .catch((error) => console.error('Error deleting process', error));
  };

  const handleDeleteEventConfirm = () => {
    // Send DELETE request for the selected event
    fetch(`${apiUrl.API_URL}/recruitmentEvents/${selectedEvent.id}`, {
      method: 'DELETE',
    })
      .then(() => {
        // Handle success (e.g., update state, close dialog)
        console.log(`Deleted Event ${selectedEvent.id}`);
        handleCloseDialogs();
      })
      .catch((error) => console.error('Error deleting event', error));
  };

  const handleAddNewEvent = () =>{
    console.log("adds new event ");
    handleCloseDialogs();
  }

  const handleAddEvent = (process) => {
    setAddEventDialogOpen(true);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>ID</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Contact Person</TableCell>
              <TableCell>Contract Type</TableCell>
              <TableCell>Rate</TableCell>
              <TableCell>Type of Work</TableCell>
              <TableCell>Status</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <React.Fragment key={row.id}>
                <TableRow>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => handleExpandRow(row.id)}
                      aria-expanded={expandedRow === row.id}
                      aria-label="expand row"
                    >
                      {expandedRow === row.id ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                  </TableCell>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.position}</TableCell>
                  <TableCell>{row.companyName}</TableCell>
                  <TableCell>{row.companyLocation}</TableCell>
                  <TableCell>{row.contactPerson}</TableCell>
                  <TableCell>{row.contractType}</TableCell>
                  <TableCell>{row.rate}</TableCell>
                  <TableCell>{row.workOfficeType}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleViewProcess(row)} startIcon={<VisibilityIcon />} size="small">
                      View
                    </Button>
                    <Button onClick={() => handleEditProcess(row)} startIcon={<EditIcon />} size="small">
                      Edit
                    </Button>
                    <Button onClick={() => handleDeleteProcess(row)} startIcon={<DeleteIcon />} size="small">
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={11}>
                    <Collapse in={expandedRow === row.id} timeout="auto" unmountOnExit>
                      <Box margin={1}>
                        <Table size="small" aria-label="purchases">
                          <TableHead>
                            <TableRow>
                              <TableCell>Event Type</TableCell>
                              <TableCell>Meeting Host</TableCell>
                              <TableCell>Notes</TableCell>
                              <TableCell>Actions</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {row.events.map((event) => (
                              <TableRow key={event.id}>
                                <TableCell>{event.recruitmentEvent}</TableCell>
                                <TableCell>{event.meetingHost}</TableCell>
                                <TableCell>{event.notes}</TableCell>
                                <TableCell>
                                  <Button onClick={() => handleViewEvent(event)} startIcon={<VisibilityIcon />} size="small">
                                    View
                                  </Button>
                                  <Button onClick={() => handleEditEvent(event)} startIcon={<EditIcon />} size="small">
                                    Edit
                                  </Button>
                                  <Button onClick={() => handleDeleteEvent(event)} startIcon={<DeleteIcon />} size="small">
                                    Delete
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                            <TableRow>
                              <TableCell>
                                <Button onClick={() => handleAddEvent(row)} variant="contained">
                                  Add Event{' '}
                                </Button>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialogs */}
      <ViewProcessDialog
        open={viewProcessDialogOpen}
        onClose={handleCloseDialogs}
        selectedProcess={selectedProcess}
      />
      <EditProcessDialog
        open={editProcessDialogOpen}
        onClose={handleCloseDialogs}
        editedProcess={editedProcess}
        setEditedProcess={setEditedProcess}
        onSaveChanges={handleSaveChanges}
      />
      <DeleteProcessDialog
        open={deleteProcessDialogOpen}
        onClose={handleCloseDialogs}
        onDeleteConfirm={handleDeleteProcessConfirm}
      />
      <ViewEventDialog open={viewEventDialogOpen} onClose={handleCloseDialogs} selectedEvent={selectedEvent} />
      <EditEventDialog
        open={editEventDialogOpen}
        onClose={handleCloseDialogs}
        editedProcess={editedProcess}
        setEditedProcess={setEditedProcess}
        onSaveChanges={handleSaveChangesEvent}
      />
      <DeleteEventDialog open={deleteEventDialogOpen} onClose={handleCloseDialogs} onDeleteConfirm={handleDeleteEventConfirm} />
      <AddEventDialog open={AddEventDialogOpen} onClose={handleCloseDialogs} onAddEvent={handleAddNewEvent} newEvent={newEvent} setNewEvent={setNewEvent}/>
    </div>
  );
};

export default RecruitmentProcessesTable;
