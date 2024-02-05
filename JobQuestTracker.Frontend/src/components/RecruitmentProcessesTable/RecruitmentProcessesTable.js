// RecruitmentProcessesTable.js
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
    Typography,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Stack,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const RecruitmentProcessesTable = ({ apiUrl }) => {
    const [data, setData] = useState([]);
    const [expandedRow, setExpandedRow] = useState(null);
    const [viewProcessDialogOpen, setViewProcessDialogOpen] = useState(false);
    const [editProcessDialogOpen, setEditProcessDialogOpen] = useState(false);
    const [deleteProcessDialogOpen, setDeleteProcessDialogOpen] = useState(false);
    const [viewEventDialogOpen, setViewEventDialogOpen] = useState(false);
    const [editEventDialogOpen, setEditEventDialogOpen] = useState(false);
    const [deleteEventDialogOpen, setDeleteEventDialogOpen] = useState(false);
    const [selectedProcess, setSelectedProcess] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [editedProcess, setEditedProcess] = useState({
        id: '',
        position: '',
        companyName: '',
        companyLocation: '',
        contactPerson: '',
        contractType: '',
        rate: '',
        workOfficeType: '',
        status: '',
    });
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
                setRefreshProcesses(r => r+1);
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
                setRefreshProcesses(r => r+1);
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
                                                <Typography variant="h6" gutterBottom component="div">
                                                    Events
                                                </Typography>
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

            {/* View Process Dialog */}
            <Dialog open={viewProcessDialogOpen} onClose={handleCloseDialogs}>
                <DialogTitle>View Process</DialogTitle>
                <DialogContent>
                    <Typography>ID: {selectedProcess?.id}</Typography>
                    <Typography>Position: {selectedProcess?.position}</Typography>
                    <Typography>Company: {selectedProcess?.companyName}</Typography>
                    <Typography>Location: {selectedProcess?.companyLocation}</Typography>
                    <Typography>Contact Person: {selectedProcess?.contactPerson}</Typography>
                    <Typography>Contract Type: {selectedProcess?.contractType}</Typography>
                    <Typography>Rate: {selectedProcess?.rate}</Typography>
                    <Typography>Type of Work: {selectedProcess?.workOfficeType}</Typography>
                    <Typography>Status: {selectedProcess?.status}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialogs}>Close</Button>
                </DialogActions>
            </Dialog>

            {/* Edit Process Dialog */}
            <Dialog open={editProcessDialogOpen} onClose={handleCloseDialogs}>
                <DialogTitle>Edit Process</DialogTitle>
                <DialogContent >
                    <Stack spacing={2}>
                        <TextField
                            label="ID"
                            value={editedProcess.id}
                            InputProps={{
                                readOnly: true,
                            }}
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
                    <Button onClick={handleCloseDialogs}>Cancel</Button>
                    <Button onClick={handleDeleteProcess} startIcon={<DeleteIcon />} color="error">
                        Delete
                    </Button>
                    <Button onClick={handleSaveChanges}>Save Changes</Button>
                </DialogActions>
            </Dialog>

            {/* Delete Process Dialog */}
            <Dialog open={deleteProcessDialogOpen} onClose={handleCloseDialogs}>
                <DialogTitle>Delete Process</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to delete this process?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialogs}>Cancel</Button>
                    <Button onClick={handleDeleteProcessConfirm} startIcon={<DeleteIcon />} color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            {/* View Event Dialog */}
            <Dialog open={viewEventDialogOpen} onClose={handleCloseDialogs}>
                <DialogTitle>View Event</DialogTitle>
                <DialogContent>
                    {/* Display details of selectedEvent */}
                    <Typography>Event Type: {selectedEvent?.recruitmentEvent}</Typography>
                    <Typography>Meeting Host: {selectedEvent?.meetingHost}</Typography>
                    <Typography>Notes: {selectedEvent?.notes}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialogs}>Close</Button>
                </DialogActions>
            </Dialog>

            {/* Edit Event Dialog */}
            <Dialog open={editEventDialogOpen} onClose={handleCloseDialogs}>
                <DialogTitle>Edit Event</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Event Type"
                        value={editedProcess.recruitmentEvent}
                        onChange={(e) => setEditedProcess({ ...editedProcess, recruitmentEvent: e.target.value })}
                    />
                    <TextField
                        label="Meeting Host"
                        value={editedProcess.meetingHost}
                        onChange={(e) => setEditedProcess({ ...editedProcess, meetingHost: e.target.value })}
                    />
                    <TextField
                        label="Notes"
                        value={editedProcess.notes}
                        onChange={(e) => setEditedProcess({ ...editedProcess, notes: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialogs}>Cancel</Button>
                    <Button onClick={handleDeleteEvent} startIcon={<DeleteIcon />} color="error">
                        Delete
                    </Button>
                    <Button onClick={handleSaveChangesEvent}>Save Changes</Button>
                </DialogActions>
            </Dialog>

            {/* Delete Event Dialog */}
            <Dialog open={deleteEventDialogOpen} onClose={handleCloseDialogs}>
                <DialogTitle>Delete Event</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to delete this event?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialogs}>Cancel</Button>
                    <Button onClick={handleDeleteEventConfirm} startIcon={<DeleteIcon />} color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default RecruitmentProcessesTable;
