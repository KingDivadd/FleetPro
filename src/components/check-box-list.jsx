import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText, Box } from '@mui/material';

const MultiSelectDropdown = () => {
  // State to hold the selected items
    const [selectedItems, setSelectedItems] = useState([]);

  // Dummy data for the dropdown options
    const options = [
        { id: 1, label: 'Option 1' },
        { id: 2, label: 'Option 2' },
        { id: 3, label: 'Option 3' },
        // Add more options as needed
    ];

    // Function to handle checkbox change
    const handleCheckboxChange = (event) => {
        const value = event.target.value;
        setSelectedItems(selected => selected.includes(value)
        ? selected.filter(item => item !== value)
        : [...selected, value]
        );
    };

    return (
        <Box>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="multi-select-dropdown-label">Select Options</InputLabel>
            <Select
            labelId="multi-select-dropdown-label"
            id="multi-select-dropdown"
            multiple
            value={selectedItems}
            onChange={handleCheckboxChange}
            renderValue={(selected) => selected.join(', ')}
            >
            {options.map(option => (
                <MenuItem key={option.id} value={option.label}>
                <Checkbox checked={selectedItems.includes(option.label)} />
                <ListItemText primary={option.label} />
                </MenuItem>
            ))}
            </Select>
        </FormControl>
        <div>
            <h3>Selected Items:</h3>
            <ul>
            {selectedItems.map((item, index) => (
                <li key={index}>{item}</li>
            ))}
            </ul>
        </div>
        </Box>
    );
};

export default MultiSelectDropdown;
