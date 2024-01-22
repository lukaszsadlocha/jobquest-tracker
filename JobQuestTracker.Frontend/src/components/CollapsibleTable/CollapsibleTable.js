import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { config } from '../../constants'

var url = config.url.API_URL

const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'position', headerName: 'Position', width: 150 },
    { field: 'companyName', headerName: 'Company', width: 150 },
    { field: 'companyLocation', headerName: 'Location', width: 150 },
    { field: 'contactPerson', headerName: 'Contact person', width: 150 },
    { field: 'contractType', headerName: 'Contract Type', width: 150 },
    { field: 'rate', headerName: 'Rate', width: 130 },
    { field: 'workOfficeType', headerName: 'Type', width: 130 },
    { field: 'status', headerName: 'Status', width: 150 }
];

const meetingColumns = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'meetingHost', headerName: 'Meeting Host', width: 150 },
    { field: 'notes', headerName: 'Notes', width: 150 }
]

export default function CollapsibleTable() {

    const [processes, setProcesses] = useState([]);

    
    useEffect(() => {
        fetch(url + '/recruitmentProcesses')
            .then((response) => response.json())
            .then((json) => setProcesses(json))
            .catch(() => console.log("error on fetching data"))
    }, []);

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        {columns.map((column) => (
                            <TableCell>{column.headerName}</TableCell>    
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {processes.map((process) => (
                        <Row key={process.Id} row={process} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}> 
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>

                {columns.map((column) => (
                            <TableCell>{row[column.field]}</TableCell>
                        ))}
                <TableCell component="th" scope="row">{row.Id}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Meetings
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        {meetingColumns.map((column) =>
                                            (<TableCell>{column.headerName}</TableCell>)
                                        )   }
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.meetings.map((meeting) => (
                                        <TableRow key={meeting.id}>
                                            {meetingColumns.map((meetingColumns) => (
                                                <TableCell>{meeting[meetingColumns.field]}</TableCell>
                                            ))}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

Row.propTypes = {
    row: PropTypes.shape({
        calories: PropTypes.number.isRequired,
        carbs: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        history: PropTypes.arrayOf(
            PropTypes.shape({
                amount: PropTypes.number.isRequired,
                customerId: PropTypes.string.isRequired,
                date: PropTypes.string.isRequired,
            }),
        ).isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        protein: PropTypes.number.isRequired,
    }).isRequired,
};
