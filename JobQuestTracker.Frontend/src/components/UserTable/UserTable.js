import React, { useEffect, useState } from 'react'
import DataTable from '../common/DataTable/DataTable';
import { config } from '../../constants'
var url = config.url.API_URL


const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'companyName', headerName: 'Company', width: 150 },
    { field: 'companyLocation', headerName: 'Location', width: 150 },
    { field: 'contactPerson', headerName: 'Contact person', width: 150 },
    { field: 'contractType', headerName: 'Contract Type', width: 150 },
    { field: 'rate', headerName: 'Rate', width: 150 },
    { field: 'workOfficeType', headerName: 'Type', width: 150 },
    { field: 'status', headerName: 'Status', width: 150 }
];

const userTableStyles = {
    height: '650px',
};

const UserTable = ({ onError }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch(url+'/recruitmentProcesses')
            .then((response) => response.json())
            .then((json) => setUsers(json))
            .catch(() => onError())
    }, []);

    return (
        <DataTable
            rows={users}
            columns={columns}
            loading={!users.length}
            sx={userTableStyles}
        />
    );
};

export default UserTable