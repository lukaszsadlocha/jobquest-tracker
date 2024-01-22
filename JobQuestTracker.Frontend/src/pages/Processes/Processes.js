import React, { useState, useEffect } from 'react'
import GridWrapper from '../../components/common/GridWrapper/GridWrapper'
import BasicSnackbar from '../../components/common/BasicSnackbar/BasicSnackbar';
import BasicCard from '../../components/common/BasicCard/BasicCard';
import CollapsibleTable from '../../components/CollapsibleTable/CollapsibleTable';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import FormDialog from '../../components/FormDialogs/FormDialogs';



const Processes = () => {

    return (
        <GridWrapper>
        <CollapsibleTable></CollapsibleTable>

        <Stack spacing={2}>
        {/* <Button variant="contained" onClick={handleAddClick}>Add</Button> */}

        <FormDialog></FormDialog>
        
        </Stack>
        
        
      </GridWrapper>
    )
}

export default Processes
