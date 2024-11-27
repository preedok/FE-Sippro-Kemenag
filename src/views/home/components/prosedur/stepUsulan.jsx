import React from "react";
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import { styled } from '@mui/system';

const StepList = styled(List)(({ theme }) => ({
    width: '100%',
    padding: '20px',
    backgroundColor: '#f5f5f5',
    borderRadius: '10px',
}));

const StepItem = styled(ListItem)(({ theme }) => ({
    position: 'relative',
    padding: '10px 0 20px 60px',
    '&::before': {
        content: '""',
        position: 'absolute',
        left: '20px',
        top: 0,
        bottom: 0,
        width: '2px',
        background: '#3a9cbb',
    },
    '&::after': {
        content: '""',
        position: 'absolute',
        left: '13px',
        top: '24px',
        width: '16px',
        height: '16px',
        borderRadius: '50%',
        background: '#3a9cbb',
        boxShadow: '0 0 0 4px #fff',
    },
}));

const StepTitle = styled(Typography)(({ theme }) => ({
    fontSize: '1.3rem',
    fontWeight: 600,
    color: '#333',
    marginBottom: '8px',
}));

const StepDescription = styled(Typography)(({ theme }) => ({
    fontSize: '1rem',
    color: '#666',
    lineHeight: 1.6,
}));

const Step2 = () => {
    const steps = [
        {
            subText: "Mengisi Form Usulan Prodi Baru dengan mempertimbangkan Prodi eksisting. Jika tidak memenuhi syarat maka tidak diperkenankan mengusulkan Prodi Baru."
        },
    ];

    return (
        <Box sx={{ padding: '20px' }}>
            <StepList>
                {steps.map((step, index) => (
                    <StepItem key={index}>
                        <ListItemText
                            secondary={<StepDescription>{step.subText}</StepDescription>}
                        />
                    </StepItem>
                ))}
            </StepList>
        </Box>
    );
};

export default Step2;