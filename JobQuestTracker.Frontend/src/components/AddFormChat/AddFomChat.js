import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button, MenuItem } from '@mui/material';
import { config } from '../../constants'

var url = config.url.API_URL

const FormDialog = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    position: '',
    companyName: '',
    companyLocation: '',
    contactPerson: '',
    rate: '',
    contractType: '',
    workOfficeType: '',
    recruitmentProcessStatus: '',
  });

  const [contractTypes, setContractTypes] = useState([]);
  const [workOfficeTypes, setWorkOfficeTypes] = useState([]);
  const [recruitmentProcessStatuses, setRecruitmentProcessStatuses] = useState([]);

  useEffect(() => {
    // Fetch dropdown values from your API endpoints
    // Example using fetch:
    const fetchData = async () => {
      try {
        const contractTypesResponse = await fetch(url + '/metadata/ContractTypes');
        const workOfficeTypesResponse = await fetch(url + '/metadata/WorkOfficeTypes');
        const recruitmentProcessStatusesResponse = await fetch(url + '/metadata/RecruitmentProcessStatuses');

        const contractTypesData = await contractTypesResponse.json();
        const workOfficeTypesData = await workOfficeTypesResponse.json();
        const recruitmentProcessStatusesData = await recruitmentProcessStatusesResponse.json();

        setContractTypes(contractTypesData);
        setWorkOfficeTypes(workOfficeTypesData);
        setRecruitmentProcessStatuses(recruitmentProcessStatusesData);
      } catch (error) {
        console.error('Error fetching dropdown values', error);
      }
    };

    fetchData();
  }, []);

  const fields = [
    { name: 'position', label: 'Position', type: 'text' },
    { name: 'companyName', label: 'Company Name', type: 'text' },
    { name: 'companyLocation', label: 'Company Location', type: 'text' },
    { name: 'contactPerson', label: 'Contact Person', type: 'text' },
    { name: 'rate', label: 'Rate', type: 'number' },
    { name: 'contractType', label: 'Contract Type', type: 'select', options: contractTypes },
    { name: 'workOfficeType', label: 'WorkOffice Type', type: 'select', options: workOfficeTypes },
    { name: 'recruitmentProcessStatus', label: 'Recruitment Process Status', type: 'select', options: recruitmentProcessStatuses,},
  ];

  const handleTextFieldChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleDropdownChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSave = () => {
    // Perform the POST request here using a library like axios or fetch
    // Example using fetch:
    fetch(url + '/recruitmentProcesses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('POST request successful', data);
        onClose(); // Close the dialog after successful save
      })
      .catch((error) => {
        console.error('Error during POST request', error);
      });
  };

  return (
    <Dialog  open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Add New Process</DialogTitle>
      <DialogContent>
        {fields.map((field) => (
          <div key={field.name}>
            {field.type === 'select' ? (
              <TextField
                select
                label={field.label}
                value={formData[field.name]}
                onChange={field.type === 'select' ? handleDropdownChange(field.name) : handleTextFieldChange(field.name)}
                fullWidth
                margin="normal"
              >
                {field.options.map((option) => (
                  <MenuItem key={option.id} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            ) : (
              <TextField
                label={field.label}
                type={field.type}
                value={formData[field.name]}
                onChange={field.type === 'select' ? handleDropdownChange(field.name) : handleTextFieldChange(field.name)}
                fullWidth
                margin="normal"
              />
            )}
          </div>
        ))}
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button onClick={handleSave} color="primary" variant='contained'>
            Add
          </Button>
          <Button onClick={onClose} color="error" variant='contained'>
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FormDialog;