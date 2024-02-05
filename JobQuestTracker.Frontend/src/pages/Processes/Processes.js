import React from 'react'
import GridWrapper from '../../components/common/GridWrapper/GridWrapper'
import Stack from '@mui/material/Stack';
import AddFormDialogButton from '../../components/AddFormDialogButton/AddFormDialogButton';
import RecruitmentProcessesTable from '../../components/RecruitmentProcessesTable/RecruitmentProcessesTable'
import { config } from '../../constants'


const Processes = () => {

const onProcessAdded = () => {
  console.log("I am in Processes")
}


  return (
    <GridWrapper>
      <RecruitmentProcessesTable apiUrl={config.url}></RecruitmentProcessesTable>
      <Stack spacing={2}>
        <AddFormDialogButton onProcessAdded={onProcessAdded}></AddFormDialogButton>
      </Stack>
    </GridWrapper>
  )
}

export default Processes
